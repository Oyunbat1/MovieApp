"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import ACCESS_TOKEN from "@/constants/index";
import Movie from "@/components/type/Type";
import Header from "@/components/ui/Header/Header";
import Footer from "@/components/ui/Footer";

import Link from "next/link";
import Image from "next/image";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function MovieDetailPage() {
  const { id } = useParams();
  console.log("Movie ID:", id);
  const [similar, setSimilar] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [numItemsToShow, setNumItemsToShow] = useState(4); 
  const moviesPerPage = numItemsToShow;

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/similar`,
          { headers: { Authorization: `Bearer ${ACCESS_TOKEN}` } }
        );
        setSimilar(response.data.results);
      } catch (error) {
        console.log("Алдаа гарлаа");
      }
    };
    getMovies();
  }, [id]);

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

  if (!similar.length) return <p>Loading...</p>;

  const totalPages = Math.ceil(similar.length / moviesPerPage);
  const startIndex = (currentPage - 1) * moviesPerPage;
  const endIndex = startIndex + moviesPerPage;
  const currentMovies = similar.slice(startIndex, endIndex);

  return (
    <div className="p-6">
      <div className="pb-[40px]">
        <Header setCurrentPage={() => {}} genreMovies={[]} />
      </div>

      <div>
        <h1 className="text-[24px] font-bold">More like this</h1>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-[20px] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {currentMovies.map((sim) => (
          <Link key={sim.id} href={`/movie/${sim.id}`}>
            <div className="w-full flex flex-col gap-2 items-center p-[10px] bg-slate-200 rounded-md cursor-pointer hover:bg-gray-300">
              <div className="rounded-md p-[10px]">
                <img
                  src={`https://image.tmdb.org/t/p/w300${sim.poster_path}`}
                  alt={sim.title}
                />
              </div>
              <div className="flex flex-col justify-center items-center">
                <div className="flex items-center">
                  <Image src="/star.svg" width={10} height={50} alt="Star" />
                  <p className="text-[#71717A] text-[12px]">
                    <span className="font-bold text-[12px] text-black">
                      {sim.vote_average}
                    </span>
                    /10
                  </p>
                </div>
                <h1 className="text-[16px]">{sim.title}</h1>
              </div>
            </div>
          </Link>
        ))}
      </div>

    
      <div className="mt-[18px] flex justify-center">
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

      <div className="mt-[30px]">
        <Footer />
      </div>
    </div>
  );
}
