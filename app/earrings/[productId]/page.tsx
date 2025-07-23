"use client";
import { useCart } from "@/context/CartContext";
import QuantitySelector from "@/components/QuantitySelector";
import { useState } from "react";
import Image from "next/image";
import BackButton from "@/Reusable/BackButton";
import { EARRING_PRODUCTS, EarringProductId } from "../constants";

export default function EarringDetail({
  params,
}: {
  params: { productId: EarringProductId };
}) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = EARRING_PRODUCTS[params.productId];

  if (!product) {
    return <div>Earring not found</div>;
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image,
    });
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex md:pl-[5.6rem]">
        <BackButton />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-2 md:ml-24">
        <div className="bg-gray-50 p-8 rounded-lg">
          <Image
            src={product.image}
            alt={product.name}
            width={540}
            height={560}
            className="rounded-lg object-contain"
            priority
          />
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">
            {product.name}
          </h1>
          <p className="text-gray-600 mb-6">{product.description}</p>

          {product.materials && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700">MATERIALS</h3>
              <p className="text-gray-600">{product.materials.join(", ")}</p>
            </div>
          )}

          {"type" in product && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700">TYPE</h3>
              <p className="text-gray-600">{product.type}</p>
            </div>
          )}

          <p className="text-2xl font-bold mb-8 text-amber-700">
            ${product.price.toFixed(2)}
          </p>

          <div className="flex items-center space-x-4">
            <QuantitySelector
              quantity={quantity}
              onQuantityChange={setQuantity}
            />

            <button
              onClick={(e) => {
                e.preventDefault();
                handleAddToCart();
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded transition"
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-28 mt-32 md:ml-24 mb-12">
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">FEATURES</h2>
          <p className="text-gray-600 whitespace-pre-line">
            {product.features}
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">INCLUDES</h2>
          <ul className="space-y-2">
            {product.includes.map((item, index) => (
              <li key={index} className="flex">
                <span className="text-amber-600 font-bold w-8">
                  {item.quantity}x
                </span>
                <span className="text-gray-600">{item.item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
