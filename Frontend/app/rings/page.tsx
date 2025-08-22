// "use client";

// import CategoryCard from "@/components/CategoryCard";
// import Footer from "@/components/Footer";
// import PageHeader from "@/components/PageHeader";
// import BackButton from "@/Reusable/BackButton";
// import ShopButton from "@/Reusable/ShopButton";
// import Image from "next/image";
// import Link from "next/link";

// export default function RingsCollection() {
//   const ringCategories = [
//     {
//       title: "RINGS",
//       href: "/rings",
//       imageSrc: "/jewelry/category-rings.jpg",
//     },
//     {
//       title: "NECKLACES",
//       href: "/necklaces",
//       imageSrc: "/jewelry/category-necklaces.jpg",
//     },
//     {
//       title: "EARRINGS",
//       href: "/earrings",
//       imageSrc: "/jewelry/category-earrings.jpg",
//     },
//   ];

//   const featuredRings = [
//     {
//       id: "diamond-ring",
//       tagline: "SIGNATURE COLLECTION",
//       title: "Diamond Ring",
//       description:
//         "Our signature 1.5 carat diamond ring set in 14K white gold. Handcrafted by master jewelers using ethically-sourced diamonds.",
//       imageSrc: "/jewelry/feature-rings.jpg",
//       href: "/rings/diamond-ring",
//     },
//     {
//       id: "gold-band",
//       tagline: "TIMELESS CLASSIC",
//       title: "Classic Gold Band",
//       description:
//         "A simple yet elegant 14K solid gold band, perfect for everyday wear or as a wedding band. Handcrafted to last a lifetime.",
//       imageSrc: "/jewelry/feature-gold-band.jpg",
//       href: "/rings/gold-band",
//       reverseLayout: true,
//     },
//     {
//       id: "stackable-ring",
//       tagline: "NEW COLLECTION",
//       title: "Delicate Stackable Rings",
//       description:
//         "Mix and match our thin, minimalist rings in 14K rose gold with subtle hammered texture for a personalized look.",
//       imageSrc: "/jewelry/feature-stackable.jpg",
//       href: "/rings/stackable-ring",
//     },
//   ];

//   return (
//     <>
//       <PageHeader title="Rings Collection" />
//       <a className="flex pl-4 md:pl-[3.6rem]">
//         <BackButton />
//       </a>

//       {/* Featured Rings Sections */}
//       {featuredRings.map((ring, index) => (
//         <div
//           key={ring.id}
//           className={`flex flex-col ${
//             ring.reverseLayout ? "md:flex-row-reverse" : "md:flex-row"
//           } justify-center items-center px-16 py-4 gap-8 md:gap-12`}
//         >
//           <Image
//             src={ring.imageSrc}
//             alt={ring.title}
//             height={550}
//             width={550}
//             className="rounded-lg"
//           />
//           <div className="flex flex-col w-full justify-center items-center">
//             <h1 className="text-amber-600 text-md font-normal tracking-[0.63rem] pt-0 pb-4 text-center">
//               {ring.tagline}
//             </h1>
//             <h2 className="text-4xl md:text-lg lg:text-3xl text-black font-bold tracking-wider pb-4 max-w-[18rem] text-center">
//               {ring.title}
//             </h2>
//             <p className="opacity-45 max-w-[24rem] text-center text-sm leading-6">
//               {ring.description}
//             </p>
//             <div className="flex flex-col items-center pt-4">
//               <Link href={ring.href}>
//                 <ShopButton />
//               </Link>
//             </div>
//           </div>
//         </div>
//       ))}

//       {/* Category Grid */}
//       <section className="px-16 pt-8 pb-8">
//         <h2 className="text-3xl font-bold text-center mb-8 md:mb-12 mt-8 md:mt-0">
//           Browse Our Collections
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-24 md:gap-8 pt-16 pb-12">
//           {ringCategories.map((category) => (
//             <CategoryCard
//               key={category.title}
//               title={category.title}
//               href={category.href}
//               imageSrc={category.imageSrc}
//             />
//           ))}
//         </div>
//       </section>

