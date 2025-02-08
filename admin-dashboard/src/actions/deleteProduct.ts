// app/lib/actions.ts
"use server";

import { client } from "@/lib/client";
import { revalidatePath } from "next/cache";

export async function deleteProduct(productId: string) {
  try {
    await client.delete(productId);
    revalidatePath("/products"); // 
    return { success: true };
  } catch (error) {
    console.error("Sanity delete error:", error);
    return { error: "Product delete failed" };
  }
}
