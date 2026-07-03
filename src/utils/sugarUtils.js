// 1 teaspoon of granulated sugar ≈ 4.2g
const GRAMS_PER_TEASPOON = 4.2;

// Converts grams to teaspoons, rounded to 1 decimal
export function gramsToTeaspoons(grams) {
  if (!grams || grams < 0) return 0;
  return parseFloat((grams / GRAMS_PER_TEASPOON).toFixed(1));
}

// Flags savory products with more than 3g sugar per serving as hidden sugar
export function isHiddenSugar(product) {
  if (!product) return false;
  return product.isSavory === true && product.sugarPerServing > 3;
}

// Returns a level label and color based on teaspoons
export function getSugarLevel(teaspoons) {
  if (teaspoons <= 1) return { level: "Low", color: "#22c55e" };
  if (teaspoons <= 3) return { level: "Moderate", color: "#f97316" };
  if (teaspoons <= 6) return { level: "High", color: "#ef4444" };
  return { level: "Very High", color: "#991b1b" };
}

// WHO daily limit is ~25g = ~6 teaspoons
export const WHO_DAILY_LIMIT_TEASPOONS = 6;

// Calculates what % of daily limit one serving uses
export function percentOfDailyLimit(teaspoons) {
  return Math.round((teaspoons / WHO_DAILY_LIMIT_TEASPOONS) * 100);
}


// Should return 2.9
gramsToTeaspoons(12)

// Should return 0.0
gramsToTeaspoons(0)

// Should return { level: "Very High", color: "#991b1b" }
getSugarLevel(8)

// Should return 50
percentOfDailyLimit(3)