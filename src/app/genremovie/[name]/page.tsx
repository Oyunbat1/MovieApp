"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Header from "@/components/ui/Header/Header";
import Footer from "@/components/ui/Footer";
import ACCESS_TOKEN from "@/constants/index";
import genreMap from "@/constants/genres";
import { useMediaQuery } from "react-responsive";
import Movie from "@/components/type/Type";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {ChevronRight } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
type Genre = {
  name: string;
};

function GenreMoviesPage() {
  const params = useParams();
  const [genreMovies, setGenreMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [genres, setGenres] = useState<Genre[]>([]);
    const isMobileQuery = useMediaQuery({ maxWidth: 639 });
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
      setIsMobile(isMobileQuery);
    }, [isMobileQuery]);
    const [numItemsToShow, setNumItemsToShow] = useState(4); 
    const moviesPerPage = numItemsToShow;
    
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
const IsMobile = useMediaQuery({ maxWidth: 767 });
    

  const updateItemsToShow = () => {
    if (window.innerWidth >= 1280) {
      setNumItemsToShow(10);
    } else if (window.innerWidth >= 1024) {
      setNumItemsToShow(8);
    } else if (window.innerWidth >= 768) {
      setNumItemsToShow(6);
    } else {
      setNumItemsToShow(4);
    }
  };
  useEffect(() => {
    updateItemsToShow();
    window.addEventListener("resize", updateItemsToShow);
    return () => {
      window.removeEventListener("resize", updateItemsToShow);
    };
  }, []);

  const totalPages = Math.ceil(genreMovies.length / moviesPerPage);
  const startIndex = (currentPage - 1) * moviesPerPage;
  const endIndex = startIndex + moviesPerPage;
  const currentMovies = genreMovies.slice(startIndex, endIndex);


  const genreName = Array.isArray(params.name) ? params.name[0] : params.name;
  const genreId = genreName ? genreMap[genreName] : undefined;

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

  const moviesToShow = IsMobile ? 4 : isTablet ? 6 : 9;
  return (
    <div>
      <Header setCurrentPage={() => {}} genreMovies={[]} />
      {isMobile && (<div>
        <div className="flex flex-col items-center">
        <div className="pt-[10px] p-[20px] text-center">
          <h1 className="text-[24px] font-[600]">Genres</h1>
          <p className="text-[16px] font-[400]">
            See lists of movies by genre{" "}
          </p>

          <div className="grid grid-cols-4 gap-4 w-[380px] pt-[40px] text-center">
            {genres.map((genre) => (
              <Link href={`${genre.name}`}>
                <div>
                  <Button className="bg-gray-100 text-black h-[20px] hover:text-white">
                    {genre.name}
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="p-[20px] text-center">
          <h1 className="pl-[20px]">Movies titles in :"{genreName}"</h1>
          <div className="grid grid-cols-2 lg:grid-cols-3 sm:grid-cols-1 gap-10 p-4 border-t p-y-[10px]">
            {genreMovies.length > 0 ? (
              genreMovies.slice(0, 6).map((movie) => (
                <div
                  key={movie.id}
                  className="w-[165px]  flex flex-col gap-2 items-center p-[10px] bg-slate-200 rounded-md cursor-pointer hover:bg-gray-300"
                >
                  <div className="rounded-md p-[10px]">
                    <img
                      src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                      alt={movie.title}
                    />
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <div className="flex items-center">
                      <Image
                        src="/star.svg"
                        width={10}
                        height={50}
                        alt="Star"
                      />
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
      <div className="mt-[18px] mb-[20px] flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className={
                  currentPage === 1 ? "opacity-50 pointer-events-none" : ""
                }
              />
            </PaginationItem>

            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                className={
                  currentPage === totalPages
                    ? "opacity-50 pointer-events-none"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      </div>)}

      {!isMobile &&(
    <div>
                <div className="flex justify-around ">
              <div className="pt-[10px] p-[20px]">
                <h1 className="text-[24px] font-[600]">Genres</h1>
                <p className="text-[16px] font-[400]">
                  See lists of movies by genre{" "}
                </p>
      
                <div className="grid grid-cols-4 md:grid-cols-3 md:w-[280px] sm:w-[280px] sm:grid-cols-3 gap-4 w-[580px] pt-[40px]">
                  {genres.map((genre) => (
                    <Link href={`${genre.name}`}>
                      <div>
                        <Button className="bg-gray-100 text-black h-[20px] hover:text-white">
                          {genre.name}
                          <ChevronRight></ChevronRight>
                        </Button>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="p-[20px]">
                <h1 className="pl-[20px]">Movies titles in :"{genreName}"</h1>
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1 gap-10 p-4 border-l p-y-[10px]">
                  {genreMovies.length > 0 ? (
                    genreMovies.slice(0, moviesToShow).map((movie) => (
                      <div
                        key={movie.id}
                        className="w-[165px]  flex flex-col gap-2 items-center p-[10px] bg-slate-200 rounded-md cursor-pointer hover:bg-gray-300"
                      >
                        <div className="rounded-md p-[10px]">
                          <img
                            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                            alt={movie.title}
                          />
                        </div>
                        <div className="flex flex-col justify-center items-center">
                          <div className="flex items-center">
                            <Image
                              src="/star.svg"
                              width={10}
                              height={50}
                              alt="Star"
                            />
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
            <div className="mt-[18px] mb-[20px] flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className={
                  currentPage === 1 ? "opacity-50 pointer-events-none" : ""
                }
              />
            </PaginationItem>

            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                className={
                  currentPage === totalPages
                    ? "opacity-50 pointer-events-none"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

    </div>
      )}

      <Footer />
    </div>
  );
}

export default GenreMoviesPage;
