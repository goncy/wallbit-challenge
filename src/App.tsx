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
  const [quantity, setQuantity] = useState<string>("");
  const [cart, setCart] = useState<Product[]>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [cartCreationDate, setCartCreationDate] = useState<Date | null>(() => {
    const savedDate = localStorage.getItem("cartCreationDate");
    return savedDate ? new Date(savedDate) : null;
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    if (!cartCreationDate) {
      const currentDate = new Date();
      setCartCreationDate(currentDate);
      localStorage.setItem("cartCreationDate", currentDate.toISOString());
    }
  }, [cart, cartCreationDate]);

  const addToCart = (product: Product) => {
    if (product.quantity <= 0) {
      setErrorMessage("La cantidad debe ser mayor a cero.");
      return;
    }

    setErrorMessage(null);
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

    const titleWords = product.title.split(" ").slice(0, 4).join(" ");
    setSuccessMessage(`✔ ${titleWords} agregado con éxito`);

    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  };

  const emptyCart = () => {
    setCart([]);
    setCartCreationDate(null);
    localStorage.removeItem("cart");
    localStorage.removeItem("cartCreationDate");
  };

  const handleAddToCartClick = () => {
    if (productId === undefined || productId < 1 || productId > 20) {
      setErrorMessage("El ID del producto debe estar entre 1 y 20.");
      return;
    }

    const quantityNumber = Number(quantity);
    if (quantity === "" || quantityNumber <= 0) {
      setErrorMessage("La cantidad debe ser mayor a cero.");
      return;
    }

    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        const newProduct: Product = {
          id: data.id,
          title: data.title,
          price: data.price,
          quantity: quantityNumber,
          image: data.image,
        };
        addToCart(newProduct);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setErrorMessage("Error al obtener el producto.");
      });
  };

  const handleProductIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductId(Number(e.target.value));
    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(e.target.value);
    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  return (
    <div className="p-4 mx-auto">
      <section className="flex justify-center items-center">
        <img src="/logo.webp" className="w-[18em] py-8" alt="logo_wallbit" />
        <a
          href="https://wallbit.io/"
          className="group pt-6 text-xs inline-flex items-center space-x-1 transition-all duration-300 ease-in-out hover:text-[#0391d1]"
          target="_blank"
        >
          <span>Nuestro sitio web</span>
          <span className="transform transition-all duration-300 ease-in-out group-hover:translate-x-1 group-hover:text-[#0391d1]">
            &rarr;
          </span>
        </a>
      </section>
      {successMessage && (
        <div className="absolute top-4 right-4 bg-green-500 text-white p-2 rounded shadow-lg">
          {successMessage}
        </div>
      )}

      <div className="mb-4 text-black flex space-x-2">
        <input
          type="number"
          placeholder="ID del Producto"
          value={productId || ""}
          onChange={handleProductIdChange}
          className={`p-2 border rounded w-1/2 ${
            errorMessage ? "border-red-600" : "border-[#3d8bff]"
          }`}
        />

        <input
          type="number"
          placeholder="Cantidad"
          value={quantity}
          onChange={handleQuantityChange}
          className={`p-2 border rounded w-1/2 ${
            errorMessage ? "border-red-600" : "border-[#3d8bff]"
          }`}
        />

        <button
          onClick={handleAddToCartClick}
          className="px-4 py-2 bg-[#059dfb] text-gray-50 rounded transition-all duration-300 ease-in-out transform hover:bg-[#0391d1] hover:shadow-lg"
        >
          Agregar
        </button>
      </div>

      {errorMessage && <div className="text-red-600 mb-4">{errorMessage}</div>}

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
