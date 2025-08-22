export const NECKLACE_PRODUCTS = {
  "gold-pendant": {
    id: "gold-pendant",
    name: "Solitaire Gold Pendant",
    price: 1299,
    description:
      "A timeless 14K yellow gold pendant with a single solitaire diamond, perfect for everyday elegance.",
    features:
      "Handcrafted with a 2mm gold chain and 0.25ct diamond. Lobster clasp with 2-inch extender.",
    includes: [
      { quantity: 1, item: "Velvet gift box" },
      { quantity: 1, item: "Polishing cloth" },
    ],
    image: "/jewelry/category-necklaces.jpg",
    materials: ["14K Yellow Gold", "Diamond"],
    chainLength: "18-20 inches",
  },
  "layered-necklace": {
    id: "layered-necklace",
    name: "Layered Minimalist Necklace",
    price: 999,
    description:
      "Three delicate chains (14K gold, silver, rose gold) for effortless stacking.",
    features: "Adjustable lengths (16-18 inches). Hypoallergenic materials.",
    includes: [
      // Added missing includes
      { quantity: 1, item: "Dust pouch" },
      { quantity: 1, item: "Care instructions" },
    ],
    image: "/jewelry/feature-layered.jpg",
  },
  "silver-pendant": {
    id: "silver-pendant",
    name: "Silver Pendant Necklace",
    price: 799,
    description: "A minimalist sterling silver pendant with modern elegance.",
    features: "Crafted with 925 silver. Adjustable chain. Lightweight feel.",
    includes: [
      { quantity: 1, item: "Gift box" },
      { quantity: 1, item: "Warranty card" },
    ],
    image: "/jewelry/silver-pendant.jpg",
    materials: ["Sterling Silver"],
    chainLength: "18 inches",
  },
  "layer-necklace": {
    id: "layer-necklace",
    name: "Layered Necklace",
    price: 899,
    description:
      "Three delicate chains (14K gold, silver, rose gold) for effortless stacking.",
    features: "Adjustable lengths (16-18 inches). Hypoallergenic materials.",
    includes: [
      // Added missing includes
      { quantity: 1, item: "Dust pouch" },
      { quantity: 1, item: "Care instructions" },
    ],
    image: "/jewelry/layer-necklaces.jpg",
  },

  "chain-necklace": {
    id: "chain-necklace",
    name: "Bold Chain Necklace",
    price: 999,
    description: "Statement chain necklace in high-polish gold-plated steel.",
    features: "Secure clasp. Rust-resistant. Unisex design.",
    includes: [
      { quantity: 1, item: "Dust pouch" },
      { quantity: 1, item: "Jewelry care tips" },
    ],
    image: "/jewelry/chain-necklaces.jpg",
    materials: ["Gold-plated Steel"],
    chainLength: "20 inches",
  },
} as const;

export type NecklaceProductId = keyof typeof NECKLACE_PRODUCTS;
export type NecklaceProduct = (typeof NECKLACE_PRODUCTS)[NecklaceProductId];
