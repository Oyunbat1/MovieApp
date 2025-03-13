"use client";

import axios from "axios";
import ACCESS_TOKEN from "@/constants/index";
import { useEffect, useState } from "react";
import Header from "@/components/ui/Header";
import Scroll from "@/components/ui/Scroll";
import MovieList from "@/components/ui/MovieList";
import Footer from "@/components/ui/Footer";

type Props = {
  props: object;
}; //

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
      <Scroll></Scroll>
      <MovieList movieList={movieList}></MovieList>
      <Footer></Footer>
    </>
  );
}
