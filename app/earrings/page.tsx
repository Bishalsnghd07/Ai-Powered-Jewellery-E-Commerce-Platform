"use client";
import { EARRING_PRODUCTS } from "./constants";
import CategoryCard from "@/components/CategoryCard";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import BackButton from "@/Reusable/BackButton";
import ShopButton from "@/Reusable/ShopButton";
import Image from "next/image";
import Link from "next/link";

export default function EarringsCollection() {
  const earringCategories = [
    {
      title: "STUD EARRINGS",
      href: "/earrings/stud-earrings",
      imageSrc: "/jewelry/feature-stud-earrings.jpg",
    },
    {
      title: "HOOP EARRINGS",
      href: "/earrings/hoop-earrings",
      imageSrc: "/jewelry/feature-hoop-earrings.webp",
    },
    {
      title: "DROP EARRINGS",
      href: "/earrings/drop-earrings",
      imageSrc: "/jewelry/feature-drop-earrings.jpeg",
    },
  ];

  const featuredEarrings = [
    {
      id: "stud-earrings",
      tagline: "BEST SELLER",
      title: EARRING_PRODUCTS["stud-earrings"].name,
      description: EARRING_PRODUCTS["stud-earrings"].description,
      imageSrc: "/jewelry/feature-stud-earrings.jpg",
      href: "/earrings/stud-earrings",
      compact: true,
      imageWidth: 500,
      imageHeight: 500,
    },
    {
      id: "hoop-earrings",
      tagline: "CLASSIC COLLECTION",
      title: EARRING_PRODUCTS["hoop-earrings"].name,
      description: EARRING_PRODUCTS["hoop-earrings"].description,
      imageSrc: "/jewelry/feature-hoop-earrings.webp",
      href: "/earrings/hoop-earrings",
      reverseLayout: true,
      compact: true,
      imageWidth: 500,
      imageHeight: 500,
    },
  ];

  return (
    <>
      <PageHeader title="Earrings Collection" />
      <div className="flex pl-4 md:pl-[3.8rem]">
        <BackButton />
      </div>

      <div className="flex flex-col gap-[2.5rem]">
        {featuredEarrings.map((earring) => (
          <div
            key={earring.id}
            className={`flex flex-col ${
              earring.reverseLayout ? "md:flex-row-reverse" : "md:flex-row"
            } justify-center items-center px-16 py-4 gap-8`}
          >
            <Image
              src={earring.imageSrc}
              alt={earring.title}
              width={earring.imageWidth || 550}
              height={earring.imageHeight || 550}
              className={`rounded-lg ${
                earring.compact ? "md:w-[55vw] md:h-[55vh]" : "w-full"
              }`}
            />
            <div className="flex flex-col w-full justify-center items-center">
              <h1 className="text-amber-600 text-md text-center font-normal tracking-[0.63rem] pt-0 pb-4">
                {earring.tagline}
              </h1>
              <h2 className="text-4xl md:text-lg lg:text-3xl text-black font-bold tracking-wider pb-4 max-w-[18rem] text-center">
                {earring.title}
              </h2>
              <p className="opacity-45 max-w-[24rem] text-center text-sm leading-6">
                {earring.description}
              </p>
              <div className="flex flex-col items-center pt-4">
                <Link href={earring.href}>
                  <ShopButton />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <section className="px-16 pt-20 pb-8">
        <h2 className="text-3xl font-bold text-center mb-8">Explore Styles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-32 md:gap-8 pt-20 pb-8">
          {earringCategories.map((category) => (
            <CategoryCard
              key={category.title}
              title={category.title}
              href={category.href}
              imageSrc={category.imageSrc}
            />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-8 px-[5%] xl:px-[10%] py-8 w-full">
        <div className="flex flex-col-reverse md:flex-row gap-4">
          <div className="flex flex-col md:items-center z-10 w-full md:justify-center gap-4 pr-8">
            <h2 className="text-3xl lg:text-5xl font-bold">
              HANDCRAFTED <span className="text-amber-600">EARRINGS</span>
            </h2>
            <p className="text-sm font-normal opacity-55 tracking-widest">
              Our earrings are designed for comfort and durability. Each pair
              undergoes rigorous quality testing and comes with hypoallergenic
              backing options.
            </p>
          </div>
          <div className="lg:block max-w-[39rem] pb-8">
            <Image
              src="/jewelry/earrings-craftsman.jpg"
              alt="Earring Craftsman"
              height={850}
              width={850}
              className="rounded-lg"
            />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
