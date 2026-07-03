function ResultCard({ product }) {
    return (
      <div className="result-card">
        <div className="card-header">
          <h2>{product.name}</h2>
          <span className="brand">{product.brand}</span>
        </div>
  
        <div className="card-body">
          <p>Category: {product.category}</p>
          <p>Serving size: {product.servingSize}</p>
          <p>Sugar per serving: {product.sugarPerServing}g</p>
          <p>Teaspoons: [coming Day 6]</p>
        </div>
      </div>
    );
  }
  
  export default ResultCard;