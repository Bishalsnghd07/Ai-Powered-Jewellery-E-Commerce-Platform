import Image from "next/image";
import Link from "next/link";

export default function AboutSection() {
  return (
    <>
      <section className="flex flex-col gap-8 px-[5%] xl:px-[10%] pb-4">
        <div className="flex h-fit w-full flex-col items-center gap-8 overflow-hidden rounded-lg bg-[#f1dec4] py-14 text-[#3a3a3a] md:gap-16 lg:flex-row lg:justify-center lg:gap-32">
          <div className="relative z-10">
            <Image
              src="/jewelry/feature-rings.jpg"
              alt="Diamond Ring"
              height={550}
              width={550}
              className="hidden w-96 object-cover translate-y-[5%] lg:block rounded-lg"
            />
          </div>
          <div className="flex flex-col items-center gap-4 px-6 text-center lg:w-80 lg:gap-8 z-10">
            <h2 className="text-4xl font-bold uppercase leading-10 tracking-wider">
              DIAMOND RING
            </h2>
            <p className="text-sm tracking-wide leading-7 text-gray-600">
              Our signature 1.5 carat diamond ring set in premium 18K gold.
            </p>
            <Link href="/rings/diamond-ring">
              <div className="flex h-[2.5rem] w-[10rem] cursor-pointer items-center justify-center bg-[#d4af37] hover:bg-[#c19b2e] transition-all duration-300 active:scale-110 rounded-lg">
                <p className="text-sm font-bold uppercase tracking-widest text-white">
                  View Details
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-8 px-[5%] xl:px-[10%] py-[9%] md:py-[4%]">
        <div className="flex flex-col-reverse md:flex-row gap-4">
          <div className="flex flex-col md:items-center z-10 w-full md:justify-center gap-4 md:gap-8 pr-8">
            <h2 className="text-5xl font-bold">
              CRAFTED WITH <span className="text-[#d4af37]">PRECISION</span>
            </h2>
            <p className="text-sm font-normal opacity-55 tracking-widest">
              Our master jewelers in New York have been creating exquisite
              pieces since 1985. Each item is handcrafted using
              ethically-sourced gemstones and premium metals.
            </p>
          </div>
          <div className="lg:block max-w-[39rem]">
            <Image
              src="/jewelry/about-craftsman.jpg"
              alt="Jewelry Craftsman"
              height={1000}
              width={1000}
              className="rounded-lg"
            />
          </div>
        </div>
      </section>
    </>
  );
}