//       {/* About Section */}
//       <section className="flex flex-col gap-8 px-[5%] xl:px-[10%] py-8 w-full">
//         <div className="flex flex-col-reverse md:flex-row gap-4 pb-4">
//           <div className="flex flex-col md:items-center z-10 w-full md:justify-center gap-4 md:gap-8 pr-8">
//             <h2 className="text-3xl md:text-5xl font-bold">
//               HANDCRAFTED <span className="text-amber-600">RINGS</span>
//             </h2>
//             <p className="text-sm font-normal opacity-55 tracking-widest">
//               Our rings are crafted by master jewelers using only the finest
//               materials. Each piece is designed to last a lifetime and comes
//               with our comprehensive warranty. We offer free resizing within the
//               first year of purchase.
//             </p>
//           </div>
//           <div className="lg:block max-w-[39rem]">
//             <Image
//               src="/jewelry/handcrafted-rings.jpg"
//               alt="Ring Craftsman"
//               height={1000}
//               width={1000}
//               className="rounded-lg"
//             />
//           </div>
//         </div>
//       </section>
//       <Footer />
//     </>
//   );
// }

"use client";

import { useEffect, useMemo, useState } from "react";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import BackButton from "@/Reusable/BackButton";
import ShopButton from "@/Reusable/ShopButton";
import Image from "next/image";
import Link from "next/link";
import { fetchProducts } from "@/lib/api";
import CategoryCard from "@/components/CategoryCard";

interface Product {
  id: string;
  _id?: string;
  name: string;
  price: number;
  description: string;
  tagline?: string;
  images: string[]; // Changed back to string[] since your API returns strings
  category: string;
  features?: string;
  includes?: { quantity: number; item: string }[];
  materials?: string[];
}

