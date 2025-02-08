"use server";

import { client } from "@/lib/client";
import { revalidatePath } from "next/cache";

export async function deleteOrder(id: string) {
  try {
    await client.delete(id);
    revalidatePath("/all-orders");
  } catch (error) {
    console.error("Error deleting order:", error);
    throw new Error("Failed to delete order");
  }
}

export async function updateOrderStatus(id: string, status: string) {
  try {
    await client.patch(id).set({ orderStatus: status }).commit();
    revalidatePath("/all-orders");
  } catch (error) {
    console.error("Error updating order status:", error);
    throw new Error("Failed to update order status");
  }
}
