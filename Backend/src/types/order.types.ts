// types/order.types.ts
export interface IOrderCustomer {
  name: string;
  email: string;
  phone?: string;
  address: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
}

export interface IOrderProduct {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  metalType?: string;
  size?: string;
}

export interface IOrder {
  orderId: string;
  customer: IOrderCustomer;
  products: IOrderProduct[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  paymentMethod: string;
  status: "processing" | "shipped" | "delivered" | "cancelled";
  createdAt?: Date;
  updatedAt?: Date;
}
