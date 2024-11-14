import { useCallback, useEffect, useState } from "react";
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

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          setCart(parsedCart);
        }
      } catch (error) {
        console.error("Error parsing saved cart", error);
      }
    }
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const updateCart = useCallback(
    (product: Product) => {
      setCart((prevCart) => {
        const existingProduct = prevCart.find((item) => item.id === product.id);
        if (existingProduct) {
          return prevCart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + product.quantity }
              : item
          );
        }
        return [...prevCart, { ...product }];
      });
    },
    [setCart]
  );

  const addToCart = async () => {
    if (!productId) return;

    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/${productId}`
      );
      if (!response.ok) {
        throw new Error("Producto no encontrado");
      }
      const data = await response.json();

      const newProduct: Product = {
        id: data.id,
        title: data.title,
        price: data.price,
        quantity,
        image: data.image,
      };

      updateCart(newProduct);

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
      <section className="border border-gray-300 rounded m-2 p-2">
        <Cart cart={cart} setCart={setCart} />
      </section>
    </div>
  );
}

export default App;
