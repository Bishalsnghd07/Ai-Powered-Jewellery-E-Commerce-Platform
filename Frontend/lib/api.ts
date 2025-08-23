// frontend/lib/api.ts
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const productCache = new Map();

export async function fetchProducts(category: string = "all") {
  const cacheKey = `products-${category}`;

  // Return cached data if available
  if (productCache.has(cacheKey)) {
    return productCache.get(cacheKey);
  }

  try {
    const res = await fetch(
      `${API_BASE_URL}/api/products?category=${category}`
    );
    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();
    productCache.set(cacheKey, data);
    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

export async function fetchProductById(id: string) {
  const res = await fetch(`${API_BASE_URL}/api/products/${id}`);
  if (!res.ok) throw new Error("Product not found");
  return res.json();
}

export async function createOrder(orderData: any) {
  try {
    console.log("Sending order data:", orderData); // Log outgoing data

    const response = await fetch(`${API_BASE_URL}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    console.log("Received response status:", response.status);

    console.log("Full request URL:", `${API_BASE_URL}/api/orders`);

    // First check if response is HTML (error page)
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("text/html")) {
      const text = await response.text();
      console.error("Received HTML error page:", text);
      throw new Error("Server returned an error page");
    }

    const data = await response.json();
    console.log("Received response data:", data);

    if (!response.ok) {
      console.error("API Error:", data);
      throw new Error(data.error || "Failed to create order");
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Full error details:", {
        error,
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
    } else {
      console.error("Full error details:", { error });
    }
    throw error;
  }
}
