import { useState } from "react";
import "./App.css";
import Cart from "./components/Cart";

interface Product {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

function App() {
  const [productId, setProductId] = useState<number | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = async () => {
    if (!productId) return;

    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/${productId}`
      );
      const data = await response.json();

      const product: Product = {
        id: data.id,
        title: data.title,
        price: data.price,
        quantity,
        image: data.image,
      };

      setCart((prevCart) => {
        const existingProduct = prevCart.find((item) => item.id === product.id);
        if (existingProduct) {
          return prevCart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...prevCart, product];
      });

      setProductId(undefined);
      setQuantity(1);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  return (
    <div className="p-4 mx-auto">
      <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text mb-6">
        open source is love
      </h1>

      <div className="mb-4 flex space-x-2">
        <input
          type="number"
          placeholder="ID del Producto"
          value={productId || ""}
          onChange={(e) => setProductId(Number(e.target.value))}
          className="p-2 border border-gray-300 rounded w-1/2"
        />
        <input
          type="number"
          placeholder="Cantidad"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="p-2 border border-gray-300 rounded w-1/2"
        />
        <button
          onClick={addToCart}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Agregar
        </button>
      </div>
      <section className=" border border-gray-300 rounded m-2 p-2">
        <Cart cart={cart} setCart={setCart} />
      </section>
    </div>
  );
}

export default App;
