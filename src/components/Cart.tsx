import React from "react";
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
}

const Cart: React.FC<CartProps> = ({ cart, setCart }) => {
  const removeItem = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Carrito de compra</h2>
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
        <h4 className="text-sm text-gray-500">
          No hay h4roductos en el carrito aún, prueba agregando alguno con su ID
          y la cantidad que deseas ingresar.
        </h4>
      ) : (
        cart.map((item) => (
          <CartItem key={item.id} item={item} removeItem={removeItem} />
        ))
      )}
      {cart.length > 0 && (
        <div className="mt-4 text-lg font-bold">
          Total: ${totalPrice.toFixed(2)}
        </div>
      )}
    </div>
  );
};

export default Cart;
