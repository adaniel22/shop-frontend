import './App.css'
import {useEffect, useState} from "react";

function App() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch('http://localhost:8080/api/products')
            .then(response => response.json())
            .then(data => setProducts(data))
    }, [])

    return (<div>
        <h1>Webshop</h1>
        <ul>
            {products.map(product => (<li key={product.id}>
                    {product.name} - {product.price} Ft
                </li>))}
        </ul>
    </div>)
}

export default App