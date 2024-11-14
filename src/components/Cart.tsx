import React, { useEffect } from "react";
import CartItem from "./CartItem";

interface Product {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartProps {
  cart: Product[];
  setCart: React.Dispatch<React.SetStateAction<Product[]>>;
  emptyCart: () => void;
  creationDate: string | null;
}

const Cart: React.FC<CartProps> = ({
  cart,
  setCart,
  emptyCart,
  creationDate,
}) => {
  const removeItem = (id: number) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== id);
      if (updatedCart.length === 0) {
        emptyCart();
      }
      return updatedCart;
    });
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    if (cart.length === 0) {
      localStorage.removeItem("cartCreationDate");
    }
  }, [cart]);

  return (
    <div className="my-6">
      <h2 className="text-xl font-bold mb-4 text-left ml-4">
        Carrito de compra
        {cart.length > 0 && (
          <span className="text-sm text-gray-500"> {creationDate}</span>
        )}
      </h2>
      <ul className="flex gap-[6.7em] justify-left w-full p-4">
        <li className="text-center font-semibold">Cant</li>
        <li className="text-center font-semibold">Nombre</li>
        <ul className="flex gap-4">
          <li className="text-center font-semibold whitespace-nowrap">
            Precio Unitario
          </li>
          <li className="text-center font-semibold whitespace-nowrap">
            Precio Total
          </li>
        </ul>
      </ul>
      {cart.length === 0 ? (
        <h4 className="text-sm text-gray-500 justify-center mx-4">
          No hay productos en el carrito aún, prueba agregando alguno con su ID
          y la cantidad que deseas ingresar.
        </h4>
      ) : (
        cart.map((item) => (
          <CartItem key={item.id} item={item} removeItem={removeItem} />
        ))
      )}
      {cart.length > 0 && (
        <section className="flex items-center justify-between mx-8">
          <h3>Cantidad total de items: {totalQuantity}</h3>
          <h2 className="font-bold">Total Carrito: ${totalPrice.toFixed(2)}</h2>
        </section>
      )}
      {cart.length > 0 && (
        <button
          onClick={emptyCart}
          className="px-4 py-2 bg-red-500 text-white rounded mt-4"
        >
          Vaciar Carrito
        </button>
      )}
    </div>
  );
};

export default Cart;
