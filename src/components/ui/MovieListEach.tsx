import React from "react";
import Movie from "@/components/type/Type";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "react-responsive";
import { useState, useEffect } from "react";
type Props = {
  movieList: Movie[];
  title: string;
};
function MovieListEach(props: Props) {
  const isMobileQuery = useMediaQuery({ maxWidth: 639 });
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(isMobileQuery);
  }, [isMobileQuery]);

  return (
    <div>
      {isMobile && (
        <div>
          {" "}
          <div className="flex  px-[30px] justify-between">
            <div>
              <h1 className="text-[24px] font-bold">{props.title}</h1>
            </div>
            <Button className="bg-white text-black h-[36px] px-[16px]">
              See more
              <Image
                src="/arrow-right.svg"
                width={20}
                height={50}
                alt="Movie Logo"
              />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4 p-[26px]">
            {props.movieList.map((movie: Movie, index) => (
              <div
                className="w-full flex flex-col gap-2 items-center p-[10px] bg-slate-200 rounded-md"
                key={index}
              >
                <div className="rounded-md bg-red-400 p-[10px]">
                  <img
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  ></img>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <div className="flex items-center">
                    <Image
                      src="/star.svg"
                      width={10}
                      height={50}
                      alt="Movie Logo"
                    />
                    <p className="text-[#71717A] text-[12px]">
                      <span
                        className="font-bold text-[12px
                            ] text-black"
                      >
                        6.9
                      </span>
                      /10
                    </p>
                  </div>
                  <h1 className="text-[16px]">{movie.title}</h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {!isMobile && (
        <div>
          {" "}
          <div className="flex  px-[30px] justify-between">
            <div>
              <h1 className="text-[24px] font-bold">{props.title}</h1>
            </div>
            <Button className="bg-white text-black h-[36px] px-[16px]">
              See more
              <Image
                src="/arrow-right.svg"
                width={20}
                height={50}
                alt="Movie Logo"
              />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4 p-[26px]">
            {props.movieList.map((movie: Movie, index) => (
              <div
                className="w-full flex flex-col gap-2 items-center p-[10px] bg-slate-200 rounded-md"
                key={index}
              >
                <div className="rounded-md bg-red-400 p-[10px]">
                  <img
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  ></img>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <div className="flex items-center">
                    <Image
                      src="/star.svg"
                      width={10}
                      height={50}
                      alt="Movie Logo"
                    />
                    <p className="text-[#71717A] text-[12px]">
                      <span
                        className="font-bold text-[12px
                                  ] text-black"
                      >
                        6.9
                      </span>
                      /10
                    </p>
                  </div>
                  <h1 className="text-[16px]">{movie.title}</h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieListEach;
