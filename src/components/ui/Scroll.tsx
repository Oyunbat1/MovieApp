import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "react-responsive";
import { useState, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";
import axios from "axios";
import ACCESS_TOKEN from "@/constants/index";
import Movie from "@/components/type/Type";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

type Props = {
  movieList: Movie[];
};

function Scroll() {
  const isMobileQuery = useMediaQuery({ maxWidth: 639 });
  const [isMobile, setIsMobile] = useState(false);
  const [nowPlayingMovie, nowPlayingMovieSet] = useState([]);



  useEffect(() => {
    setIsMobile(isMobileQuery);
  }, [isMobileQuery]);

  const nowPlayingMovies = async () => {
    const playingMovies = await axios.get(
      "https://api.themoviedb.org/3/movie/now_playing",
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );
    nowPlayingMovieSet(playingMovies.data.results);
  };
  useEffect(() => {
    nowPlayingMovies();
  }, []);

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <div className="flex justify-center w-screen ">
      {isMobile && (
        <div className=" mt-[10px]">
          <div>
            <Carousel className="w-screen" plugins={[plugin.current]}>
              <CarouselContent>
                {nowPlayingMovie.map((movie: Movie, index) => (
                  <CarouselItem key={index}>
                    <div>
                      <div >
                        {" "}
                        <img className="w-screen object-cover h-auto"
                          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                        ></img>
                      </div>
                      <div className="flex flex-col p-[26px] gap-4">
                        <div className="flex justify-between">
                          <div>
                            <p className="text-[14px]">Now playing:</p>
                            <h1 className="text-[24px] font-bold">{movie.original_title}</h1>
                          </div>
                          <div className="flex items-center">
                            <Image
                              src="/star.svg"
                              width={20}
                              height={50}
                              alt="Movie Logo"
                            />
                            <p className="text-[#71717A]">
                              <span
                                className="font-bold text-[18px
                 ] text-black"
                              >
                               {movie.vote_average}
                              </span>
                              /10
                            </p>
                          </div>
                        </div>
                        <p className="text-[14px] ">
                         {movie.overview}
                        </p>
                        <Button className="w-[150px] h-[40px]">
                          {" "}
                          <Image
                            src="/play.svg"
                            width={16}
                            height={50}
                            alt="Movie Logo"
                          />{" "}
                          Watch Trailer
                        </Button>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            
            </Carousel>
          </div>
        </div>
      )}
      {!isMobile && (
        <div>
          <div>
            <Carousel className="w-screen" plugins={[plugin.current]}>
              <CarouselContent>
              {nowPlayingMovie.map((movie: Movie ,index) => (
                                  <CarouselItem key={index}>
                                  <div className="relative  text-white mb-[30px]">
                            <div>
                            <img className="w-screen object-cover h-auto"
                          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                        ></img>
                            </div>
                                    <div className="flex flex-col p-[46px] gap-4 lg:gap-12 absolute z-10 top-1/2 left-1/3 lg:left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-[404px]">
                                      <div className="flex flex-col justify-between text-white">
                                        <div>
                                          <p className="text-[14px] lg:text-[18px] xl:text-[24px]">
                                            Now playing:
                                          </p>
                                          <h1 className="text-[24px] lg:text-[32px] xl:text-[46px] font-bold">
                                          {movie.original_title}
                                          </h1>
                                        </div>
                                        <div className="flex items-center">
                                          <Image
                                            src="/star.svg"
                                            width={20}
                                            height={50}
                                            alt="Movie Logo"
                                          />
                                          <p className="text-[#71717A] xl-text-[20px]">
                                            <span
                                              className="font-bold text-[18px
                              ] xl:text-[20px] text-white"
                                            >
                                              {movie.vote_average}
                                            </span>
                                            /10
                                          </p>
                                        </div>
                                      </div>
                                      <p className="text-[14px] xl:text-[18px] lg:leading-loose xl:w-[480px]">
                                      {movie.overview}
                                      </p>
                                      <Button className="w-[150px] h-[40px] bg-white text-black">
                                        {" "}
                                        <Image
                                          src="/desktop/play-desktop.svg"
                                          width={16}
                                          height={50}
                                          alt="Movie Logo"
                                        />{" "}
                                        Watch Trailer
                                      </Button>
                                    </div>
                                  </div>
                                </CarouselItem>
              ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      )}
    </div>
  );
}

export default Scroll;
