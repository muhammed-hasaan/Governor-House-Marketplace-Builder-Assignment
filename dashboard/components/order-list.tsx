"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { getOrders, Order } from "@/lib/orders";

export function OrderList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orders, setOrders] = useState<Order[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const sort = searchParams.get("sort") || "orderDate desc";
  const filter = searchParams.get("filter") || "";

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await getOrders(page, limit, sort, filter);
      setOrders(result.orders);
      setTotal(result.total);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
    setIsLoading(false);
  }, [page, limit, sort, filter]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handlePageChange = (newPage: number) => {
    router.push(
      `/orders?page=${newPage}&limit=${limit}&sort=${sort}&filter=${filter}`
    );
  };

  const handleSortChange = (newSort: string) => {
    router.push(
      `/orders?page=1&limit=${limit}&sort=${newSort}&filter=${filter}`
    );
  };

  const handleFilterChange = (newFilter: string) => {
    router.push(
      `/orders?page=1&limit=${limit}&sort=${sort}&filter=${newFilter}`
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "shipped":
        return "bg-blue-500";
      case "delivered":
        return "bg-green-500";
      case "canceled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Select value={sort} onValueChange={handleSortChange}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="orderDate desc">Date (Newest First)</SelectItem>
            <SelectItem value="orderDate asc">Date (Oldest First)</SelectItem>
            <SelectItem value="totalAmount desc">
              Amount (High to Low)
            </SelectItem>
            <SelectItem value="totalAmount asc">
              Amount (Low to High)
            </SelectItem>
          </SelectContent>
        </Select>
        <Input
          placeholder="Filter by status"
          value={filter}
          onChange={(e) =>
            handleFilterChange(`&& orderStatus == "${e.target.value}"`)
          }
          className="w-[200px]"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map((order) => (
            <Card
              key={order._id}
              className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
              onClick={() => router.push(`/dashboard/orders/${order._id}`)}
            >
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Order {order._id.slice(0, 8)}</span>
                  <Badge className={getStatusColor(order.orderStatus)}>
                    {order.orderStatus}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Customer ID: {order.customerId}</p>
                <p>Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                <p>Total: ${order.totalAmount.toFixed(2)}</p>
                <p>
                  Payment:{" "}
                  <Badge
                    variant={
                      order.paymentStatus === "paid" ? "default" : "destructive"
                    }
                  >
                    {order.paymentStatus}
                  </Badge>
                </p>
                <p>
                  Tracking:{" "}
                  <Badge
                    variant={
                      order.trackingStatus === "delivered"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {order.trackingStatus}
                  </Badge>
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
      <div className="flex justify-between items-center mt-4">
        <Button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Previous
        </Button>
        <span>
          Page {page} of {Math.ceil(total / limit)}
        </span>
        <Button
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= Math.ceil(total / limit)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
