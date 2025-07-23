"use client";

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (value: number) => void;
}

export default function QuantitySelector({
  quantity,
  onQuantityChange,
}: QuantitySelectorProps) {
  const handleDecrement = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    onQuantityChange(quantity + 1);
  };

  return (
    <div className="flex items-center bg-gray-100">
      <button
        onClick={handleDecrement}
        className="px-4 py-2 text-gray-500 hover:text-black transition"
        disabled={quantity <= 1}
      >
        -
      </button>
      <span className="px-4 py-2 font-medium">{quantity}</span>
      <button
        onClick={handleIncrement}
        className="px-4 py-2 text-gray-500 hover:text-black transition"
      >
        +
      </button>
    </div>
  );
}
