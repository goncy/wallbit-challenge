import { useEffect, useState } from "react";
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
  const [cart, setCart] = useState<Product[]>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [cartCreationDate, setCartCreationDate] = useState<Date | null>(() => {
    const savedDate = localStorage.getItem("cartCreationDate");
    return savedDate ? new Date(savedDate) : null;
  });
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    if (!cartCreationDate) {
      const currentDate = new Date();
      setCartCreationDate(currentDate);
      localStorage.setItem("cartCreationDate", currentDate.toISOString());
    }
  }, [cart, cartCreationDate]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      }
      return [...prevCart, product];
    });
  };

  const emptyCart = () => {
    setCart([]);
    setCartCreationDate(null);
    localStorage.removeItem("cart");
    localStorage.removeItem("cartCreationDate");
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
          onClick={() => {
            if (productId) {
              fetch(`https://fakestoreapi.com/products/${productId}`)
                .then((response) => response.json())
                .then((data) => {
                  const newProduct: Product = {
                    id: data.id,
                    title: data.title,
                    price: data.price,
                    quantity,
                    image: data.image,
                  };
                  addToCart(newProduct);
                })
                .catch((error) => {
                  console.error("Error fetching product:", error);
                });
            }
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Agregar
        </button>
      </div>
      <section className="border border-gray-300 rounded m-2 p-2">
        <Cart
          cart={cart}
          setCart={setCart}
          emptyCart={emptyCart}
          creationDate={
            cartCreationDate
              ? cartCreationDate.toLocaleString("es-AR", {
                  year: "numeric",
                  month: "long",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })
              : null
          }
        />
      </section>
    </div>
  );
}

export default App;