export default function RingsCollection() {
  const [featuredRings, setFeaturedRings] = useState<Product[]>([]);
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // These are the product IDs you want to feature
  const FEATURED_PRODUCT_IDS = useMemo(
    () => ["diamond-ring", "feature-gold-band", "feature-stackable"],
    []
  );

  // Category showcase product IDs (using the 'id' field)
  const CATEGORY_PRODUCT_IDS = useMemo(
    () => [
      "gold-ring", // rings
      "category-necklaces", // necklaces
      "about-craftsman", // earrings
    ],
    []
  );

  const FEATURE_PRODUCT_ID = useMemo(() => ["handcrafted-rings"], []);

  // useEffect(() => {
  // let isMounted = true;
  //   const loadProducts = async () => {
  //     try {
  //       const [rings, necklaces, earrings] = await Promise.all([
  //         fetchProducts("rings"),
  //         fetchProducts("necklaces"),
  //         fetchProducts("earrings"),
  //       ]);

  //       const allProducts = [...rings, ...necklaces, ...earrings];

  //       setFeaturedRings(
  //         allProducts.filter((product) =>
  //           FEATURED_PRODUCT_IDS.includes(product.id)
  //         )
  //       );

  //       setCategoryProducts(
  //         allProducts.filter((product) =>
  //           CATEGORY_PRODUCT_IDS.includes(product.id)
  //         )
  //       );

  //       setFeaturedProducts(
  //         allProducts.filter((product) =>
  //           FEATURE_PRODUCT_ID.includes(product.id)
  //         )
  //       );
  //     } catch (error) {
  //       console.error("Failed to load products:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   loadProducts();
  // }, []);

  useEffect(() => {
    let isMounted = true; // Track mounted state

    const loadProducts = async () => {
      try {
        const [rings, necklaces, earrings] = await Promise.all([
          fetchProducts("rings"),
          fetchProducts("necklaces"),
          fetchProducts("earrings"),
        ]);

        // Only proceed if component is still mounted
        if (!isMounted) return;

        const allProducts = [...rings, ...necklaces, ...earrings];

        if (isMounted) {
          setFeaturedRings(
            allProducts.filter((product) =>
              FEATURED_PRODUCT_IDS.includes(product.id)
            )
          );

          setCategoryProducts(
            allProducts.filter((product) =>
              CATEGORY_PRODUCT_IDS.includes(product.id)
            )
          );

          setFeaturedProducts(
            allProducts.filter((product) =>
              FEATURE_PRODUCT_ID.includes(product.id)
            )
          );
        }
      } catch (error) {
        if (isMounted) {
          console.error("Failed to load products:", error);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [FEATURED_PRODUCT_IDS, CATEGORY_PRODUCT_IDS, FEATURE_PRODUCT_ID]);

  if (loading) return <div className="text-center py-20">Loading rings...</div>;

  return (
    <>
      <PageHeader title="Rings Collection" />
      <a className="flex pl-4 md:pl-[3.6rem]">
        <BackButton />
      </a>

      {/* Featured Rings Sections */}
      {featuredRings.map((ring, index) => (
        <div
          key={ring.id}
          className={`flex flex-col ${
            index % 2 !== 0 ? "md:flex-row-reverse" : "md:flex-row"
          } justify-center items-center px-16 py-4 gap-8 md:gap-12 bg-white`}
        >
          {ring.images[0] && (
            <Image
              src={ring.images[0]}
              alt={ring.name}
              width={550}
              height={550}
              className="rounded-lg"
              priority
            />
          )}

          <div className="flex flex-col w-full justify-center items-center p-6">
            {/* TAGLINE (if exists) */}
            {ring.tagline && (
              <h1 className="text-amber-600 text-lg font-bold tracking-widest mb-2 text-center">
                {ring.tagline}
              </h1>
            )}

            {/* NAME */}
            <h2 className="text-3xl text-black font-bold mb-4 text-center">
              {ring.name}
            </h2>

            {/* PRICE */}
            <p className="text-black text-2xl font-medium mb-4">
              ${ring.price.toLocaleString()}
            </p>

            {/* DESCRIPTION */}
            <p className="text-gray-700 text-base mb-6 max-w-md text-center">
              {ring.description}
            </p>

            {/* SHOP BUTTON */}
            <Link href={`/rings/${ring.id}`}>
              <ShopButton />
            </Link>
          </div>
        </div>
      ))}

      {/* Rest of your component remains the same */}
      {/* ... */}
      {/* Category Grid */}
      <section className="px-16 pt-8 pb-8">
        <h2 className="text-3xl font-bold text-center mb-8 md:mb-12 mt-8 md:mt-0">
          Browse Our Collections
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-24 md:gap-8 pt-16 pb-12">
          {categoryProducts.map((product) => (
            <CategoryCard
              key={product.id}
              title={product.category.toUpperCase()}
              href={`/${product.category}`}
              imageSrc={product.images[0]}
            />
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="flex flex-col gap-8 px-[5%] xl:px-[10%] py-8 w-full">
        <div className="flex flex-col-reverse md:flex-row gap-4 pb-4">
          <div className="flex flex-col md:items-center z-10 w-full md:justify-center gap-4 md:gap-8 pr-8">
            <h2 className="text-3xl md:text-5xl font-bold">
              HANDCRAFTED <span className="text-amber-600">RINGS</span>
            </h2>
            <p className="text-sm font-normal opacity-55 tracking-widest">
              Our rings are crafted by master jewelers using only the finest
              materials. Each piece is designed to last a lifetime and comes
              with our comprehensive warranty. We offer free resizing within the
              first year of purchase.
            </p>
          </div>
          <div className="lg:block max-w-[39rem]">
            {featuredProducts.map((product) => (
              <Image
                key={product.id}
                src={product.images[0]}
                alt={product.name}
                width={1000}
                height={1000}
                className="rounded-lg"
                title={product.category.toUpperCase()}
              />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
