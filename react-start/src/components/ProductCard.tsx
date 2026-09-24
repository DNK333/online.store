type ProductCardProps = {
  product: {
    id: number
    name: string
    category: string
    price: number
    rating: number
    description: string
    image: string
  }
  onSelect: (productId: number) => void
}

// AI-ASSISTED: GitHub Copilot
export function ProductCard({ product, onSelect }: ProductCardProps) {
  return (
    <article className="product-card">
      <img src={product.image} alt={product.name} />
      <div className="product-body">
        <div className="product-meta">
          <span>{product.category}</span>
          <span>★ {product.rating}</span>
        </div>
        <h4>{product.name}</h4>
        <p>{product.description}</p>
        <div className="product-footer">
          <strong>${product.price}</strong>
          <button type="button" onClick={() => onSelect(product.id)}>
            Подробнее
          </button>
        </div>
      </div>
    </article>
  )
}
