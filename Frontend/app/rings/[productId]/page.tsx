// "use client";

// import { useCart } from "@/context/CartContext";
// import QuantitySelector from "@/components/QuantitySelector";
// import { useState } from "react";
// import Image from "next/image";
// import BackButton from "@/Reusable/BackButton";

// // Ring-specific product data
// const RING_PRODUCTS = {
//   "eternal-diamond-ring": {
//     id: "eternal-diamond-ring",
//     name: "Eternal Diamond Ring",
//     price: 2499,
//     description:
//       "Crafted with a brilliant 1.5 carat center diamond in 14K white gold, this ring offers timeless elegance. The diamond is VVS1 clarity and F color grade for exceptional sparkle.",
//     features:
//       "Handcrafted by master jewelers using conflict-free diamonds. The ring features a classic solitaire design with a four-prong setting that maximizes light reflection. The band is polished to a high shine and includes a hidden halo of micropavé diamonds underneath the center stone for added brilliance.",
//     includes: [
//       { quantity: 1, item: "Ring box" },
//       { quantity: 1, item: "Certificate of Authenticity" },
//       { quantity: 1, item: "Lifetime warranty card" },
//       { quantity: 1, item: "Cleaning cloth" },
//     ],
//     image: "/jewelry/feature-ring.jpg",
//     materials: ["14K White Gold", "Diamond"],
//   },
//   "diamond-ring": {
//     id: "diamond-ring",
//     name: "Diamond Ring",
//     price: 2499,
//     description:
//       "Crafted with a brilliant 1.5 carat center diamond in 14K white gold, this ring offers timeless elegance. The diamond is VVS1 clarity and F color grade for exceptional sparkle.",
//     features:
//       "Handcrafted by master jewelers using conflict-free diamonds. The ring features a classic solitaire design with a four-prong setting that maximizes light reflection. The band is polished to a high shine and includes a hidden halo of micropavé diamonds underneath the center stone for added brilliance.",
//     includes: [
//       { quantity: 1, item: "Ring box" },
//       { quantity: 1, item: "Certificate of Authenticity" },
//       { quantity: 1, item: "Lifetime warranty card" },
//       { quantity: 1, item: "Cleaning cloth" },
//     ],
//     image: "/jewelry/feature-rings.jpg",
//     materials: ["14K White Gold", "Diamond"],
//   },
//   "gold-band": {
//     id: "gold-band",
//     name: "Classic Gold Band",
//     price: 899,
//     description:
//       "A simple yet elegant 14K solid gold band, perfect for everyday wear or as a wedding band.",
//     features:
//       "Made with hypoallergenic 14K yellow gold, this band is 4mm wide with a comfort-fit design. The surface is polished to a high shine and will develop a beautiful patina over time.",
//     includes: [
//       { quantity: 1, item: "Ring box" },
//       { quantity: 1, item: "Certificate of Authenticity" },
//     ],
//     image: "/jewelry/feature-gold-band.jpg",
//     materials: ["14K Yellow Gold"],
//   },
//   "stackable-ring": {
//     id: "stackable-ring",
//     name: "Delicate Stackable Ring",
//     price: 499,
//     description:
//       "A thin, minimalist ring designed to be stacked with others for a personalized look.",
//     features:
//       "This 1.5mm wide ring is crafted from 14K rose gold with a subtle hammered texture. The delicate design makes it perfect for mixing and matching with other rings in your collection.",
//     includes: [
//       { quantity: 1, item: "Ring box" },
//       { quantity: 1, item: "Care instructions" },
//     ],
//     image: "/jewelry/feature-stackable.jpg",
//     materials: ["14K Rose Gold"],
//   },
// };

// export default function RingDetail({
//   params,
// }: {
//   params: { productId: string };
// }) {
//   const { addToCart } = useCart();
//   const [quantity, setQuantity] = useState(1);

//   const product = RING_PRODUCTS[params.productId as keyof typeof RING_PRODUCTS];

//   if (!product) {
//     return <div>Ring not found</div>;
//   }

//   const handleAddToCart = () => {
//     addToCart({
//       id: product.id,
//       name: product.name,
//       price: product.price,
//       quantity: quantity,
//       image: product.image,
//     });
//   };

//   return (
//     <div className="container mx-auto px-4">
// <div className="flex md:pl-[5.6rem]">
//   <BackButton />
// </div>

// <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-2 md:ml-24">
//   <div className="bg-gray-50 p-8 rounded-lg">
//           <Image
//             src={product.image}
//             alt={product.name}
//             width={540}
//             height={560}
//             className="rounded-lg object-contain"
//             priority
//           />
//         </div>

// <div className="flex flex-col justify-center">
//   <h1 className="text-3xl font-bold mb-4 text-gray-800">
//     {product.name}
//   </h1>
//   <p className="text-gray-600 mb-6">{product.description}</p>

//   {product.materials && (
//     <div className="mb-6">
//       <h3 className="text-sm font-semibold text-gray-700">MATERIALS</h3>
//       <p className="text-gray-600">{product.materials.join(", ")}</p>
//     </div>
//   )}

//   <p className="text-2xl font-bold mb-8 text-amber-700">
//     ${product.price.toFixed(2)}
//   </p>

//   <div className="flex items-center space-x-4">
//     <QuantitySelector
//       quantity={quantity}
//       onQuantityChange={setQuantity}
//     />

//     <button
//       onClick={(e) => {
//         e.preventDefault();
//         handleAddToCart();
//         window.scrollTo({
//           top: 0,
//           behavior: "smooth",
//         });
//       }}
//       className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded transition"
//     >
//       ADD TO CART
//     </button>
//   </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-28 mt-32 md:ml-24 mb-12">
//         <div>
//           <h2 className="text-2xl font-bold mb-6 text-gray-800">FEATURES</h2>
//           <p className="text-gray-600 whitespace-pre-line">
//             {product.features}
//           </p>
//         </div>

//         <div>
//           <h2 className="text-2xl font-bold mb-6 text-gray-800">INCLUDES</h2>
//           <ul className="space-y-2">
//             {product.includes.map((item, index) => (
//               <li key={index} className="flex">
//                 <span className="text-amber-600 font-bold w-8">
//                   {item.quantity}x
//                 </span>
//                 <span className="text-gray-600">{item.item}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import QuantitySelector from "@/components/QuantitySelector";
import Image from "next/image";
import BackButton from "@/Reusable/BackButton";
import { fetchProductById } from "@/lib/api";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string;
  includes: { quantity: number; item: string }[];
  materials: string[];
  images: string[];
}

export default function RingDetail({
  params,
}: {
  params: { productId: string };
}) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(params.productId);
        setProduct(data);
      } catch (error) {
        console.error("Failed to load product:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [params.productId]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.images[0],
    });
  };

  if (loading)
    return <div className="text-center py-20">Loading product...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="container mx-auto px-4">
      {/* ... rest of your JSX remains similar, just using product from state ... */}
      <div className="flex md:pl-[5.6rem]">
        <BackButton />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-2 md:ml-24">
        <div className="bg-gray-50 p-8 rounded-lg">
          <Image
            src={product.images[0]} // Using Cloudinary URL
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
      {/* Features & Includes Sections */}
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
