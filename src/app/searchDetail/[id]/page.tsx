"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ACCESS_TOKEN from "@/constants/index";
import Movie from "@/components/type/Type";
import Header from "@/components/ui/Header/Header";
import { useMediaQuery } from "react-responsive";
import Footer from "@/components/ui/Footer";
type Genre = {
  name: string;
  id: number;
};

function Page() {
  const params = useParams();
  const query = params.id;
  const [movies, setMovies] = useState<Movie[]>([]);
  const [visibleMovies, setVisibleMovies] = useState(8);
  const [genres, setGenres] = useState<Genre[]>([]);
  const isTabledQuery = useMediaQuery({ maxWidth: 880 });
  const [isTabled, setIsTablet] = useState(false);
  console.log(movies);
  useEffect(() => {
    setIsTablet(isTabledQuery);
  }, [isTabledQuery]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/search/movie?query=${query}&language=en&page=1`,
          {
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
          }
        );
        setMovies(res.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    if (query) {
      fetchMovies();
    }
  }, [query]);

  const getGenres = async () => {
    try {
      const res = await axios.get(
        "https://api.themoviedb.org/3/genre/movie/list",
        {
          headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
        }
      );
      setGenres(res.data.genres);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    getGenres();
  }, []);

  return (
    <div className="p-6">
      <Header setCurrentPage={() => {}} genreMovies={[]}></Header>
      {!isTabled && (
        <div className="flex flex-col">
          <div className="flex justify-between mt-[20px]">
            {" "}
            <div>
              {" "}
              <h1 className="text-2xl font-bold mb-4">Search results</h1>
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
                {movies.slice(0, visibleMovies).map((movie) => (
                  <div
                    key={movie.id}
                    className=" w-[200px] border p-4 rounded-lg shadow-md"
                  >
                    <img
                      className="w-[200px] h-[300px] object-cover rounded-lg"
                      src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                      alt={movie.title}
                    />
                    <h2 className="text-lg font-semibold mt-2">
                      {movie.title}
                    </h2>
                    <p className="text-sm text-gray-600">
                      Rating: {movie.vote_average}/10
                    </p>
                    <p className="text-sm text-gray-500">
                      {movie.release_date?.slice(0, 4)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mr-[80px] lg:mr-[60px]">
              <h1>Genres</h1>
              <div className="grid grid-cols-4 lg:grid-cols-3 gap-4 w-[380px] pt-[40px] text-center">
                {genres.map((genre) => (
                  <Link key={genre.id} href={`${genre.name}`}>
                    <div>
                      <Button className="bg-gray-100 text-black h-[20px] hover:text-white">
                        {genre.name}
                      </Button>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-[20px]">
            {" "}
            <Footer></Footer>
          </div>
        </div>
      )}
      {isTabled && (
        <div className="flex flex-col justify-between items-center mt-[20px]">
          {" "}
          <div>
            {" "}
            <h1 className="text-2xl font-bold mb-4">Search results</h1>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
              {movies.slice(0, 4).map((movie) => (
                <div
                  key={movie.id}
                  className=" w-[200px] border p-4 rounded-lg shadow-md"
                >
                  <img
                    className="w-[200px] h-[300px] object-cover rounded-lg"
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <h2 className="text-lg font-semibold mt-2">{movie.title}</h2>
                  <p className="text-sm text-gray-600">
                    Rating: {movie.vote_average}/10
                  </p>
                  <p className="text-sm text-gray-500">
                    {movie.release_date?.slice(0, 4)}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="mr-[80px] lg:mr-[60px] mt-[10px]">
            <h1 className="font-bold text-[24px]">Search by Genres</h1>
            <p>See list of movies by genre</p>
            <div className="grid grid-cols-4 lg:grid-cols-3 gap-4 w-[380px] pt-[40px] text-center">
              {genres.map((genre) => (
                <Link key={genre.id} href={`${genre.name}`}>
                  <div>
                    <Button className="bg-gray-100 text-black h-[20px] hover:text-white">
                      {genre.name}
                    </Button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-[20px]">
            {" "}
            <Footer></Footer>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
