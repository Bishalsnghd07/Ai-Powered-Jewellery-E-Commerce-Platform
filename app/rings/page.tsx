"use client";

import CategoryCard from "@/components/CategoryCard";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import BackButton from "@/Reusable/BackButton";
import ShopButton from "@/Reusable/ShopButton";
import Image from "next/image";
import Link from "next/link";

export default function RingsCollection() {
  const ringCategories = [
    {
      title: "RINGS",
      href: "/rings",
      imageSrc: "/jewelry/category-rings.jpg",
    },
    {
      title: "NECKLACES",
      href: "/necklaces",
      imageSrc: "/jewelry/category-necklaces.jpg",
    },
    {
      title: "EARRINGS",
      href: "/earrings",
      imageSrc: "/jewelry/category-earrings.jpg",
    },
  ];

  const featuredRings = [
    {
      id: "diamond-ring",
      tagline: "SIGNATURE COLLECTION",
      title: "Diamond Ring",
      description:
        "Our signature 1.5 carat diamond ring set in 14K white gold. Handcrafted by master jewelers using ethically-sourced diamonds.",
      imageSrc: "/jewelry/feature-rings.jpg",
      href: "/rings/diamond-ring",
    },
    {
      id: "gold-band",
      tagline: "TIMELESS CLASSIC",
      title: "Classic Gold Band",
      description:
        "A simple yet elegant 14K solid gold band, perfect for everyday wear or as a wedding band. Handcrafted to last a lifetime.",
      imageSrc: "/jewelry/feature-gold-band.jpg",
      href: "/rings/gold-band",
      reverseLayout: true,
    },
    {
      id: "stackable-ring",
      tagline: "NEW COLLECTION",
      title: "Delicate Stackable Rings",
      description:
        "Mix and match our thin, minimalist rings in 14K rose gold with subtle hammered texture for a personalized look.",
      imageSrc: "/jewelry/feature-stackable.jpg",
      href: "/rings/stackable-ring",
    },
  ];

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
            ring.reverseLayout ? "md:flex-row-reverse" : "md:flex-row"
          } justify-center items-center px-16 py-4 gap-8 md:gap-12`}
        >
          <Image
            src={ring.imageSrc}
            alt={ring.title}
            height={550}
            width={550}
            className="rounded-lg"
          />
          <div className="flex flex-col w-full justify-center items-center">
            <h1 className="text-amber-600 text-md font-normal tracking-[0.63rem] pt-0 pb-4 text-center">
              {ring.tagline}
            </h1>
            <h2 className="text-4xl md:text-lg lg:text-3xl text-black font-bold tracking-wider pb-4 max-w-[18rem] text-center">
              {ring.title}
            </h2>
            <p className="opacity-45 max-w-[24rem] text-center text-sm leading-6">
              {ring.description}
            </p>
            <div className="flex flex-col items-center pt-4">
              <Link href={ring.href}>
                <ShopButton />
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Category Grid */}
      <section className="px-16 pt-8 pb-8">
        <h2 className="text-3xl font-bold text-center mb-8 md:mb-12 mt-8 md:mt-0">
          Browse Our Collections
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-24 md:gap-8 pt-16 pb-12">
          {ringCategories.map((category) => (
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
            <Image
              src="/jewelry/handcrafted-rings.jpg"
              alt="Ring Craftsman"
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
