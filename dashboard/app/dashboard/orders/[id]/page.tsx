import { Suspense } from "react";
import { OrderDetail } from "@/components/order-detail";
import { Skeleton } from "@/components/ui/skeleton";

export default function OrderDetailPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>
      <Suspense fallback={<Skeleton className="h-[600px]" />}>
        <OrderDetail />
      </Suspense>
    </div>
  );
}
