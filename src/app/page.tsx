"use client";

import axios from "axios";
import ACCESS_TOKEN from "@/constants/index";
import { useEffect, useState } from "react";
import Header from "@/components/ui/Header/Header";
import Scroll from "@/components/ui/Scroll";
import MovieList from "@/components/ui/MovieList";
import Footer from "@/components/ui/Footer";
import First from "@/components/ui/Header/firstStep/First";
import MovieDetailPage from "@/app/movie/[id]/page"

export default function Home() {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [genreMovies, setGenreMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState("header");

  const getMovies = async () => {
    try {
      const [upcoming, topRated, popular, genre] = await Promise.all([
        axios.get("https://api.themoviedb.org/3/movie/upcoming", {
          headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
        }),
        axios.get("https://api.themoviedb.org/3/movie/top_rated", {
          headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
        }),
        axios.get("https://api.themoviedb.org/3/movie/popular", {
          headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
        }),
        axios.get("https://api.themoviedb.org/3/genre/movie/list", {
          headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
        }),
      ]);

      setUpcomingMovies(upcoming.data.results);
      setTopRatedMovies(topRated.data.results);
      setPopularMovies(popular.data.results);
      setGenreMovies(genre.data.genres);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <>
      {currentPage === "header" && (
        <Header genreMovies={genreMovies} setCurrentPage={setCurrentPage} />
      )}
      {currentPage === "first" && (
        <First genreMovies={genreMovies} setCurrentPage={setCurrentPage} />
      )}
      <Scroll />
      <MovieList
        upcomingMovies={upcomingMovies}
        topRatedMovies={topRatedMovies}
        popularMovies={popularMovies}
      />
      <Footer />
      <MovieDetailPage></MovieDetailPage>
    </>
  );
}
