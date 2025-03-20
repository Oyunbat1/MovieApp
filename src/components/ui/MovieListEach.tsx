import React from "react";
import Movie from "@/components/type/Type";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
type Props = {
  movieList: Movie[];
  title: string;
};

function MovieListEach({ movieList, title }: Props) {
  const getLinkPath = (title: string) => {
    let path = "/";
    switch (title) {
      case "Upcoming":
        path = "/upcoming";
        break;
      case "TopRated":
        path = "/toprated";
        break;
      case "Popular":
        path = "/popular";
        break;
    }
    console.log(`Navigating to: ${path}`); // Debug log to check the path
    return path;
  };

  return (
    <div>
      <div className="flex px-[30px] justify-between">
        <h1 className="text-[24px] font-bold">{title}</h1>
        <Link href={getLinkPath(title)}>
          <Button className="bg-white text-black hover:bg-gray-100">
            See more <ArrowRight />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-[26px]">
        {movieList.slice(0, 10).map((movie: Movie, index) => (
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
