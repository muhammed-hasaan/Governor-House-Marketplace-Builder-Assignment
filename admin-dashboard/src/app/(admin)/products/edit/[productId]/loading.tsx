import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="space-y-8 p-6 max-w-4xl mx-auto w-full">
      <Skeleton className="h-10 w-1/2 mb-8" /> {/* Title */}
      {/* Form fields */}
      <div className="space-y-8">
        {/* Name */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-12 w-full" />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-32 w-full" />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-12 w-full" />
        </div>

        {/* Quantity and Price */}
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-12 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>

        {/* Slug */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-16" />
          <div className="flex gap-4">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-12 w-1/4" />
          </div>
        </div>

        {/* Features */}
        <div className="space-y-4">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-10 w-40" /> {/* Add Feature button */}
        </div>

        {/* Dimensions */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <div className="flex space-x-4">
            <Skeleton className="h-12 w-1/3" />
            <Skeleton className="h-12 w-1/3" />
            <Skeleton className="h-12 w-1/3" />
          </div>
        </div>

        {/* Tags */}
        <div className="space-y-4">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-10 w-32" /> {/* Add Tag button */}
        </div>

        {/* Image upload */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-12 w-full" />
        </div>

        {/* Submit button */}
        <Skeleton className="h-12 w-32 mt-8" />
      </div>
    </div>
  );
};

export default Loading;
