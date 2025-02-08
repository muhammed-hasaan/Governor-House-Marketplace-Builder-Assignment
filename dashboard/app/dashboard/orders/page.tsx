import { Suspense } from "react";
import { OrderList } from "@/components/order-list";
import { OrderListSkeleton } from "@/components/order-list-skeleton";

export default function OrdersPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <Suspense fallback={<OrderListSkeleton />}>
        <OrderList />
      </Suspense>
    </div>
  );
}
