// @ts-nocheck
import { useState, useEffect } from "react";
import apiClient from "@/services/api-client";

interface TvShowDetails {
  id: number;
  name: string;
  tagline: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  first_air_date: string;
  last_air_date: string;
  episode_run_time: number[];
  vote_average: number;
  vote_count: number;
  genres: Array<{ id: number; name: string }>;
  production_countries: Array<{ name: string }>;
  spoken_languages: Array<{ english_name: string }>;
  number_of_seasons: number;
  number_of_episodes: number;
  seasons: Array<{
    id: number;
    name: string;
    season_number: number;
    episode_count: number;
    air_date: string;
    poster_path: string;
  }>;
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

interface Season {
  episodes: Array<{
    id: number;
    name: string;
    episode_number: number;
    season_number: number;
    air_date: string;
    runtime: number;
    vote_average: number;
    overview: string;
    still_path: string;
  }>;
}

const useTvShowDetails = (tvShowId: string, seasonNumber: number = 1) => {
  const [tvShowDetails, setTvShowDetails] = useState<TvShowDetails | null>(null);
  const [credits, setCredits] = useState<Credits | null>(null);
  const [videos, setVideos] = useState<any>(null);
  const [similar, setSimilar] = useState<any>(null);
  const [seasonDetails, setSeasonDetails] = useState<Season | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!tvShowId) return;

    const fetchTvShowData = async () => {
      setIsLoading(true);
      try {
        const [detailsRes, creditsRes, videosRes, similarRes] = await Promise.all([
          apiClient.get(`/tv/${tvShowId}`),
          apiClient.get(`/tv/${tvShowId}/credits`),
          apiClient.get(`/tv/${tvShowId}/videos`),
          apiClient.get(`/tv/${tvShowId}/similar`),
        ]);

        setTvShowDetails(detailsRes.data);
        setCredits(creditsRes.data);
        setVideos(videosRes.data);
        setSimilar(similarRes.data);
      } catch (error) {
        console.error("Error fetching TV show details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTvShowData();
  }, [tvShowId]);

  useEffect(() => {
    if (!tvShowId || !seasonNumber) return;

    const fetchSeasonDetails = async () => {
      try {
        const response = await apiClient.get(`/tv/${tvShowId}/season/${seasonNumber}`);
        setSeasonDetails(response.data);
      } catch (error) {
        console.error("Error fetching season details:", error);
      }
    };

    fetchSeasonDetails();
  }, [tvShowId, seasonNumber]);

  const creators = tvShowDetails?.seasons ? 
    credits?.crew?.filter((person) => person.job === "Creator" || person.job === "Executive Producer").slice(0, 3) : 
    [];
  const trailer = videos?.results?.find((video: any) => video.type === "Trailer");

  return {
    tvShowDetails,
    credits,
    videos,
    similar,
    seasonDetails,
    creators,
    trailer,
    isLoading,
  };
};

export default useTvShowDetails;
