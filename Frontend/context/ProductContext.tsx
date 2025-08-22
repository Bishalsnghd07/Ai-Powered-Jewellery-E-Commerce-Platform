"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { fetchProducts } from "@/lib/api";
// Define your Product type in a shared file

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

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: Error | null;
}

const ProductContext = createContext<ProductContextType>({
  products: [],
  loading: true,
  error: null,
});

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ProductContextType>({
    products: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const [rings, necklaces, earrings] = await Promise.all([
          fetchProducts("rings"),
          fetchProducts("necklaces"),
          fetchProducts("earrings"),
        ]);

        setState({
          products: [...rings, ...necklaces, ...earrings],
          loading: false,
          error: null,
        });
      } catch (error) {
        setState({
          products: [],
          loading: false,
          error: error as Error,
        });
      }
    };

    loadProducts();
  }, []);

  return (
    <ProductContext.Provider value={state}>{children}</ProductContext.Provider>
  );
}

export const useProducts = () => useContext(ProductContext);
