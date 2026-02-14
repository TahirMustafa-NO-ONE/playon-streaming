// @ts-nocheck
import useMovieList from "@/hooks/useMovieList";
import MovieCard from "./MovieCard";
import PaginationComponent from "./PaginationComponent";

import { useContext, useState } from "react";
import { GenresContext } from "@/contexts/genres.context";
import LoadingSkeleton from "./LoadingSkeleton";

interface MovieList {
  movieLists: MovieList;
  totalpages: number;
}

const MovieList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { genres } = useContext(GenresContext);

  const { movieLists, totalPages, isLoading } = useMovieList(
    currentPage,
    genres,
  );

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-5 md:px-10">
        {/* Section Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Movies
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
            {movieLists?.map((movieList) => {
              return (
                <div key={movieList.id}>
                  <MovieCard movieResult={movieList} />
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

export default MovieList;
