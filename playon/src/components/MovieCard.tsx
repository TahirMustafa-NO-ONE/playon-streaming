// @ts-nocheck
import { MovieResult } from "@/hooks/useMovieList";
import { useNavigate } from "react-router-dom";
import { Play, Plus, Info } from "lucide-react";

interface Props {
  movieResult: MovieResult;
}

const MovieCard = ({ movieResult }: Props) => {
  const navigate = useNavigate();
  const year = movieResult.release_date?.split("-")[0];
  
  const handleCardClick = () => {
    navigate(`/player/${movieResult.id}`);
  };
  
  return (
    <div 
      onClick={handleCardClick}
      className="movie-card group relative overflow-hidden rounded-lg cursor-pointer transition-all duration-300 hover:-translate-y-2"
    >
      {/* Poster Image */}
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={`https://image.tmdb.org/t/p/w500${movieResult.poster_path}`}
          alt={movieResult.title || movieResult.name}
          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Status Badge */}
        <div className="absolute top-2 right-2 z-10">
          <span className="px-2 py-1 text-xs font-bold bg-gradient-to-r from-pink-600 to-purple-600 rounded text-white">
            HD
          </span>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          {/* Title */}
          <h3 className="text-white font-bold text-lg mb-1 line-clamp-2">
            {movieResult.title || movieResult.name}
          </h3>
          
          {/* Meta Info */}
          <div className="flex items-center gap-3 mb-2 text-sm">
            {year && <span className="text-gray-300">{year}</span>}
            <div className="flex items-center gap-1">
              <span className="text-pink-500">★</span>
              <span className="text-white">{movieResult.vote_average?.toFixed(1)}</span>
            </div>
          </div>

          {/* Summary */}
          <p className="text-gray-300 text-xs mb-3 line-clamp-3">
            {movieResult.overview}
          </p>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/player/${movieResult.id}`);
              }}
              className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-500 hover:to-pink-600 text-white text-xs font-semibold rounded transition-all"
            >
              <Play className="w-3 h-3" fill="white" />
              Play
            </button>
            <button
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center px-3 py-2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded transition-all"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center px-3 py-2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded transition-all"
            >
              <Info className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
