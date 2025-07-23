export const EARRING_PRODUCTS = {
  "stud-earrings": {
    id: "stud-earrings",
    name: "Diamond Stud Earrings",
    price: 1599,
    description:
      "Classic round cut diamond studs in 14K white gold, perfect for everyday wear.",
    features:
      "Each earring features a 0.5ct diamond (total 1ct) with four-prong setting. Includes screw-back closures for security.",
    includes: [
      { quantity: 1, item: "Velvet gift box" },
      { quantity: 1, item: "Certificate of Authenticity" },
      { quantity: 1, item: "Cleaning cloth" },
    ],
    image: "/jewelry/feature-stud-earrings.jpg",
    materials: ["14K White Gold", "Diamond"],
    type: "Stud",
  },
  "hoop-earrings": {
    id: "hoop-earrings",
    name: "Classic Hoop Earrings",
    price: 899,
    description: "Timeless 14K yellow gold hoops with secure latch backing.",
    features:
      "Available in three sizes (10mm, 15mm, 20mm). Hollow design for lightweight comfort.",
    includes: [
      { quantity: 1, item: "Gift box" },
      { quantity: 1, item: "Size adjustment tool" },
    ],
    image: "/jewelry/feature-hoop-earrings.webp",
    materials: ["14K Yellow Gold"],
    type: "Hoop",
  },
} as const;

export type EarringProductId = keyof typeof EARRING_PRODUCTS;
export type EarringProduct = (typeof EARRING_PRODUCTS)[EarringProductId];
