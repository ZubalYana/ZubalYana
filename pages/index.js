import Head from "next/head";
import Link from "next/link";
import "../styles/globals.css";
import axios from "axios";
import { ShoppingCartIcon } from "lucide-react";
import { useState } from "react";

export async function getStaticProps() {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();

  return {
    props: { products },
  };
}

export default function Home({ products }) {
  const [productList, setProductList] = useState(products);
  const [cart, setCart] = useState([]);

  function addToCart(id) {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        setCart((prevCart) => [...prevCart, response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function deleteProduct(id) {
    axios.delete(`https://fakestoreapi.com/products/${id}`)
      .then(() => {
        setProductList((prevProducts) => prevProducts.filter(product => product.id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <Head>
        <title>FakeStore | Головна</title>
      </Head>
      <div className="container">
        <h1>🛍️ Список товарів</h1>
        <div className="cartIconCon">
          <ShoppingCartIcon />
          <div className="cartCount">{cart.length}</div>
        </div>

        <div className="grid">
          {productList.map((product) => (
            <div key={product.id} className="card">
              <img src={product.image} alt={product.title} className="product-image" />
              <div className="product-text">
                <h2>{product.title}</h2>
                <p>${product.price}</p>
              </div>
              <Link href={`/product/${product.id}`} className="viewBtn">View</Link>
              <button className="addToCart" onClick={() => addToCart(product.id)}>
                Add to cart
              </button>
              <button className="deleteBtn" onClick={() => deleteProduct(product.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
