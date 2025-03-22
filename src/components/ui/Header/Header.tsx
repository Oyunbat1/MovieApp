"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { useTheme } from "next-themes"; // Import theme hook
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "react-responsive";
import {
  Search,
  Moon,
  Sun,
  ChevronDown,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import axios from "axios";
import ACCESS_TOKEN from "@/constants/index";
import Movie from "@/components/type/Type";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

interface Genre {
  id: number;
  name: string;
}

interface HeaderProps {
  setCurrentPage: (page: string) => void;
  genreMovies: Genre[];
}

const Header: React.FC<HeaderProps> = ({ setCurrentPage, genreMovies }) => {
  const isMobileQuery = useMediaQuery({ maxWidth: 639 });
  const [isMobile, setIsMobile] = useState(false);
  const [page, setPage] = useState(1);
  const [searchMovie, setSearchMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState("");
  const { theme, setTheme } = useTheme(); // Use theme hook
  const [isMounted, setIsMounted] = useState(false); // State to track if the component has mounted

  // Ensure the component is only mounted on the client side
  useEffect(() => {
    setIsMounted(true); // Set to true after component is mounted
    setIsMobile(isMobileQuery);
  }, [isMobileQuery]);

  // Fetch movies by genre or search query
  const SearchMoviesByGenre = async (query: string) => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${query}&language=en&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );
    setSearchMovies(res.data.results);
  };

  // Handle search input changes
  const HandleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  // Search movies whenever query changes
  useEffect(() => {
    if (query) {
      SearchMoviesByGenre(query);
    }
  }, [query]);

  // Prevent rendering before the component is mounted to avoid hydration error
  if (!isMounted) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white">
      {isMobile && (
        <div className="h-[60px] flex justify-center w-full items-center gap-20 bg-white dark:bg-gray-900">
          <div className="w-full flex justify-around items-center">
            <Image
              src="/Logo.png"
              width={120}
              height={50}
              alt="Movie Logo"
              className="mt-[10px]"
            />
            <div className="flex gap-4 mt-[10px]">
              <Button
                onClick={() => setCurrentPage("first")}
                className="w-[35px] text-[10px] bg-white text-black dark:bg-gray-800 dark:text-white hover:text-white "
              >
                <Search />
              </Button>
              <Button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-[35px] text-[10px] bg-white text-black dark:bg-gray-800 dark:text-white hover:text-white"
              >
                {theme === "dark" ? <Sun /> : <Moon />}
              </Button>
            </div>
          </div>
        </div>
      )}
      {!isMobile && (
        <div className="h-[80px] flex flex-col justify-center w-full items-center bg-white dark:bg-black">
          <div className="w-full flex justify-around items-center">
            <Image src="/Logo.png" width={120} height={50} alt="Movie Logo" />
            <div className="flex gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[97px] dark:text-white dark:border-gray-700"
                  >
                    <ChevronDown />
                    Genre
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[500px] dark:bg-gray-900 dark:text-white">
                  <DropdownMenuLabel className="text-[24px] font-[600]">
                    Genres
                    <p className="text-[16px] font-[400]">
                      See lists of movies by genre
                    </p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="grid grid-cols-3 xl:grid-cols-5 xl:gap-y-8 gap-3 p-[8px]">
                    {genreMovies.map((genres: Genre) => (
                      <div key={genres.id}>
                        <Link href={`/genremovie/${genres.name}`}>
                          <Button className="bg-white border h-[24px] text-black dark:bg-gray-800 dark:text-white text-[12px] hover:text-white">
                            {genres.name}
                            <ChevronRight />
                          </Button>
                        </Link>
                      </div>
                    ))}
                  </div>
                  <DropdownMenuSeparator />
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="flex bg-white dark:bg-gray-800 px-4 rounded-md items-center border border-solid dark:border-gray-700 shadow">
                <Search className="text-[#E4E4E7] dark:text-gray-400" />
                <Input
                  value={query}
                  onChange={HandleSearch}
                  type="text"
                  placeholder="Search..."
                  className="border-none outline-none bg-transparent text-black dark:text-white"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <Button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-[35px] text-[10px] bg-white text-black dark:bg-gray-800 dark:text-white hover:text-white"
              >
                {theme === "dark" ? <Sun /> : <Moon />}
              </Button>
            </div>
          </div>
          {/* Search Suggestions Dropdown */}
          {/* Search Suggestions Dropdown */}
          {query && (
            <div className="absolute top-[76px] z-32 sm:ml-[70px]">
              <div className="rounded-md w-[360px] sm:w-[400px] md:w-[480px] bg-white dark:bg-gray-800 border dark:border-gray-700">
                {searchMovie.slice(0, 5).map((search) => (
                  <div
                    key={search.id}
                    className="p-[10px] border-b-1 dark:border-gray-700"
                  >
                    <Link key={search.id} href={`/movie/${search.id}`}>
                      <div className="flex justify-around items-center gap-2 h-[140px] p-[10px] relative hover:bg-gray-300 hover:rounded-md transition duration-200 ease-in-out dark:hover:bg-gray-600">
                        <img
                          className="w-[100px] h-[130px] rounded-md absolute left-1"
                          src={`https://image.tmdb.org/t/p/w300${search.poster_path}`}
                          alt={search.title}
                        />
                        <div className="flex flex-col gap-10 absolute right-4 w-[200px] md:w-[300px]">
                          <div>
                            <h1 className="text-[14px] font-[600] text-black dark:text-white">
                              {search.title}
                            </h1>
                            <div className="flex items-center gap-2">
                              <Image
                                src="/star.svg"
                                width={10}
                                height={50}
                                alt="Star"
                              />
                              <h1 className="text-[12px]">
                                {" "}
                                <span className="text-[14px] font-bold">
                                  {search.vote_average}
                                </span>
                                /10
                              </h1>
                            </div>
                          </div>
                          <div className="flex justify-around gap-20">
                            <h1 className="text-black dark:text-white">
                              {search.release_date.slice(0, 4)}
                            </h1>
                            <Link
                              href={`/searchDetail/${search.original_title}`}
                              passHref
                            >
                              <Button className="bg-white dark:bg-gray-700 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600">
                                See more <ArrowRight />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
                {searchMovie.length > 0 && (
                  <div className="p-[20px]">
                    <h1 className="text-black dark:text-white">
                      See all results for {query}{" "}
                    </h1>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
