import { gramsToTeaspoons, getSugarLevel, percentOfDailyLimit } from "../utils/sugarUtils";

function ResultCard({ product }) {
  // Calculate all values
  const sugarGrams = product.sugarPerServing || (product.sugarPer100g * (parseInt(product.servingSize) / 100));
  const teaspoons = gramsToTeaspoons(sugarGrams);
  const sugarLevel = getSugarLevel(teaspoons);
  const percentDaily = percentOfDailyLimit(teaspoons);

  return (
    <div className="result-card">
      <div className="card-header">
        <h2>{product.name}</h2>
        <span className="brand">{product.brand}</span>
      </div>

      <div className="card-body">
        <p>📁 Category: {product.category}</p>
        <p>📏 Serving size: {product.servingSize}</p>
        <p>🍬 Sugar per serving: {sugarGrams.toFixed(1)}g</p>
        
        <p style={{ color: sugarLevel.color, fontWeight: 'bold', fontSize: '1.1em' }}>
          🥄 Teaspoons: {teaspoons} ({sugarLevel.level})
        </p>
        <p style={{ fontSize: '0.9em', color: '#666' }}>
          ⚠️ {percentDaily}% of daily WHO limit (25g = 6 tsp)
        </p>
      </div>
    </div>
  );
}

export default ResultCard;