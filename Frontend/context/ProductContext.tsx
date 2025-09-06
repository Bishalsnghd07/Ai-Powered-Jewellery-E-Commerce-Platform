"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { fetchProducts } from "@/lib/api";
import { PuffLoader, CircleLoader } from "react-spinners";

interface Product {
  id: string;
  _id?: string;
  name: string;
  price: number;
  description: string;
  tagline?: string;
  images: string[];
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
  const [loading, setLoading] = useState(true);
  const [minLoadingComplete, setMinLoadingComplete] = useState(false);
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
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Minimum loading timer effect
  useEffect(() => {
    const minLoadingTimer = setTimeout(() => {
      setMinLoadingComplete(true);
    }, 1000);

    return () => {
      clearTimeout(minLoadingTimer);
    };
  }, []);

  // Show loader for minimum 3 seconds OR until products load
  if (loading || !minLoadingComplete) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <CircleLoader color="#f59e0b" size={80} />
        <p className="text-amber-600 font-light text-sm tracking-widest">
          CURATING YOUR JEWELRY EXPERIENCE
        </p>
      </div>
    );
  }

  return (
    <ProductContext.Provider value={state}>{children}</ProductContext.Provider>
  );
}

export const useProducts = () => useContext(ProductContext);
