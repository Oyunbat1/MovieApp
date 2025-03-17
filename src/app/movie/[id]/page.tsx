"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import ACCESS_TOKEN from "@/constants/index";
import Movie from "@/components/type/Type";
import Header from "@/components/ui/Header/Header";
import FirstStep from "@/components/ui/Header/firstStep/First";
export default function MovieDetailPage() {
  const { id } = useParams();

  console.log("Movie ID:", id);

  const [movie, setMovie] = useState(null);
  console.log(movie);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}`,
          {
            headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
          }
        );
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <div>{/* <Header/> */}</div>
      <div className="flex justify-around gap-8">
        <div>
          {" "}
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p className="text-1xl font-bold">{movie.release_date}</p>
        </div>
        <div>
          {" "}
          <p className="mt-2">⭐ {movie.vote_average}/10</p>
        </div>
      </div>
        <div>Trailer</div>
    <div className="flex gap-4">
    <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="mt-4  w-[100px] h-[148px]"
      />
     <div>
    {movie.genres.map((genre) => (
        <p key={genre.id}>{genre.name}</p>
    ))}
     <p className="mt-4 text-lg">{movie.overview}</p>
     </div>
    </div>
    </div>
  );
}
