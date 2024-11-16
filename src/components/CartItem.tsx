import React, { useEffect, useState } from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartItemProps {
  item: Product;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  removeItem,
  updateQuantity,
}) => {
  const [inputValue, setInputValue] = useState(item.quantity);

  useEffect(() => {
    setInputValue(item.quantity);
  }, [item.quantity]);

  const totalPrice = item.price * inputValue;

  const [previousValue, setPreviousValue] = useState(item.quantity);

  const limitTitleToWords = (title: string, wordLimit: number) => {
    const words = title.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ")
      : title;
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Number(e.target.value);
    if (newQuantity > 0) {
      setInputValue(newQuantity);
      updateQuantity(item.id, newQuantity);
    }
  };

  const handleBlur = () => {
    if (inputValue === 0) {
      setInputValue(previousValue);
      setPreviousValue(inputValue);
    }
  };

  return (
    <div className="w-full flex gap-7 items-center mb-4 p-4 border border-[#0391d1] rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <input
        type="number"
        value={inputValue}
        onChange={handleQuantityChange}
        onBlur={handleBlur}
        className="w-16 text-center text-white bg-transparent border-none"
        min="0"
      />
      <img
        src={item.image}
        alt={item.title}
        className="w-16 h-16 object-contain rounded-md"
        loading="lazy"
      />
      <h3
        className="font-semibold text-lg flex-1 whitespace-nowrap cursor-pointer"
        onClick={() => alert("Edit quantity for " + item.title)}
      >
        {limitTitleToWords(item.title, 4)}
      </h3>
      <span className="text-sm text-gray-400 w-1/4 text-center">
        ${item.price.toFixed(2)}
      </span>
      <span className="text-sm text-white w-1/4 text-center">
        ${totalPrice.toFixed(2)}
      </span>
      <button
        onClick={() => removeItem(item.id)}
        className="bg-[#e4a42e] hover:bg-[#c99431] text-white px-4 py-1 rounded-full w-2 pb-2 text-center text-sm ml-auto flex items-center justify-center"
      >
        x
      </button>
    </div>
  );
};

export default CartItem;
