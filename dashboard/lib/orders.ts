import { client } from "./sanity";

export type Address = {
  street: string;
  city: string;
  state: string;
  postalCode: string;
};

export type OrderItem = {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  subtotal: number;
};

export type ShippingInfo = {
  name: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  countryCode: string;
};

export type LabelMessages = {
  reference1: string;
  reference2: string;
  reference3: string;
};

export type Order = {
  _id: string;
  customerId: string;
  orderDate: string;
  orderStatus: "pending" | "shipped" | "delivered" | "canceled";
  shippingAddress: Address;
  orderItems: OrderItem[];
  totalAmount: number;
  paymentMethod: "cashOnDelivery" | "creditCard" | "debitCard" | "paypal";
  paymentStatus: "pending" | "paid" | "failed";
  trackingId: string;
  trackingStatus: "pending" | "shipped" | "inTransit" | "delivered";
  shipDate: string;
  shipFrom: ShippingInfo;
  returnTo: ShippingInfo;
  totalWeight: number;
  labelMessages: LabelMessages;
  insuranceProvider: "none" | "thirdParty" | "selfInsured";
};

export async function getOrders(
  page = 1,
  limit = 10,
  sort = "orderDate desc",
  filter = ""
): Promise<{ orders: Order[]; total: number }> {
  const start = (page - 1) * limit;
  const end = start + limit;

  const query = `
    {
      "orders": *[_type == "order" ${filter}] | order(${sort}) [${start}...${end}] {
        _id,
        customerId,
        orderDate,
        orderStatus,
        totalAmount,
        paymentStatus,
        trackingStatus
      },
      "total": count(*[_type == "order" ${filter}])
    }
  `;

  return client.fetch(query);
}
export async function updateOrder(id: string, updates: Partial<Order>) {
  const query = `*[_type == "order" && _id == $id][0]`;
  const params = { id };

  try {
    await client.patch(id).set(updates).commit();

    return client.fetch(query, params);
  } catch (error) {
    console.error("Failed to update order:", error);
    throw error;
  }
}

export async function getOrderById(id: string): Promise<Order> {
  const query = `*[_type == "order" && _id == $id][0]`;
  return client.fetch(query, { id }, { cache: "no-cache" });
}
