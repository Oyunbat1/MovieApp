"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Header from "@/components/ui/Header/Header";
import Footer from "@/components/ui/Footer";
import ACCESS_TOKEN from "@/constants/index";
import genreMap from "@/constants/genres"; 
import Movie from "@/components/type/Type";
import Image from "next/image";
import { Button } from "@/components/ui/button";
type Genre = {
  name:string
}

function GenreMoviesPage() {
  const params = useParams();
  const [genreMovies, setGenreMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [genres , setGenres] = useState<Genre[]>([]);
  console.log(genres)
  const genreName = Array.isArray(params.name) ? params.name[0] : params.name;
  const genreId = genreName ? genreMap[genreName] : undefined;

  const getGenres = async ()=> {
    try {
      const res = await axios.get("https://api.themoviedb.org/3/genre/movie/list", {
        headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
      })
      setGenres(res.data.genres)
    }catch(error){
      console.error("Error fetching movies:", error);
    }
  }

useEffect(()=>{
  getGenres();
},[])

  const getMovies = async () => {
    if (!genreId) {
      console.error("Invalid genre name:", genreName);
      return;
    }

    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${genreId}&page=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      setGenreMovies(res.data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    if (genreId) {
      getMovies();
    }
  }, [genreId, currentPage]);

  return (
    <div>
      <Header setCurrentPage={() => {}} genreMovies={[]} />
<div className="flex justify-around">
    <div className="pt-[10px]" >
    <h1 className="text-[24px] font-[600]">Genres</h1>
    <p className="text-[16px] font-[400]">See lists of movies by genre </p>


  <div className="grid grid-cols-4 gap-4 w-[380px] pt-[40px]">
  {genres.map((genre)=> (
    <div >
      <Button className="bg-gray-100 text-black h-[20px] hover:text-white">{genre.name}</Button>
    </div>
  ))}
  </div>

    </div>
    <div className="py-[20px]">
    <h1 className="pl-[20px]">Movies titles in :"{genreName}"</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 p-4 border-l p-y-[10px]">
        {genreMovies.length > 0 ? (
          genreMovies.slice(0,12).map((movie) => (
                  <div key={movie.id} className="w-[165px]  flex flex-col gap-2 items-center p-[10px] bg-slate-200 rounded-md cursor-pointer hover:bg-gray-300">
                    <div className="rounded-md p-[10px]">
                      <img
                        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                        alt={movie.title}
                      />
                    </div>
                    <div className="flex flex-col justify-center items-center">
                      <div className="flex items-center">
                        <Image src="/star.svg" width={10} height={50} alt="Star" />
                        <p className="text-[#71717A] text-[12px]">
                          <span className="font-bold text-[12px] text-black">
                            {movie.vote_average}
                          </span>
                          /10
                        </p>
                      </div>
                      <h1 className="text-[16px]">{movie.title}</h1>
                    </div>
                  </div>
          ))
        ) : (
          <p>Loading movies...</p>
        )}
      </div>
    </div>
</div>

      <Footer />
    </div>
  );
}

export default GenreMoviesPage;
