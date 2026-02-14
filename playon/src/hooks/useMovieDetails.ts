// @ts-nocheck
import { useState, useEffect } from "react";
import apiClient from "@/services/api-client";

interface MovieDetails {
  id: number;
  title: string;
  tagline: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  vote_count: number;
  genres: Array<{ id: number; name: string }>;
  production_countries: Array<{ name: string }>;
  spoken_languages: Array<{ english_name: string }>;
  adult: boolean;
}

interface Credits {
  cast: Array<{
    id: number;
    name: string;
    character: string;
    profile_path: string;
  }>;
  crew: Array<{
    id: number;
    name: string;
    job: string;
  }>;
}

interface Videos {
  results: Array<{
    id: string;
    key: string;
    name: string;
    type: string;
  }>;
}

interface Similar {
  results: Array<any>;
}

const useMovieDetails = (movieId: string) => {
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [credits, setCredits] = useState<Credits | null>(null);
  const [videos, setVideos] = useState<Videos | null>(null);
  const [similar, setSimilar] = useState<Similar | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!movieId) return;

    const fetchMovieData = async () => {
      setIsLoading(true);
      try {
        const [detailsRes, creditsRes, videosRes, similarRes] = await Promise.all([
          apiClient.get(`/movie/${movieId}`),
          apiClient.get(`/movie/${movieId}/credits`),
          apiClient.get(`/movie/${movieId}/videos`),
          apiClient.get(`/movie/${movieId}/similar`),
        ]);

        setMovieDetails(detailsRes.data);
        setCredits(creditsRes.data);
        setVideos(videosRes.data);
        setSimilar(similarRes.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieData();
  }, [movieId]);

  const director = credits?.crew?.find((person) => person.job === "Director");
  const writers = credits?.crew?.filter(
    (person) => person.job === "Writer" || person.job === "Screenplay"
  );
  const trailer = videos?.results?.find((video) => video.type === "Trailer");

  return {
    movieDetails,
    credits,
    videos,
    similar,
    director,
    writers,
    trailer,
    isLoading,
  };
};

export default useMovieDetails;
