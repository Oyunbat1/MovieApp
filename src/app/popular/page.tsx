"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Movie from "@/components/type/Type";
import Header from "@/components/ui/Header/Header";
import Footer from "@/components/ui/Footer";
import ACCESS_TOKEN from "@/constants/index";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function UpcomingMovies() {
  const [PopularMovies, SetPopularMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [numItemsToShow, setNumItemsToShow] = useState(4);
  const moviesPerPage = numItemsToShow;

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

  const totalPages = Math.ceil(PopularMovies.length / moviesPerPage);
  const startIndex = (currentPage - 1) * moviesPerPage;
  const endIndex = startIndex + moviesPerPage;
  const currentMovies = PopularMovies.slice(startIndex, endIndex);

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/movie/popular",
          {
            headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
          }
        );
        SetPopularMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching upcoming movies:", error);
      }
    };

    fetchTopRatedMovies();
  }, []);

  return (
    <div className="p-6">
      <Header setCurrentPage={() => {}} genreMovies={[]} />
      <div className="mt-[30px]">
        <h1 className="text-2xl font-bold">Popular Movies</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-[26px]">
          {currentMovies.map((movie) => (
            <Link key={movie.id} href={`/movie/${movie.id}`}>
              {" "}
              <div
                key={movie.id}
                className="w-full flex flex-col gap-2 items-center p-[10px] bg-slate-200 rounded-md cursor-pointer hover:bg-gray-300"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                  className="rounded-md"
                />
                <h1 className="text-[16px]">{movie.title}</h1>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-[18px] mb-[30px] flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
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

        <Footer />
      </div>
    </div>
  );
}
