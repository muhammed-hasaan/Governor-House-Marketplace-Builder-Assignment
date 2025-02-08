import { OrderTable } from "@/components/order-table";
import { getAllOrders } from "@/lib/orders/getAllOrders";

export default async function AllOrders() {
  const orders = await getAllOrders();

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <h1 className="text-3xl font-bold mb-6">All Orders</h1>
      <OrderTable orders={orders} />
    </div>
  );
}
