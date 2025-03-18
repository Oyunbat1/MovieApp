import React from "react";
import Movie from "@/components/type/Type";
import Image from "next/image";
import Link from "next/link";

type Props = {
  movieList: Movie[];
  title: string;
};

function MovieListEach({ movieList, title }: Props) {
  return (
    <div>
      <div className="flex px-[30px] justify-between">
        <h1 className="text-[24px] font-bold">{title}</h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-[26px]">
        {movieList.map((movie: Movie, index) => (
          <Link key={index} href={`/movie/${movie.id}`}>
            <div className="w-full flex flex-col gap-2 items-center p-[10px] bg-slate-200 rounded-md cursor-pointer hover:bg-gray-300">
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
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MovieListEach;
