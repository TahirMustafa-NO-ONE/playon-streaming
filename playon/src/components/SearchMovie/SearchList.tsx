// @ts-nocheck

import MovieCard from "../MovieCard";
import PaginationComponent from "../PaginationComponent";

import { useContext, useState } from "react";
import { SearchResultContext } from "@/contexts/searchResult.context";
import useMultiSearch from "@/hooks/useMultiSearch";
import TvShowCard from "../TvShowCard";
import LoadingSkeleton from "../LoadingSkeleton";
import { Search } from "lucide-react";

const SearchList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { searchData, totalPages, searchText } =
    useContext(SearchResultContext);
  const { isLoading } = useMultiSearch(searchText, currentPage);

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-5 md:px-10">
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Search className="w-8 h-8 text-pink-500" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Search Results
            </h1>
          </div>
          {searchText && (
            <p className="text-gray-400 text-lg">
              Showing results for: <span className="text-pink-500 font-semibold">"{searchText}"</span>
            </p>
          )}
          <div className="h-1 w-20 bg-gradient-to-r from-pink-600 to-purple-600 rounded mt-3"></div>
        </div>

        {isLoading && (
          <div className="py-10">
            <LoadingSkeleton />
          </div>
        )}
        
        {!isLoading && searchData && searchData.length > 0 && (
          <div className="movie-grid">
            {searchData?.map((movieList) => {
              return (
                <div key={movieList.id}>
                  {movieList.media_type === "movie" ? (
                    <MovieCard movieResult={movieList} />
                  ) : (
                    <TvShowCard tvShowResult={movieList} />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {!isLoading && (!searchData || searchData.length === 0) && (
          <div className="text-center py-20">
            <Search className="w-20 h-20 text-gray-600 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-400 mb-2">No results found</h2>
            <p className="text-gray-500">Try searching with different keywords</p>
          </div>
        )}
        
        {!isLoading && searchData && searchData.length > 0 && (
          <div className="mt-12">
            <PaginationComponent
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchList;
