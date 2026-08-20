import './App.css'
import {useEffect, useState} from "react";
import Login from "./Login.jsx";

function App() {
    const [products, setProducts] = useState([])
    const [loggedInEmail, setLoggedInEmail] = useState(null)

    useEffect(() => {
        fetch('http://localhost:8080/api/products')
            .then(response => response.json())
            .then(data => setProducts(data))
    }, [])

    return (<div>
        <h1>Webshop</h1>
        {loggedInEmail ? (<p>Bejelentkezve mint: {loggedInEmail}</p>) : (<Login onLogin={setLoggedInEmail}/>)}
        <ul>
            {products.map(product => (<li key={product.id}>
                {product.name} - {product.price} Ft
            </li>))}
        </ul>
    </div>)
}

export default App