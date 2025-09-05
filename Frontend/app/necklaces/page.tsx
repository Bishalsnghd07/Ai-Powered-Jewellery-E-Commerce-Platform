"use client";

import { NECKLACE_PRODUCTS } from "./constants";
import CategoryCard from "@/components/CategoryCard";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import BackButton from "@/Reusable/BackButton";
import ShopButton from "@/Reusable/ShopButton";
import Image from "next/image";
import Link from "next/link";

export default function NecklacesCollection() {
  const necklaceCategories = [
    {
      title: "SOLITAIRE PENDANTS",
      href: "/necklaces/silver-pendant",
      imageSrc: "/jewelry/silver-pendant.jpg",
    },
    {
      title: "LAYERED NECKLACES",
      href: "/necklaces/layer-necklace",
      imageSrc: "/jewelry/layer-necklaces.jpg",
    },
    {
      title: "CHAIN NECKLACES",
      href: "/necklaces/chain-necklace",
      imageSrc: "/jewelry/chain-necklaces.jpg",
    },
  ];

  const featuredNecklaces = [
    {
      id: "gold-pendant",
      tagline: "CLASSIC ELEGANCE",
      title: NECKLACE_PRODUCTS["gold-pendant"].name,
      description: NECKLACE_PRODUCTS["gold-pendant"].description,
      imageSrc: "/jewelry/category-necklaces.jpg",
      href: "/necklaces/gold-pendant",
      compact: true,
      imageWidth: 500,
      imageHeight: 500,
    },
    {
      id: "layered-necklace",
      tagline: "TREND EDIT",
      title: NECKLACE_PRODUCTS["layered-necklace"].name,
      description: NECKLACE_PRODUCTS["layered-necklace"].description,
      imageSrc: "/jewelry/feature-layered.jpg",
      href: "/necklaces/layered-necklace",
      reverseLayout: true,
      compact: true,
      imageWidth: 500,
      imageHeight: 500,
    },
  ];

  return (
    <>
      <PageHeader title="Necklaces Collection" />
      <div className="flex pl-4 md:pl-[3.8rem]">
        <BackButton />
      </div>

      {/* Featured Necklaces Sections */}
      {featuredNecklaces.map((necklace) => (
        <div key={necklace.id} className="flex flex-col pb-7 md:pb-0">
          <div
            className={`flex flex-col ${
              necklace.reverseLayout ? "md:flex-row-reverse" : "md:flex-row"
            } justify-center items-center px-12 md:px-16 py-4 gap-1 md:gap-8`}
          >
            <Image
              src={necklace.imageSrc}
              alt={necklace.title}
              width={necklace.imageWidth || 550}
              height={necklace.imageHeight || 550}
              className={`rounded-lg ${
                necklace.compact ? "md:w-[55vw] h-[29vh] md:h-[55vh]" : "w-full"
              }`}
            />
            <div className="flex flex-col w-full justify-center items-center">
              <div className="flex flex-row md:flex-col justify-between md:justify-normal md:items-center gap-2 lg:gap-0 md:pr-0 pt-4 md:pt-0">
                <h1 className="text-amber-600 text-sm md:text-base font-normal tracking-[0.41rem] md:tracking-[0.63rem] pt-0 md:pt-0 md:pb-4 text-center">
                  {necklace.tagline}
                </h1>
                <h2 className="text-sm md:text-lg lg:text-3xl text-black font-bold tracking-wider pb-4 md:max-w-[18rem] text-center">
                  {necklace.title}
                </h2>
              </div>
              <p className="opacity-45 max-w-[24rem] text-center text-[0.82rem] md:text-sm leading-6">
                {necklace.description}
              </p>
              <div className="flex flex-row md:flex-col md:items-center pt-4">
                <Link href={necklace.href}>
                  <ShopButton />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Category Grid Section */}
      <section className="px-16 pt-6 md:pt-16 pb-8">
        <h2 className="text-lg md:text-3xl font-bold text-center mb-11">
          Explore Necklace Styles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-32 md:gap-8 pt-16">
          {necklaceCategories.map((category) => (
            <CategoryCard
              key={category.title}
              title={category.title}
              href={category.href}
              imageSrc={category.imageSrc}
            />
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="flex flex-col gap-8 px-[5%] xl:px-[10%] py-12 md:py-12 w-full">
        <div className="flex flex-col-reverse md:flex-row gap-4">
          <div className="flex flex-col md:items-center z-10 w-full md:justify-center gap-2 lg:gap-8 pr-8 pt-4 md:pt-0">
            <h2 className="text-xl md::text-5xl font-bold">
              {" "}
              HANDCRAFTED <span className="text-amber-600">NECKLACES</span>
            </h2>
            <p className="text-sm font-normal opacity-55 tracking-widest">
              Our necklaces are designed to become heirlooms. Each piece is
              crafted from premium materials with secure clasps and adjustable
              lengths. All necklaces come with a lifetime warranty against
              manufacturing defects.
            </p>
          </div>
          <div className="lg:block max-w-[39rem]">
            <Image
              src="/jewelry/about-craftsman.jpg"
              alt="Necklace Craftsman"
              height={1000}
              width={1000}
              className="rounded-lg"
            />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
