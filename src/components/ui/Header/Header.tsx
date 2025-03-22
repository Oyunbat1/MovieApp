"use client";

import React, { ChangeEvent } from "react";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    setIsMobile(isMobileQuery);
  }, [isMobileQuery]);

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

  const HandleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };
  useEffect(() => {
    SearchMoviesByGenre(query);
  }, [query]);

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
        </div>
      )}
    </div>
  );
};

export default Header;
