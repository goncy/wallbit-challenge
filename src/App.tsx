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
      <section className="flex justify-center items-center">
        <img src="/logo.webp" className="w-[18em]   py-8" alt="logo_wallbit" />
        <a
          href="https://wallbit.io/"
          className="group  pt-6 text-xs inline-flex items-center space-x-1 transition-all duration-300 ease-in-out hover:text-[#0391d1]"
          target="_blank"
        >
          <span>Nuestro sitio web</span>
          <span className="transform transition-all duration-300 ease-in-out group-hover:translate-x-1 group-hover:text-[#0391d1]">
            &rarr;
          </span>
        </a>
      </section>
      <div className="mb-4 text-black flex space-x-2">
        <input
          type="number"
          placeholder="ID del Producto"
          value={productId || ""}
          onChange={(e) => setProductId(Number(e.target.value))}
          className="p-2 border border-[#3d8bff] rounded w-1/2"
        />
        <input
          type="number"
          placeholder="Cantidad"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="p-2 border border-[#3d8bff] rounded w-1/2"
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
          className="px-4 py-2 bg-[#059dfb] text-gray-50 rounded transition-all duration-300 ease-in-out transform hover:bg-[#0391d1] hover:shadow-lg"
        >
          Agregar
        </button>
      </div>
      <section className="border border-[#0391d1] rounded m-2 p-2">
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
