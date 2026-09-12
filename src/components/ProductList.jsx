import { useCartStore } from '../stores/cartStore.js'

function ProductList({ products, isLoggedIn }) {
  const addItem = useCartStore((state) => state.addItem)

  return (
    <div>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.price} Ft
            {isLoggedIn && (
              <button onClick={() => addItem(product)}>Kosárba</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProductList
