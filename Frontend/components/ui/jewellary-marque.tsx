import Marquee from "react-fast-marquee";
import Image from "next/image";

export default function JewelryMarquee() {
  const jewelryProducts = [
    {
      image: "/jewelry/feature-rings.jpg",
      name: "Diamond Ring",
      category: "RINGS",
    },
    {
      image: "/jewelry/feature-layered.jpg",
      name: "Gold Necklace",
      category: "NECKLACES",
    },
    {
      image: "/jewelry/feature-stud-earrings.jpg",
      name: "Pearl Earrings",
      category: "EARRINGS",
    },
    {
      image: "/jewelry/category-rings.jpg",
      name: "Sapphire Ring",
      category: "RINGS",
    },
    {
      image: "/jewelry/silver-pendant.jpg",
      name: "Silver Necklace",
      category: "NECKLACES",
    },
    {
      image: "/jewelry/feature-drop-earrings.jpeg",
      name: "Gold Earrings",
      category: "EARRINGS",
    },
  ];

  return (
    <div className="bg-transparent py-8 md:hidden">
      <Marquee
        speed={45}
        gradient={false}
        pauseOnHover
        className="flex items-center"
      >
        {[...jewelryProducts, ...jewelryProducts].map((product, index) => (
          <div
            key={index}
            className="flex flex-col items-center mx-6 group cursor-pointer"
          >
            {/* Jewelry Image */}
            <div className="w-20 h-20 md:w-32 md:h-32 relative rounded-full overflow-hidden border-2 group-hover:border-amber-400 transition-all duration-300">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            {/* Product Info */}
            <div className="text-center mt-3">
              <p className="text-xs text-gray-600 font-medium tracking-wide">
                {product.category}
              </p>
              <p className="text-[10px] text-gray-500 mt-1">{product.name}</p>
            </div>
          </div>
        ))}
      </Marquee>
    </div>
  );
}
