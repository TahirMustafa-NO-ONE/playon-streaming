// @ts-nocheck
import { useState, useEffect, useRef } from "react";
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
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Auto-play slider
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, slides.length, isPaused]);

  const goToSlide = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToNext = () => {
    goToSlide(currentIndex === slides.length - 1 ? 0 : currentIndex + 1);
  };

  const goToPrev = () => {
    goToSlide(currentIndex === 0 ? slides.length - 1 : currentIndex - 1);
  };

  // Touch handlers for swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      // Swiped left - go to next
      goToNext();
    } else if (distance < -minSwipeDistance) {
      // Swiped right - go to previous
      goToPrev();
    }

    // Reset touch positions
    setTouchStart(0);
    setTouchEnd(0);
    setIsPaused(false);
  };

  if (!slides || slides.length === 0) return null;

  const currentSlide = slides[currentIndex];
  const title = currentSlide.title || currentSlide.name;
  const year = currentSlide.release_date?.split("-")[0] || currentSlide.first_air_date?.split("-")[0];

  // Calculate runtime display
  const runtime = currentSlide.runtime;
  const runtimeDisplay = runtime 
    ? runtime >= 60 
      ? `${Math.floor(runtime / 60)}h ${runtime % 60}m`
      : `${runtime}m`
    : null;

  return (
    <div 
      ref={sliderRef}
      className="hero-slider relative w-full h-[100vh] md:h-[85vh] overflow-hidden select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        paddingTop: 'env(safe-area-inset-top)',
        willChange: 'transform'
      }}
    >
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Mobile gradient overlay - bottom to top */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-10 md:hidden" />
          
          {/* Desktop gradient overlay */}
          <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10" />
          <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10" />
          
          <img
            src={`https://image.tmdb.org/t/p/original${slide.backdrop_path}`}
            alt={slide.title || slide.name}
            className="w-full h-full object-cover brightness-[0.35] md:brightness-100"
            loading={index === 0 ? "eager" : "lazy"}
            style={{ willChange: 'opacity' }}
          />
        </div>
      ))}

      {/* Content - Mobile bottom positioning */}
      <div 
        className="absolute inset-0 z-20 flex items-end"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="w-full px-5 pb-[60px] md:container md:mx-auto md:px-10 md:pb-20">
          <div
            className={`hero-content max-w-full md:max-w-2xl transition-all duration-700 ${
              isAnimating ? "opacity-0 translate-x-[-20px]" : "opacity-100 translate-x-0"
            }`}
            style={{ willChange: 'transform, opacity' }}
          >
            {/* Status Badge - Mobile optimized */}
            <div className="flex gap-2 mb-[10px] md:mb-4">
              <span className="badge-hd px-3 py-[6px] md:py-1 text-[10px] md:text-xs font-bold bg-[#ff006e]/90 rounded-[15px] animate-pulse shadow-lg shadow-pink-500/30">
                HD
              </span>
              {currentSlide.vote_average >= 8 && (
                <span className="badge-new px-3 py-[6px] md:py-1 text-[10px] md:text-xs font-bold bg-gradient-to-r from-pink-500 to-red-500 rounded-[15px] shadow-lg shadow-pink-500/30">
                  TRENDING
                </span>
              )}
            </div>

            {/* Title - Mobile optimized with text shadow */}
            <h1 
              className="text-[28px] leading-[1.2] tracking-[-0.5px] md:text-5xl lg:text-7xl font-black text-white mb-[12px] md:mb-4 md:leading-tight line-clamp-2"
              style={{ 
                textShadow: '2px 2px 8px rgba(0,0,0,0.9)',
                willChange: 'transform'
              }}
            >
              {title}
            </h1>

            {/* Meta Info - Mobile optimized with responsive layout */}
            <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-[15px] md:mb-4 text-[13px] md:text-base">
              <div className="flex items-center gap-1">
                <span className="text-[#ffd700] text-[14px]">★</span>
                <span className="text-white font-semibold">
                  {currentSlide.vote_average.toFixed(1)}
                </span>
                <span className="text-gray-400">/10</span>
              </div>
              
              {(year || runtimeDisplay) && (
                <>
                  <span className="text-[#e0e0e0]">•</span>
                  
                  {year && (
                    <span className="text-[#e0e0e0] font-medium">{year}</span>
                  )}
                  
                  {year && runtimeDisplay && (
                    <span className="text-[#e0e0e0]">•</span>
                  )}
                  
                  {runtimeDisplay && (
                    <span className="text-[#e0e0e0]">{runtimeDisplay}</span>
                  )}
                </>
              )}
            </div>

            {/* Description - Mobile optimized with line clamp */}
            <p 
              className="text-[#cccccc] text-[14px] leading-[1.5] md:text-base mb-[20px] md:mb-6 line-clamp-3 max-w-full md:max-w-xl"
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}
            >
              {currentSlide.overview}
            </p>

            {/* Buttons - Vertically stacked on mobile, horizontal on desktop */}
            <div className="flex flex-col md:flex-row gap-3 md:gap-4 w-full md:w-auto">
              <button 
                className="hero-btn-primary flex items-center justify-center gap-2 w-full md:w-auto px-8 py-3 h-[48px] bg-[#ff006e] hover:bg-[#d10058] text-white text-[15px] font-semibold rounded-lg transition-all transform active:scale-95 md:hover:scale-105 shadow-[0_4px_15px_rgba(255,0,110,0.3)]"
                style={{ willChange: 'transform' }}
                aria-label="Watch now"
              >
                <Play className="w-5 h-5" fill="white" />
                Watch Now
              </button>
              <button 
                className="hero-btn-secondary flex items-center justify-center gap-2 w-full md:w-auto px-8 py-3 h-[48px] bg-transparent backdrop-blur-[10px] hover:bg-white/20 text-white text-[15px] font-semibold rounded-lg border-2 border-white transition-all active:scale-95"
                style={{ willChange: 'transform' }}
                aria-label="Add to list"
              >
                <Plus className="w-5 h-5" />
                Add to List
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Dots - Mobile centered bottom, Desktop right */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 md:bottom-8 md:left-auto md:right-8 md:translate-x-0 z-30 flex gap-2 md:gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`rounded-full transition-all touch-manipulation ${
              index === currentIndex
                ? "bg-[#ff006e] w-[10px] h-[10px] md:w-8 md:h-3"
                : "bg-white/50 w-[8px] h-[8px] md:w-3 md:h-3 hover:bg-white/60"
            }`}
            style={{ 
              minWidth: index === currentIndex ? '10px' : '8px',
              minHeight: index === currentIndex ? '10px' : '8px'
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
