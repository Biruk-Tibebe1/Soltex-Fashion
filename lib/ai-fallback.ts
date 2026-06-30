export function mockChatResponse(message: string) {
  const normalized = message.toLowerCase();

  if (normalized.includes('styling') || normalized.includes('style')) {
    return 'Try pairing a neutral linen shirt with a structured denim jacket for an effortless thrifted look that feels polished and modern.';
  }

  if (normalized.includes('size')) {
    return 'For a relaxed fit, choose one size larger on our denim pieces. Dresses and tops fit true to size, while knitwear drapes nicely when sized up slightly.';
  }

  if (normalized.includes('gift') || normalized.includes('occasion')) {
    return 'A floral dress with soft sneakers and a light scarf makes a great choice for a weekend brunch or date night.';
  }

  return 'I recommend starting with classic neutral layers and adding one statement accessory to keep the outfit fresh and easy to wear.';
}

export function mockStylistRecommendation(preference: string) {
  const normalized = preference.toLowerCase();

  if (normalized.includes('work') || normalized.includes('office')) {
    return 'For a polished office look, try a clean denim jacket over a soft knit top, matched with structured corduroy trousers. Finish with loafers or smart sneakers for a modern thrift style.';
  }

  if (normalized.includes('party') || normalized.includes('night')) {
    return 'Choose a bold floral dress or a fitted blazer with statement sunglasses. Add layered necklaces and sleek sneakers for a playful yet refined secondhand outfit.';
  }

  if (normalized.includes('summer') || normalized.includes('hot')) {
    return 'Opt for a lightweight linen shirt paired with rolled cuff shorts and a pair of comfortable sneakers. Keep the palette soft and airy for warm-weather style.';
  }

  return 'Try a neutral top, a structured jacket, and a textural accessory like a scarf or bag. This creates a curated thrift outfit that feels balanced and polished.';
}
