// @ts-nocheck
import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import useMovieDetails from "@/hooks/useMovieDetails";
import MovieCard from "./MovieCard";
import {
  Play,
  Plus,
  Share2,
  Download,
  ChevronLeft,
  Home,
  ChevronRight,
  Star,
  Clock,
  Calendar,
  Globe,
  Film,
  X,
} from "lucide-react";

const Player = () => {
  const { playerId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [showTrailer, setShowTrailer] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);

  const {
    movieDetails,
    credits,
    similar,
    director,
    writers,
    trailer,
    isLoading,
  } = useMovieDetails(playerId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!movieDetails) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-white text-xl">Movie not found</div>
      </div>
    );
  }

  const movieUrl = `https://vidsrc.xyz/embed/movie/${playerId}`;
  const rating = movieDetails.vote_average?.toFixed(1);
  const runtimeHours = Math.floor(movieDetails.runtime / 60);
  const runtimeMinutes = movieDetails.runtime % 60;
  const releaseYear = movieDetails.release_date?.split("-")[0];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-16">
      {/* Hero Banner - Mobile Optimized */}
      <div className="relative h-[22vh] md:h-[60vh] w-full overflow-hidden mt-4 md:mt-4">
        <div className="absolute inset-0">
          <img
            src={`https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`}
            alt={movieDetails.title}
            className="w-full h-full object-cover"
            style={{ filter: "blur(8px) brightness(0.4)" }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />

        {/* Breadcrumb - Mobile Optimized */}
        <div className="relative z-10 container mx-auto px-[15px] md:px-10 pt-3 md:pt-24">
          <div className="flex items-center gap-1 md:gap-2 text-[11px] md:text-sm text-gray-400 mb-3 md:mb-4 flex-nowrap overflow-hidden">
            <button onClick={() => navigate("/")} className="hover:text-pink-500 transition-colors flex-shrink-0 inline-flex items-center p-0 m-0 border-0 bg-transparent">
              <Home className="w-3 h-3 md:w-4 md:h-4" />
            </button>
            <ChevronRight className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
            <Link to="/movies" className="hover:text-pink-500 transition-colors flex-shrink-0 inline-flex items-center leading-none">
              Movies
            </Link>
            <ChevronRight className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
            <span className="text-white truncate min-w-0 inline-flex items-center leading-none">{movieDetails.title}</span>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-lg transition-all text-sm md:text-base"
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden md:inline">Back</span>
          </button>
        </div>
      </div>

      {/* Mobile Layout - Small Poster with Info Beside */}
      <div className="md:hidden relative z-20 mt-[10px]">
        <div className="flex px-[15px]">
          {/* Small Poster - Left Side */}
          <div className="flex-shrink-0">
            <div className="relative w-[100px] h-[150px]">
              <img
                src={`https://image.tmdb.org/t/p/w342${movieDetails.poster_path}`}
                alt={movieDetails.title}
                className="w-full h-full object-cover rounded-[6px] shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
              />
              <div className="absolute top-1 right-1">
                <span className="px-2 py-0.5 bg-[#ff006e]/90 rounded text-[8px] font-bold">
                  HD
                </span>
              </div>
            </div>
          </div>

          {/* Info - Right Side (Beside Poster) */}
          <div className="flex-1 ml-5 pr-0">
            {/* Title */}
            <h1 className="text-[22px] font-bold leading-[1.2] mb-[6px] line-clamp-2">
              {movieDetails.title}
            </h1>

            {/* Tagline */}
            {movieDetails.tagline && (
              <p className="text-[12px] italic text-[#999999] mb-2 truncate">
                {movieDetails.tagline}
              </p>
            )}

            {/* Rating Row */}
            <div className="flex flex-wrap items-center gap-2 mb-[6px] text-[12px]">
              <div className="flex items-center gap-1">
                <span className="text-[#ffd700]">★</span>
                <span className="font-semibold">{rating}</span>
                <span className="text-gray-400">/10</span>
              </div>
              <span className="text-[#999999]">•</span>
              <span className="text-[#999999]">{releaseYear}</span>
            </div>

            {/* Metadata Chips */}
            <div className="flex flex-wrap gap-[6px] mb-2">
              <span className="px-2 py-1 bg-white/10 rounded-[12px] text-[10px]">
                {runtimeHours}h {runtimeMinutes}m
              </span>
              {movieDetails.genres?.slice(0, 2).map((genre) => (
                <span
                  key={genre.id}
                  className="px-2 py-1 bg-white/10 rounded-[12px] text-[10px]"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons - Mobile (Below Poster) */}
        <div className="mt-[15px] px-[15px] space-y-[10px]">
          {/* Primary Button */}
          <button
            onClick={() => setShowPlayer(true)}
            className="w-full h-[48px] flex items-center justify-center gap-2 bg-[#ff006e] hover:bg-[#d10058] rounded-lg text-[15px] font-semibold shadow-[0_4px_15px_rgba(255,0,110,0.3)] transition-all active:scale-95"
          >
            <Play className="w-5 h-5" fill="white" />
            Play Now
          </button>

          {/* Secondary Buttons Grid */}
          <div className="grid grid-cols-2 gap-[10px]">
            <button className="h-[44px] flex items-center justify-center gap-2 bg-transparent border-2 border-[#333] rounded-lg text-[13px] font-medium hover:bg-white/5 transition-all active:scale-95">
              <Plus className="w-4 h-4" />
              Watchlist
            </button>
            <button className="h-[44px] flex items-center justify-center gap-2 bg-transparent border-2 border-[#333] rounded-lg text-[13px] font-medium hover:bg-white/5 transition-all active:scale-95">
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>

        {/* Synopsis - Mobile */}
        <div className="mt-5 px-[15px]">
          <h2 className="text-[16px] font-bold mb-[10px]">Synopsis</h2>
          <p
            className={`text-[14px] leading-[1.6] text-[#cccccc] ${
              !isExpanded && movieDetails.overview?.length > 300 ? "line-clamp-4" : ""
            }`}
          >
            {movieDetails.overview}
          </p>
          {movieDetails.overview?.length > 300 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-2 text-[#ff006e] hover:text-[#d10058] font-medium text-[13px]"
            >
              {isExpanded ? "Show Less" : "Read More"}
            </button>
          )}
        </div>

        {/* Cast - Mobile Horizontal Scroll */}
        {credits?.cast && credits.cast.length > 0 && (
          <div className="mt-5">
            <h2 className="text-[18px] font-bold mb-3 px-[15px]">Cast</h2>
            <div className="flex gap-3 overflow-x-auto px-[15px] pb-3 scrollbar-hide">
              {credits.cast.slice(0, 10).map((person) => (
                <div key={person.id} className="flex-shrink-0 text-center w-[60px]">
                  <div className="w-[60px] h-[60px] rounded-full overflow-hidden bg-gray-800 mb-2">
                    {person.profile_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
                        alt={person.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-600">
                        <Film className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                  <p className="text-[12px] font-medium truncate">{person.name}</p>
                  <p className="text-[10px] text-[#999999] truncate">{person.character}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Desktop Layout - Original */}
      <div className="hidden md:block container mx-auto px-5 md:px-10 -mt-32 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left Side - Poster */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="relative group">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                  alt={movieDetails.title}
                  className="w-full rounded-lg shadow-2xl"
                />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded text-sm font-bold">
                    HD
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Details */}
          <div className="lg:col-span-2">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-2">{movieDetails.title}</h1>
            {movieDetails.tagline && (
              <p className="text-xl text-gray-400 italic mb-6">{movieDetails.tagline}</p>
            )}

            {/* Rating Section */}
            <div className="flex flex-wrap items-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.round(movieDetails.vote_average / 2)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-600"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-2xl font-bold text-pink-500">{rating}</span>
                <span className="text-gray-400">/10</span>
              </div>
              <div className="text-sm text-gray-400">
                {movieDetails.vote_count?.toLocaleString()} votes
              </div>
            </div>

            {/* Metadata */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2 text-gray-300">
                <Calendar className="w-5 h-5 text-pink-500" />
                <span>{releaseYear}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Clock className="w-5 h-5 text-pink-500" />
                <span>
                  {runtimeHours}h {runtimeMinutes}m
                </span>
              </div>
              {movieDetails.spoken_languages?.[0] && (
                <div className="flex items-center gap-2 text-gray-300">
                  <Globe className="w-5 h-5 text-pink-500" />
                  <span>{movieDetails.spoken_languages[0].english_name}</span>
                </div>
              )}
              {movieDetails.production_countries?.[0] && (
                <div className="flex items-center gap-2 text-gray-300">
                  <Film className="w-5 h-5 text-pink-500" />
                  <span>{movieDetails.production_countries[0].name}</span>
                </div>
              )}
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-6">
              {movieDetails.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-full text-sm transition-all cursor-pointer"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <button
                onClick={() => setShowPlayer(true)}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-500 hover:to-pink-600 rounded-lg font-semibold transition-all transform hover:scale-105"
              >
                <Play className="w-5 h-5" fill="white" />
                Play Now
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-lg transition-all">
                <Plus className="w-5 h-5" />
                Watchlist
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-lg transition-all">
                <Share2 className="w-5 h-5" />
                Share
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-lg transition-all">
                <Download className="w-5 h-5" />
                Download
              </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-800 mb-6">
              <div className="flex gap-8">
                {["overview", "cast", "videos"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 capitalize transition-colors relative ${
                      activeTab === tab ? "text-pink-500" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {tab === "cast" ? "Cast & Crew" : tab}
                    {activeTab === tab && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-600 to-purple-600" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === "overview" && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Synopsis</h2>
                <p
                  className={`text-gray-300 leading-relaxed mb-4 ${
                    !isExpanded && movieDetails.overview?.length > 400 ? "line-clamp-4" : ""
                  }`}
                >
                  {movieDetails.overview}
                </p>
                {movieDetails.overview?.length > 400 && (
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-pink-500 hover:text-pink-400 font-medium"
                  >
                    {isExpanded ? "Show Less" : "Read More"}
                  </button>
                )}

                {/* Director & Writers */}
                <div className="mt-8 space-y-4">
                  {director && (
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400 min-w-[100px]">Director:</span>
                      <span className="text-white font-medium">{director.name}</span>
                    </div>
                  )}
                  {writers && writers.length > 0 && (
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400 min-w-[100px]">Writers:</span>
                      <span className="text-white font-medium">
                        {writers.map((w) => w.name).join(", ")}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "cast" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Cast & Crew</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {credits?.cast?.slice(0, 12).map((person) => (
                    <div key={person.id} className="flex items-center gap-3">
                      <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-800 flex-shrink-0">
                        {person.profile_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
                            alt={person.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-600">
                            <Film className="w-8 h-8" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate">{person.name}</p>
                        <p className="text-gray-400 text-xs truncate">{person.character}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "videos" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Trailers & Videos</h2>
                {trailer ? (
                  <button
                    onClick={() => setShowTrailer(true)}
                    className="relative group w-full aspect-video rounded-lg overflow-hidden"
                  >
                    <img
                      src={`https://img.youtube.com/vi/${trailer.key}/maxresdefault.jpg`}
                      alt={trailer.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors flex items-center justify-center">
                      <Play className="w-20 h-20 text-white" fill="white" />
                    </div>
                  </button>
                ) : (
                  <p className="text-gray-400">No videos available</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Video Player Modal */}
        {showPlayer && (
          <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
            <button
              onClick={() => setShowPlayer(false)}
              className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="w-full max-w-7xl aspect-video">
              <iframe
                src={movieUrl}
                className="w-full h-full rounded-lg"
                allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

        {/* Trailer Modal */}
        {showTrailer && trailer && (
          <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="w-full max-w-7xl aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                className="w-full h-full rounded-lg"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

        {/* Similar Movies */}
        {similar?.results && similar.results.length > 0 && (
          <div className="section-container">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">You Might Also Like</h2>
            <div className="movie-grid">
              {similar.results.slice(0, 6).map((movie) => (
                <div key={movie.id}>
                  <MovieCard movieResult={movie} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Similar Movies - Mobile Horizontal Scroll */}
      {similar?.results && similar.results.length > 0 && (
        <div className="md:hidden mt-5 pb-8">
          <h2 className="text-[18px] font-bold mb-3 px-[15px]">You Might Also Like</h2>
          <div className="flex gap-3 overflow-x-auto px-[15px] pb-3 scrollbar-hide snap-x snap-mandatory">
            {similar.results.slice(0, 10).map((movie) => (
              <div 
                key={movie.id} 
                className="flex-shrink-0 w-[140px] snap-start"
                onClick={() => navigate(`/player/${movie.id}`)}
              >
                <div className="relative h-[210px] rounded-lg overflow-hidden bg-[#1a1a1a] shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
                  {movie.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-600">
                      <Film className="w-12 h-12" />
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/90 to-transparent">
                    <p className="text-[12px] font-semibold truncate">{movie.title}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-[#ffd700] text-[10px]">★</span>
                      <span className="text-[10px]">{movie.vote_average?.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Player;
