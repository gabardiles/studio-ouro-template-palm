/**
 * Convert a city name to a URL-safe slug.
 * "Västra Frölunda" → "vastra-frolunda"
 */
export function citySlug(city: string): string {
  return city
    .toLowerCase()
    .replace(/å/g, "a")
    .replace(/ä/g, "a")
    .replace(/ö/g, "o")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
