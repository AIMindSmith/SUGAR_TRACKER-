import products from "../data/products.json";
import { searchOpenFoodFacts } from "./openFoodFacts";

export async function lookupBarcode(barcode) {
  // Step 1: check local dataset first
  const localMatch = products.find(p => p.barcode === barcode);
  if (localMatch) return localMatch;

  // Step 2: hit Open Food Facts by barcode
  // OFF has a direct barcode endpoint — much faster than search
  const response = await fetch(
    `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
  );

  if (!response.ok) throw new Error("Barcode lookup failed");

  const data = await response.json();

  if (data.status !== 1 || !data.product) {
    return null; // product not found in OFF database
  }

  const p = data.product;
  const sugarPer100g = p.nutriments?.sugars_100g || 0;
  const servingSize = p.serving_size || "100g";
  const servingNumber = parseFloat(servingSize) || 100;
  const sugarPerServing =
    p.nutriments?.sugars_serving ??
    parseFloat(((sugarPer100g * servingNumber) / 100).toFixed(1));

  return {
    id: barcode,
    name: p.product_name || "Unknown Product",
    brand: p.brands || "Unknown Brand",
    barcode: barcode,
    category: p.categories?.split(",")[0]?.trim() || "unknown",
    isSavory: false,
    servingSize: servingSize,
    sugarPerServing: parseFloat(Number(sugarPerServing).toFixed(1)),
    sugarPer100g: parseFloat(Number(sugarPer100g).toFixed(1)),
    fromAPI: true
  };
}
