// @ts-nocheck
import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import useTvShowDetails from "@/hooks/useTvShowDetails";
import TvShowCard from "./TvShowCard";
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
  ChevronDown,
} from "lucide-react";

const TvShowPlayer = () => {
  const { playerId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [showTrailer, setShowTrailer] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState<number | null>(null);

  const {
    tvShowDetails,
    credits,
    similar,
    seasonDetails,
    creators,
    trailer,
    isLoading,
  } = useTvShowDetails(playerId, selectedSeason);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!tvShowDetails) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-white text-xl">TV Show not found</div>
      </div>
    );
  }

  const tvShowUrl = selectedEpisode
    ? `https://vidsrc.xyz/embed/tv/${playerId}/${selectedSeason}/${selectedEpisode}`
    : `https://vidsrc.xyz/embed/tv/${playerId}`;
  const rating = tvShowDetails.vote_average?.toFixed(1);
  const runtime = tvShowDetails.episode_run_time?.[0] || 0;
  const firstAirYear = tvShowDetails.first_air_date?.split("-")[0];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-16">
      {/* Hero Banner - Mobile Optimized */}
      <div className="relative h-[22vh] md:h-[60vh] w-full overflow-hidden mt-4 md:mt-4">
        <div className="absolute inset-0">
          <img
            src={`https://image.tmdb.org/t/p/original${tvShowDetails.backdrop_path}`}
            alt={tvShowDetails.name}
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
            <Link to="/tvshows" className="hover:text-pink-500 transition-colors flex-shrink-0 inline-flex items-center leading-none">
              TV Shows
            </Link>
            <ChevronRight className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
            <span className="text-white truncate min-w-0 inline-flex items-center leading-none">{tvShowDetails.name}</span>
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
                src={`https://image.tmdb.org/t/p/w342${tvShowDetails.poster_path}`}
                alt={tvShowDetails.name}
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
              {tvShowDetails.name}
            </h1>

            {/* Tagline */}
            {tvShowDetails.tagline && (
              <p className="text-[12px] italic text-[#999999] mb-2 truncate">
                {tvShowDetails.tagline}
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
              <span className="text-[#999999]">{firstAirYear}</span>
            </div>

            {/* Metadata Chips */}
            <div className="flex flex-wrap gap-[6px] mb-2">
              {runtime > 0 && (
                <span className="px-2 py-1 bg-white/10 rounded-[12px] text-[10px]">
                  {runtime}min
                </span>
              )}
              <span className="px-2 py-1 bg-white/10 rounded-[12px] text-[10px]">
                {tvShowDetails.number_of_seasons} Season{tvShowDetails.number_of_seasons > 1 ? 's' : ''}
              </span>
              {tvShowDetails.genres?.slice(0, 1).map((genre) => (
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
              !isExpanded && tvShowDetails.overview?.length > 300 ? "line-clamp-4" : ""
            }`}
          >
            {tvShowDetails.overview}
          </p>
          {tvShowDetails.overview?.length > 300 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-2 text-[#ff006e] hover:text-[#d10058] font-medium text-[13px]"
            >
              {isExpanded ? "Show Less" : "Read More"}
            </button>
          )}
        </div>

        {/* Episodes - Mobile */}
        <div className="mt-5">
          <h2 className="text-[18px] font-bold mb-3 px-[15px]">Episodes</h2>
          
          {/* Season Selector - Mobile */}
          <div className="px-[15px] mb-4">
            <div className="relative">
              <select
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(Number(e.target.value))}
                className="w-full h-[44px] appearance-none bg-[#1a1a1a] text-white px-4 pr-10 rounded-[6px] border border-[#333] text-[14px] cursor-pointer"
                style={{ colorScheme: 'dark' }}
              >
                {tvShowDetails.seasons
                  ?.filter((s) => s.season_number > 0)
                  .map((season) => (
                    <option key={season.id} value={season.season_number} className="bg-[#1a1a1a] text-white">
                      Season {season.season_number} ({season.episode_count} episodes)
                    </option>
                  ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none text-gray-400" />
            </div>
          </div>

          {/* Episode List - Mobile Single Column */}
          <div className="px-[15px] space-y-3 pb-5">
            {seasonDetails?.episodes?.map((episode) => (
              <div
                key={episode.id}
                className="bg-[#1a1a1a] rounded-lg p-3 shadow-[0_2px_8px_rgba(0,0,0,0.3)] active:scale-98 transition-transform"
                onClick={() => {
                  setSelectedEpisode(episode.episode_number);
                  setShowPlayer(true);
                }}
              >
                <div className="flex gap-3">
                  {/* Thumbnail */}
                  <div className="relative w-[120px] h-[68px] flex-shrink-0 rounded-[6px] overflow-hidden bg-gray-800">
                    {episode.still_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w300${episode.still_path}`}
                        alt={episode.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-600">
                        <Film className="w-8 h-8" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <Play className="w-8 h-8 text-white" fill="white" />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-[14px] mb-1 line-clamp-1">
                      E{episode.episode_number} - {episode.name}
                    </h3>
                    <div className="flex items-center gap-2 text-[11px] text-[#999999] mb-1">
                      {episode.runtime && (
                        <span>{episode.runtime}min</span>
                      )}
                      {episode.runtime && episode.air_date && <span>•</span>}
                      {episode.air_date && (
                        <span>{new Date(episode.air_date).toLocaleDateString()}</span>
                      )}
                      {episode.vote_average > 0 && (
                        <>
                          <span>•</span>
                          <div className="flex items-center gap-0.5">
                            <span className="text-[#ffd700]">★</span>
                            <span>{episode.vote_average?.toFixed(1)}</span>
                          </div>
                        </>
                      )}
                    </div>
                    <p className="text-[12px] text-[#cccccc] line-clamp-2 leading-[1.4]">
                      {episode.overview}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
                  src={`https://image.tmdb.org/t/p/w500${tvShowDetails.poster_path}`}
                  alt={tvShowDetails.name}
                  className="w-full rounded-lg shadow-2xl"
                />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded text-sm font-bold">
                    HD
                  </span>
                </div>
              </div>

              {/* Series Info */}
              <div className="mt-6 p-4 bg-white/5 backdrop-blur-md rounded-lg">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Seasons:</span>
                    <span className="font-semibold">{tvShowDetails.number_of_seasons}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Episodes:</span>
                    <span className="font-semibold">{tvShowDetails.number_of_episodes}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className="font-semibold">Ongoing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Details */}
          <div className="lg:col-span-2">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-2">{tvShowDetails.name}</h1>
            {tvShowDetails.tagline && (
              <p className="text-xl text-gray-400 italic mb-6">{tvShowDetails.tagline}</p>
            )}

            {/* Rating Section */}
            <div className="flex flex-wrap items-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.round(tvShowDetails.vote_average / 2)
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
                {tvShowDetails.vote_count?.toLocaleString()} votes
              </div>
            </div>

            {/* Metadata */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2 text-gray-300">
                <Calendar className="w-5 h-5 text-pink-500" />
                <span>{firstAirYear} - Present</span>
              </div>
              {runtime > 0 && (
                <div className="flex items-center gap-2 text-gray-300">
                  <Clock className="w-5 h-5 text-pink-500" />
                  <span>{runtime} min/episode</span>
                </div>
              )}
              {tvShowDetails.spoken_languages?.[0] && (
                <div className="flex items-center gap-2 text-gray-300">
                  <Globe className="w-5 h-5 text-pink-500" />
                  <span>{tvShowDetails.spoken_languages[0].english_name}</span>
                </div>
              )}
              {tvShowDetails.production_countries?.[0] && (
                <div className="flex items-center gap-2 text-gray-300">
                  <Film className="w-5 h-5 text-pink-500" />
                  <span>{tvShowDetails.production_countries[0].name}</span>
                </div>
              )}
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-6">
              {tvShowDetails.genres?.map((genre) => (
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
                {["overview", "episodes", "cast", "videos"].map((tab) => (
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
                    !isExpanded && tvShowDetails.overview?.length > 400 ? "line-clamp-4" : ""
                  }`}
                >
                  {tvShowDetails.overview}
                </p>
                {tvShowDetails.overview?.length > 400 && (
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-pink-500 hover:text-pink-400 font-medium"
                  >
                    {isExpanded ? "Show Less" : "Read More"}
                  </button>
                )}

                {/* Creators */}
                {creators && creators.length > 0 && (
                  <div className="mt-8">
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400 min-w-[100px]">Creators:</span>
                      <span className="text-white font-medium">
                        {creators.map((c) => c.name).join(", ")}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "episodes" && (
              <div>
                {/* Season Selector */}
                <div className="mb-6">
                  <div className="flex items-center gap-4">
                    <label className="text-gray-400">Select Season:</label>
                    <div className="relative">
                      <select
                        value={selectedSeason}
                        onChange={(e) => setSelectedSeason(Number(e.target.value))}
                        className="appearance-none bg-white/10 backdrop-blur-md text-white px-6 py-2 pr-10 rounded-lg cursor-pointer hover:bg-white/20 transition-all"
                        style={{ colorScheme: 'dark' }}
                      >
                        {tvShowDetails.seasons
                          ?.filter((s) => s.season_number > 0)
                          .map((season) => (
                            <option key={season.id} value={season.season_number} className="bg-[#1a1a1a] text-white">
                              Season {season.season_number} ({season.episode_count} episodes)
                            </option>
                          ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Episodes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {seasonDetails?.episodes?.map((episode) => (
                    <div
                      key={episode.id}
                      className="group bg-white/5 backdrop-blur-md rounded-lg overflow-hidden hover:bg-white/10 transition-all cursor-pointer"
                      onClick={() => {
                        setSelectedEpisode(episode.episode_number);
                        setShowPlayer(true);
                      }}
                    >
                      <div className="relative aspect-video overflow-hidden">
                        {episode.still_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w500${episode.still_path}`}
                            alt={episode.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                            <Film className="w-12 h-12 text-gray-600" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Play className="w-12 h-12 text-white" fill="white" />
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-lg">
                            E{episode.episode_number.toString().padStart(2, "0")} - {episode.name}
                          </h3>
                          <div className="flex items-center gap-1 text-yellow-400">
                            <Star className="w-4 h-4 fill-yellow-400" />
                            <span className="text-sm">{episode.vote_average?.toFixed(1)}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
                          {episode.runtime && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {episode.runtime}min
                            </span>
                          )}
                          {episode.air_date && (
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(episode.air_date).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-300 line-clamp-2">{episode.overview}</p>
                      </div>
                    </div>
                  ))}
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
              onClick={() => {
                setShowPlayer(false);
                setSelectedEpisode(null);
              }}
              className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="w-full max-w-7xl aspect-video">
              <iframe
                src={tvShowUrl}
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

        {/* Similar TV Shows */}
        {similar?.results && similar.results.length > 0 && (
          <div className="section-container">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">You Might Also Like</h2>
            <div className="movie-grid">
              {similar.results.slice(0, 6).map((show) => (
                <div key={show.id}>
                  <TvShowCard tvShowResult={show} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Similar TV Shows - Mobile Horizontal Scroll */}
      {similar?.results && similar.results.length > 0 && (
        <div className="md:hidden mt-5 pb-8">
          <h2 className="text-[18px] font-bold mb-3 px-[15px]">You Might Also Like</h2>
          <div className="flex gap-3 overflow-x-auto px-[15px] pb-3 scrollbar-hide snap-x snap-mandatory">
            {similar.results.slice(0, 10).map((show) => (
              <div 
                key={show.id} 
                className="flex-shrink-0 w-[140px] snap-start"
                onClick={() => navigate(`/tv/${show.id}`)}
              >
                <div className="relative h-[210px] rounded-lg overflow-hidden bg-[#1a1a1a] shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
                  {show.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w342${show.poster_path}`}
                      alt={show.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-600">
                      <Film className="w-12 h-12" />
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/90 to-transparent">
                    <p className="text-[12px] font-semibold truncate">{show.name}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-[#ffd700] text-[10px]">★</span>
                      <span className="text-[10px]">{show.vote_average?.toFixed(1)}</span>
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

export default TvShowPlayer;
