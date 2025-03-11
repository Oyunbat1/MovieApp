"use client";

import axios from "axios";
import ACCESS_TOKEN from "@/constants/index";
import { useEffect, useState } from "react";

type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export default function Home() {
  const [movieList, setMovieList] = useState([]);


  const getMovies = async () => {
    const movies = await axios.get(
      "https://api.themoviedb.org/3/discover/movie",
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );
    setMovieList(movies.data.results);
  };
  useEffect(() => {
    getMovies();
  }, []);
  return (
    <>
      {movieList.map((movie:Movie, index) => (
        <div>{movie.title}
         <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}></img></div>
       
      ))}
    </>
  );
}
