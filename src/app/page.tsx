"use client";

import axios from "axios";
import ACCESS_TOKEN from "@/constants/index";
import { useEffect, useState } from "react";
import Header from "@/components/ui/Header/Header";
import Scroll from "@/components/ui/Scroll";
import MovieList from "@/components/ui/MovieList";
import Footer from "@/components/ui/Footer";

export default function Home() {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);

  const getMovies = async () => {
    try {
      const [upcoming, topRated, popular] = await Promise.all([
        axios.get("https://api.themoviedb.org/3/movie/upcoming", {
          headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
        }),
        axios.get("https://api.themoviedb.org/3/movie/top_rated", {
          headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
        }),
        axios.get("https://api.themoviedb.org/3/movie/popular", {
          headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
        }),
      ]);

      setUpcomingMovies(upcoming.data.results);
      setTopRatedMovies(topRated.data.results);
      setPopularMovies(popular.data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <>
      <Header />
      <Scroll />
      <MovieList
        upcomingMovies={upcomingMovies}
        topRatedMovies={topRatedMovies}
        popularMovies={popularMovies}
      />
      <Footer />
    </>
  );
}
