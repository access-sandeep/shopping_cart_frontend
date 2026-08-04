const Product = ({ product, onAddToCart }) => {
  if (!product) {
    return null;
  }

  const {
    product_name,
    description,
    sku,
    price,
    discount_price,
    weight,
  } = product;

  const {
    category_name,
  } = product.category || {};

  const { brand_name } = product.brand || {};

  const formatCurrency = (value) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
    }).format(value);

  return (
    <div className="product-card">
      <div className="product-details">
        <h3>{product_name}</h3>
        {/* <p>{description}</p> */}

        <div className="product-meta">
          {/* <div>
            <span>SKU</span>
            <strong>{sku}</strong>
          </div> */}
          {/* <div>
            <span>Brand</span>
            <strong>{brand_name}</strong>
          </div> */}
          {/* <div>
            <span>Category</span>
            <strong>{category_name}</strong>
          </div> */}
          <div>
            <span>Weight</span>
            <strong>{weight} kg</strong>
          </div>
        </div>

        <div className="product-footer">
          <div>
            <span className="product-price">{formatCurrency(price)}</span>
            <span className="product-discount">{formatCurrency(discount_price)}</span>
          </div>
          <button type="button" onClick={() => onAddToCart?.(product)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
