import React from "react";

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
}

const CartItem: React.FC<CartItemProps> = ({ item, removeItem }) => {
  const totalPrice = item.price * item.quantity;
  const limitTitleToWords = (title: string, wordLimit: number) => {
    const words = title.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ")
      : title;
  };
  return (
    <div className="w-full flex gap-7 items-center mb-4 p-4 border border-[#0391d1] rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <span className="text-gray-50 text-center font-bold text-lg">
        {item.quantity}
      </span>
      <img
        src={item.image}
        alt={item.title}
        className="w-16 h-16 object-contain rounded-md"
        loading="lazy"
      />
      <h3 className="font-semibold text-lg flex-1 whitespace-nowrap">
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
        className="bg-[#b12626] hover:bg-[#b83838] text-white px-4 py-1 rounded-full w-2 pb-2 text-center text-sm ml-auto flex items-center justify-center"
      >
        x
      </button>
    </div>
  );
};

export default CartItem;
