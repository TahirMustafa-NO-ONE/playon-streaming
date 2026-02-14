// @ts-nocheck
import useTvShowList from "@/hooks/useTvShowList";
import { useState } from "react";
import PaginationComponent from "./PaginationComponent";
import TvShowCard from "./TvShowCard";
import LoadingSkeleton from "./LoadingSkeleton";

const TvShowList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { tvShows, totalPages, isLoading } = useTvShowList({ currentPage });

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-5 md:px-10">
        {/* Section Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            TV Shows
          </h1>
          <div className="h-1 w-20 bg-gradient-to-r from-pink-600 to-purple-600 rounded"></div>
        </div>

        {isLoading && (
          <div className="py-10">
            <LoadingSkeleton />
          </div>
        )}
        
        {!isLoading && (
          <div className="movie-grid">
            {tvShows?.map((tvShow) => {
              return (
                <div key={tvShow.id}>
                  <TvShowCard tvShowResult={tvShow} />
                </div>
              );
            })}
          </div>
        )}
        
        <div className="mt-12">
          <PaginationComponent
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default TvShowList;
