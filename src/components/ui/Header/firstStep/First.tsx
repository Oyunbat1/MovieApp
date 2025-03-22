import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Search,
  X,
  ChevronDown,
  Moon,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "react-responsive";
import ACCESS_TOKEN from "@/constants/index";
import axios from "axios";
import Movie from "@/components/type/Type";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Genre {
  id: number;
  name: string;
}
interface FirstProps {
  setCurrentPage: (page: string) => void;
  genreMovies: Genre[];
}

const First: React.FC<FirstProps> = ({ setCurrentPage, genreMovies }) => {
  const [page, setPage] = useState(1);
  const [searchMovie, setSearchMovies] = useState<Movie[]>([]);

  const [query, setQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const isMobileQuery = useMediaQuery({ maxWidth: 639 });
  const [isMobile, setIsMobile] = useState(false);
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

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className={isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"}
    >
      {isMobile && (
        <div className="h-[60px] dark:bg-slate-900 flex flex-col justify-center w-full items-center gap-1 pt-[10px]">
          <div className="flex">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-[37px]">
                  <ChevronDown className="dark:text-white" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="ml-[30px] w-[345px]">
                <DropdownMenuLabel className="text-[24px] font-[600]">
                  Genres
                  <p className="text-[16px] font-[400]">
                    See lists of movies by genre
                  </p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="grid grid-cols-3 gap-3 p-[8px]">
                  {genreMovies.map((genres) => (
                    <div key={genres.id}>
                      <Button className="bg-white   border h-[24px] text-black text-[12px] hover:text-white">
                        {genres.name} <ChevronRight className="text-black" />
                      </Button>
                    </div>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex bg-white  dark:bg-slate-800 w-[320px] md:w-[419px] px-4 rounded-md items-center border border-solid shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
              <Search className="text-[#E4E4E7]" />
              <Input
                value={query}
                onChange={HandleSearch}
                type="search"
                placeholder="Search..."
                className="border-none outline-none focus:outline-none  dark:text-white"
              />
              <X
                onClick={() => setCurrentPage("header")}
                className=" dark:bg-slate-800"
              />
            </div>
          </div>
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
      {!isMobile && (
        <div className="h-[80px] flex justify-center w-full items-center gap-20">
          <div className="w-full flex justify-around gap-20 sm:gap-4 xl:gap-40 items-center">
            <Image src="/Logo.png" width={120} height={50} alt="Movie Logo" />
            <div className="flex gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-[97px]">
                    <ChevronDown />
                    Genre
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="flex bg-white md:w-[379px] px-4 rounded-md items-center border border-solid shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
                <Search className="text-[#E4E4E7]" />
                <Input
                  type="text"
                  placeholder="Search..."
                  className="border-none outline-none focus:outline-none"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <Button
                className="w-[35px] text-[10px] bg-white text-black hover:text-white"
                onClick={toggleDarkMode}
              >
                <Moon />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default First;
