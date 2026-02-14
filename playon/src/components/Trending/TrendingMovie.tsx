// @ts-nocheck

import UseTrendingList from "@/hooks/useTrandingList";
import MovieCard from "../MovieCard";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import LoadingSkeleton from "../LoadingSkeleton";

const TrendingMovie = () => {
  const { trendingData, isLoading } = UseTrendingList("movie");
  const [expand, setExpand] = useState(false);

  return (
    <div className="section-container">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Trending Movies
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-pink-600 to-purple-600 rounded"></div>
        </div>
        <button
          onClick={() => setExpand(!expand)}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white rounded-lg transition-all"
        >
          {expand ? (
            <>
              <span className="text-sm font-medium">Show Less</span>
              <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              <span className="text-sm font-medium">View All</span>
              <ChevronDown className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      {isLoading && (
        <div className="py-10">
          <LoadingSkeleton />
        </div>
      )}
      
      {!isLoading && (
        <div className="movie-grid">
          {expand &&
            trendingData?.map((movie) => (
              <div key={movie.id}>
                <MovieCard movieResult={movie} />
              </div>
            ))}

          {!expand &&
            trendingData?.slice(0, 10).map((movie) => (
              <div key={movie.id}>
                <MovieCard movieResult={movie} />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default TrendingMovie;
