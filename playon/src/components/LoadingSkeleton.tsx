// @ts-nocheck

import { Skeleton } from "@/components/ui/skeleton";

const number = [1, 2, 3, 4, 5, 6];

const LoadingSkeleton = () => {
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
      {number.map((num) => (
        <div key={num} className="flex flex-col space-y-3">
          {/* Card skeleton matching MovieCard/TvShowCard structure */}
          <div className="relative overflow-hidden rounded-lg">
            <Skeleton className="w-full aspect-[2/3] rounded-lg" />
            {/* Badge skeleton */}
            <div className="absolute top-2 right-2">
              <Skeleton className="w-10 h-5 rounded" />
            </div>
          </div>
          {/* Title skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
