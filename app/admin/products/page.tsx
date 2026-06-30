'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase-client';
import { useSessionToken } from '@/components/session-token-context';
import type { Product } from '@/lib/products';

const initialFormState = {
  name: '',
  slug: '',
  category: '',
  price: '',
  image: '',
  sizes: '',
  description: '',
  details: '',
};

export default function AdminProductsPage() {
  const { token } = useSessionToken();
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const loadProducts = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const response = await fetch('/api/admin/products', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || 'Unable to load products.');
      setProducts(data.products ?? []);
    } catch (err: any) {
      setMessage(err?.message ?? 'Unable to load products.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [token]);

  const resetForm = () => {
    setEditingId(null);
    setForm(initialFormState);
    setErrors({});
    setMessage(null);
  };

  const validateField = (field: keyof typeof form, value: string) => {
    let error = '';
    const trimmed = value.trim();

    if (!trimmed) {
      error = 'This field is required.';
    } else if (field === 'slug' && /\s/.test(trimmed)) {
      error = 'Slug cannot contain spaces.';
    } else if (field === 'price' && !/^[\d\s,.ETB]+$/.test(trimmed)) {
      error = 'Price must be a valid amount like ETB 2,000.';
    } else if (field === 'sizes' && trimmed.split(',').map((size) => size.trim()).filter(Boolean).length === 0) {
      error = 'Add at least one size.';
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
    return error;
  };

  const validateAll = () => {
    const fieldNames: Array<keyof typeof form> = ['name', 'slug', 'category', 'price', 'image', 'sizes', 'description', 'details'];
    const nextErrors: Record<string, string> = {};

    fieldNames.forEach((field) => {
      const error = validateField(field, form[field]);
      if (error) nextErrors[field] = error;
    });

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      validateField(field, value);
    }
  };

  const uploadImage = async (file: File) => {
    if (!file) return;
    setUploading(true);
    setMessage(null);

    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    const { data, error } = await supabase.storage.from('product-images').upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    });

    if (error) {
      setMessage(`Image upload failed: ${error.message}`);
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from('product-images').getPublicUrl(data.path);
    if (urlData?.publicUrl) {
      setForm((prev) => ({ ...prev, image: urlData.publicUrl }));
    } else {
      setMessage('Unable to generate image URL.');
    }

    setUploading(false);
  };

  const saveProduct = async () => {
    if (!token) {
      setMessage('Admin authentication required.');
      return;
    }

    if (!validateAll()) {
      setMessage('Fix the highlighted fields before saving.');
      return;
    }

    const payload = {
      name: form.name.trim(),
      slug: form.slug.trim(),
      category: form.category.trim(),
      price: form.price.trim(),
      image: form.image.trim(),
      description: form.description.trim(),
      details: form.details.trim(),
      sizes: form.sizes.split(',').map((size) => size.trim()).filter(Boolean),
    };

    setSaving(true);
    try {
      const method = editingId ? 'PATCH' : 'POST';
      const endpoint = editingId ? `/api/admin/products/${editingId}` : '/api/admin/products';
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || 'Unable to save product.');

      setMessage(editingId ? 'Product updated successfully.' : 'Product added successfully.');
      resetForm();
      loadProducts();
    } catch (err: any) {
      setMessage(err?.message ?? 'Unable to save product.');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id ?? null);
    setForm({
      name: product.name,
      slug: product.slug,
      category: product.category,
      price: product.price,
      image: product.image,
      description: product.description,
      details: product.details,
      sizes: product.sizes.join(', '),
    });
    setMessage(null);
  };

  const handleDelete = async (id: string) => {
    if (!token) return;
    if (!confirm('Remove this product permanently?')) return;
    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || 'Unable to delete product.');
      setMessage('Product deleted.');
      loadProducts();
    } catch (err: any) {
      setMessage(err?.message ?? 'Unable to delete product.');
    }
  };

  const categories = useMemo(() => Array.from(new Set(products.map((product) => product.category))), [products]);

  return (
    <main className="min-h-screen bg-[#f8faf4] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-[2rem] bg-white p-10 shadow-soft">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">Products Management</p>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">Admin Product Catalog</h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
                Add, edit, and remove products that appear in the shop. Product changes are saved to Supabase for the live storefront.
              </p>
            </div>
            <Link href="/admin" className="inline-flex items-center justify-center rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700">
              Back to admin home
            </Link>
          </div>
        </div>

        {message ? (
          <div className="mb-8 rounded-[2rem] bg-slate-50 p-6 text-sm text-slate-700 shadow-soft">{message}</div>
        ) : null}

        <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-[2rem] bg-white p-8 shadow-soft">
            <h2 className="text-xl font-semibold text-slate-950">Product editor</h2>
            <div className="mt-6 space-y-5">
              {(
                [
                  { label: 'Product name', field: 'name', required: true },
                  { label: 'Slug', field: 'slug', required: true },
                  { label: 'Category', field: 'category', required: true },
                  { label: 'Price', field: 'price', required: true },
                  { label: 'Sizes (comma delimited)', field: 'sizes', required: true },
                ] as const
              ).map(({ label, field, required }) => (
                <div key={field} className="grid gap-2">
                  <label className="text-sm font-medium text-slate-700">
                    {label} {required ? <span className="text-brand-700">*</span> : null}
                  </label>
                  <input
                    value={form[field]}
                    onChange={(event) => handleChange(field, event.target.value)}
                    onBlur={(event) => validateField(field, event.target.value)}
                    aria-invalid={Boolean(errors[field])}
                    className={`rounded-3xl border px-4 py-3 text-sm outline-none transition focus:border-brand-400 ${errors[field] ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-slate-50'}`}
                  />
                  {errors[field] ? <p className="text-xs text-red-600">{errors[field]}</p> : null}
                </div>
              ))}

              <div className="grid gap-2">
                <label className="text-sm font-medium text-slate-700">Product image *</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) {
                      uploadImage(file);
                      setErrors((prev) => ({ ...prev, image: '' }));
                    }
                  }}
                  onBlur={() => validateField('image', form.image)}
                  className={`rounded-3xl border px-4 py-3 text-sm outline-none transition focus:border-brand-400 ${errors.image ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-slate-50'}`}
                />
                {uploading ? <p className="text-sm text-slate-600">Uploading image…</p> : null}
                {errors.image ? <p className="text-xs text-red-600">{errors.image}</p> : null}
                {form.image ? (
                  <img src={form.image} alt="Product preview" className="mt-3 h-32 w-full rounded-3xl object-cover" />
                ) : null}
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium text-slate-700">
                  Short description <span className="text-brand-700">*</span>
                </label>
                <textarea
                  value={form.description}
                  onChange={(event) => handleChange('description', event.target.value)}
                  onBlur={(event) => validateField('description', event.target.value)}
                  rows={3}
                  aria-invalid={Boolean(errors.description)}
                  className={`rounded-3xl border px-4 py-3 text-sm outline-none transition focus:border-brand-400 ${errors.description ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-slate-50'}`}
                />
                {errors.description ? <p className="text-xs text-red-600">{errors.description}</p> : null}
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium text-slate-700">
                  Details <span className="text-brand-700">*</span>
                </label>
                <textarea
                  value={form.details}
                  onChange={(event) => handleChange('details', event.target.value)}
                  onBlur={(event) => validateField('details', event.target.value)}
                  rows={4}
                  aria-invalid={Boolean(errors.details)}
                  className={`rounded-3xl border px-4 py-3 text-sm outline-none transition focus:border-brand-400 ${errors.details ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-slate-50'}`}
                />
                {errors.details ? <p className="text-xs text-red-600">{errors.details}</p> : null}
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={saveProduct}
                  disabled={saving}
                  className="rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {editingId ? 'Save product' : 'Add product'}
                </button>
                <button
                  onClick={resetForm}
                  type="button"
                  className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
                >
                  Reset form
                </button>
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] bg-white p-8 shadow-soft">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-brand-700">Live products</p>
                <h2 className="mt-2 text-xl font-semibold text-slate-950">Current catalog</h2>
              </div>
              <span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{products.length} items</span>
            </div>

            <div className="mt-6 space-y-4">
              {loading ? (
                <p className="text-sm text-slate-600">Loading products…</p>
              ) : products.length === 0 ? (
                <p className="text-sm text-slate-600">No products available yet.</p>
              ) : (
                products.map((product) => (
                  <div key={product.id ?? product.slug} className="rounded-3xl border border-slate-200 p-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-sm font-semibold text-slate-950">{product.name}</p>
                        <p className="text-sm text-slate-500">{product.category} · {product.price}</p>
                        <p className="mt-2 text-sm text-slate-600">Slug: {product.slug}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(product)}
                          className="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-200"
                        >
                          Edit
                        </button>
                        {product.id ? (
                          <button
                            type="button"
                            onClick={() => handleDelete(product.id ?? '')}
                            className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100"
                          >
                            Delete
                          </button>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
