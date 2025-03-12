"use client";

import axios from "axios";
import ACCESS_TOKEN from "@/constants/index";
import Movie from "@/components/type/Type";
import { useEffect, useState } from "react";
import Header from "@/components/ui/Header";
import Scroll from "@/components/ui/Scroll";
import MovieList from "@/components/ui/MovieList";
import { CONFIG_FILES } from "next/dist/shared/lib/constants";

type Props = {
  props : object
} // 

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
      <Header></Header>
      <div className="flex overflow-x-auto">
      <Scroll></Scroll>
      </div>

      <MovieList movieList={movieList}></MovieList>
    </>
  );
}
