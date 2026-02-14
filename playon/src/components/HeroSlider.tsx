// @ts-nocheck
import { useState, useEffect } from "react";
import { Play, Plus } from "lucide-react";

interface HeroSlide {
  id: number;
  title?: string;
  name?: string;
  backdrop_path: string;
  overview: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  runtime?: number;
}

interface Props {
  slides: HeroSlide[];
}

const HeroSlider = ({ slides }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, slides.length]);

  const goToSlide = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToNext = () => {
    goToSlide(currentIndex === slides.length - 1 ? 0 : currentIndex + 1);
  };

  if (!slides || slides.length === 0) return null;

  const currentSlide = slides[currentIndex];
  const title = currentSlide.title || currentSlide.name;
  const year = currentSlide.release_date?.split("-")[0] || currentSlide.first_air_date?.split("-")[0];

  return (
    <div className="hero-slider relative w-full h-[85vh] overflow-hidden">
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10" />
          <img
            src={`https://image.tmdb.org/t/p/original${slide.backdrop_path}`}
            alt={slide.title || slide.name}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Content */}
      <div className="absolute inset-0 z-20 flex items-end">
        <div className="container mx-auto px-6 md:px-10 pb-20">
          <div
            className={`hero-content max-w-2xl transition-all duration-700 ${
              isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
            }`}
          >
            {/* Badges */}
            <div className="flex gap-2 mb-4">
              <span className="badge-hd px-3 py-1 text-xs font-bold bg-gradient-to-r from-pink-600 to-purple-600 rounded">
                HD
              </span>
              {currentSlide.vote_average >= 8 && (
                <span className="badge-new px-3 py-1 text-xs font-bold bg-gradient-to-r from-pink-500 to-red-500 rounded">
                  TRENDING
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
              {title}
            </h1>

            {/* Meta Info */}
            <div className="flex items-center gap-4 mb-4 text-sm md:text-base">
              <div className="flex items-center gap-1">
                <span className="text-pink-500">★</span>
                <span className="text-white font-semibold">
                  {currentSlide.vote_average.toFixed(1)}
                </span>
                <span className="text-gray-400">/10</span>
              </div>
              {year && (
                <span className="text-gray-300 font-medium">{year}</span>
              )}
              {currentSlide.runtime && (
                <span className="text-gray-300">{currentSlide.runtime} min</span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-300 text-sm md:text-base mb-6 line-clamp-3 max-w-xl">
              {currentSlide.overview}
            </p>

            {/* Buttons */}
            <div className="flex gap-4">
              <button className="hero-btn-primary flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-500 hover:to-pink-600 text-white font-semibold rounded-lg transition-all transform hover:scale-105">
                <Play className="w-5 h-5" fill="white" />
                Watch Now
              </button>
              <button className="hero-btn-secondary flex items-center gap-2 px-8 py-3 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-semibold rounded-lg border border-white/20 transition-all">
                <Plus className="w-5 h-5" />
                Add to List
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 right-8 z-30 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex
                ? "bg-pink-600 w-8"
                : "bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
