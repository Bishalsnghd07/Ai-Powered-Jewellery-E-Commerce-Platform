import { useProducts } from "@/context/ProductContext";
import ShopButton from "@/Reusable/ShopButton";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  const { products } = useProducts();
  const featuredProduct = products.find((p) => p.id === "eternal-diamond-ring");

  return (
    <div className="relative min-h-screen bg-[#f8f3ed] overflow-hidden">
      <div className="absolute top-[39%] md:top-1/2 left-2 sm:left-16 lg:left-40 transform -translate-y-1/2 z-10 w-full max-w-[600px] px-4 text-center lg:text-left">
        <NewProductBadge tagline={featuredProduct?.tagline} />
        <h1 className="text-4xl md:text-5xl lg:text-6xl text-[#3a3a3a] font-bold tracking-wider pb-2">
          {featuredProduct?.name}
        </h1>
        <HeroDescription description={featuredProduct?.description} />
        <div className="flex justify-center lg:justify-start">
          <Link href="/rings/eternal-diamond-ring">
            <ShopButton />
          </Link>
        </div>
      </div>

      <div className="absolute inset-0 w-full h-full">
        <div className="xl:hidden relative w-full h-full">
          {featuredProduct?.images[0] && (
            <Image
              src={featuredProduct.images[0]}
              alt={featuredProduct.name}
              fill
              priority
              className="object-cover object-center"
            />
          )}
        </div>

        <div className="hidden xl:block absolute bottom-1/3 right-1/4">
          <div className="relative w-[34vw] h-[34vh] ">
            {featuredProduct?.images[0] && (
              <Image
                src={featuredProduct.images[0]}
                alt={featuredProduct.name}
                fill
                priority
                className="object-contain object-bottom translate-x-[79%] translate-y-[19%] scale-[1.55]"
                sizes="70vw"
                style={{
                  transformOrigin: "right bottom", // transform-origin isn't available in Tailwind by default
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const NewProductBadge = ({ tagline }: { tagline?: string }) => (
  <h1 className="text-[#d4af37] tracking-[0.4em] text-lg">{tagline}</h1>
);

const HeroDescription = ({ description }: { description?: string }) => (
  <p className="text-[1rem] text-gray-600 md:text-gray-700 pb-4 md:max-w-[29rem] sm:pl-28 lg:pl-0">
    {description}
  </p>
);
