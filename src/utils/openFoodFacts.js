const BASE_URL = "https://world.openfoodfacts.org/cgi/search.pl";

// Maps Open Food Facts product shape to our local product shape
function mapProduct(item) {
  const sugarPer100g = item.nutriments?.sugars_100g || 0;
  const servingSize = item.serving_size || "100g";

  // Parse serving size number e.g. "30g" → 30, "200ml" → 200
  const servingNumber = parseFloat(servingSize) || 100;

  // Use serving sugar if available, otherwise calculate from 100g value
  const sugarPerServing =
    item.nutriments?.sugars_serving ??
    parseFloat(((sugarPer100g * servingNumber) / 100).toFixed(1));

  return {
    id: item.code || Math.random().toString(36).slice(2),
    name: item.product_name || "Unknown Product",
    brand: item.brands || "Unknown Brand",
    barcode: item.code || "",
    category: item.categories?.split(",")[0]?.trim() || "unknown",
    isSavory: false,
    servingSize: servingSize,
    sugarPerServing: parseFloat(sugarPerServing.toFixed(1)),
    sugarPer100g: parseFloat(sugarPer100g.toFixed(1)),
    fromAPI: true  // flag so UI can show "via Open Food Facts"
  };
}

export async function searchOpenFoodFacts(query) {
  const params = new URLSearchParams({
    search_terms: query,
    search_simple: "1",
    action: "process",
    json: "1",
    page_size: "5",
    fields: "code,product_name,brands,categories,nutriments,serving_size"
  });

  const response = await fetch(`${BASE_URL}?${params}`);

  if (!response.ok) {
    throw new Error("Open Food Facts API failed");
  }

  const data = await response.json();

  // Filter out products with no name or no sugar data at all
  return (data.products || [])
    .filter(p => p.product_name && p.nutriments)
    .map(mapProduct);
}