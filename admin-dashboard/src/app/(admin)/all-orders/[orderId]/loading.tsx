import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="container mx-auto p-4 space-y-8">
      {/* Order Header */}
      <div className="space-y-4">
        <Skeleton className="h-8 w-3/4 max-w-md" /> {/* Order title */}
        <div className="flex justify-between items-center">
          <Skeleton className="h-6 w-1/3 max-w-[200px]" /> {/* Order ID */}
          <Skeleton className="h-10 w-24" /> {/* Status badge */}
        </div>
      </div>

      {/* Customer Information */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-40" /> {/* Section title */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="h-20 w-full" /> {/* Customer details */}
          <Skeleton className="h-20 w-full" /> {/* Shipping address */}
        </div>
      </div>

      {/* Order Summary */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-40" /> {/* Section title */}
        <div className="space-y-2">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex justify-between items-center">
              <Skeleton className="h-6 w-1/2" /> {/* Product name */}
              <Skeleton className="h-6 w-20" /> {/* Product price */}
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center pt-4 border-t">
          <Skeleton className="h-6 w-24" /> {/* Total label */}
          <Skeleton className="h-6 w-24" /> {/* Total amount */}
        </div>
      </div>

      {/* Payment Information */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-48" /> {/* Section title */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-3/4 max-w-md" /> {/* Payment method */}
          <Skeleton className="h-6 w-1/2 max-w-xs" /> {/* Transaction ID */}
        </div>
      </div>

      {/* Order Timeline */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-40" /> {/* Section title */}
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex items-start space-x-4">
              <Skeleton className="h-4 w-4 rounded-full" /> {/* Timeline dot */}
              <div className="space-y-2 flex-1">
                <Skeleton className="h-5 w-1/3" /> {/* Event title */}
                <Skeleton className="h-4 w-1/4" /> {/* Event date */}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4 pt-4">
        <Skeleton className="h-10 w-32" /> {/* Primary action button */}
        <Skeleton className="h-10 w-32" /> {/* Secondary action button */}
      </div>
    </div>
  );
};

export default Loading;
