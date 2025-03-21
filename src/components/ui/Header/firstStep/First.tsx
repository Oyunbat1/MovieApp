import React, { ChangeEvent } from "react";
import { Search, X, ChevronDown, Moon, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { useMediaQuery } from "react-responsive";
import ACCESS_TOKEN from "@/constants/index";
import axios from "axios";
import Movie from "@/components/type/Type";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Checked = DropdownMenuCheckboxItemProps["checked"];
interface Genre {
  id: number;
  name: string;
}
interface FirstProps {
  setCurrentPage: (page: string) => void;
  genreMovies: Genre[];
}

const First: React.FC<FirstProps> = ({ setCurrentPage, genreMovies }) => {
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true);
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false);
  const [showPanel, setShowPanel] = React.useState<Checked>(false);

  const [page, setPage] = useState(1);
  const [searchMovie, setSearchMovies] = useState<Movie[]>([]);

  const [query, setQuery] = useState("");

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
    console.log(event.target.value);
  };
  useEffect(() => {
    SearchMoviesByGenre(query);
  }, [query]);

  return (
    <div>
      {isMobile && (
        <div className="h-[60px] bg-white flex flex-col justify-center w-full items-center gap-1 pt-[10px] ">
          <div className="flex">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-[37px]">
                  <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="ml-[30px] w-[345px] ">
                <DropdownMenuLabel className="text-[24px] font-[600]">
                  Genres
                  <p className="text-[16px] font-[400]">
                    See lists of movies by genre
                  </p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="grid grid-cols-3 gap-3 p-[8px] ">
                  {" "}
                  {genreMovies.map((genres) => (
                    <div className="" key={genres.id}>
                      <Button
                        key={genres.id}
                        className="bg-white border h-[24px] text-black text-[12px] hover:text-white "
                      >
                        {genres.name} <ChevronRight className="text-black" />
                      </Button>
                    </div>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <div
              className="flex bg-white w-[320px] md:w-[419px]  px-4 rounded-md
             items-center border  border-solid shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
            >
              <Search className="text-[#E4E4E7]" />
              <Input
                value={query}
                onChange={HandleSearch}
                type="search"
                placeholder="Search..."
                className="border-none outline-none focus:outline-none "
              />
              <X onClick={() => setCurrentPage("header")} />
            </div>
          </div>
          <div className="absolute top-[76px] z-32 ">
          <div className="rounded-md w-[360px] bg-white border">
          {searchMovie.slice(0,5).map((search) => (
              <div key={search.id} className=" p-[10px] border-b-1">
                <div className=" flex justify-around items-center gap-2 h-[140px] p-[10px] relative">
                <img
                className="w-[100px] h-[130px] rounded-md absolute left-1"
                  src={`https://image.tmdb.org/t/p/w300${search.poster_path}`}
                  alt={search.title}
                />
                  <div className="flex flex-col gap-10 absolute right-4 w-[200px] ">
                    <div>
                      <h1 className="text-[14px] font-[600]">{search.title}</h1>
                      <div className="flex items-center gap-2">
                         <Image src="/star.svg" width={10} height={50} alt="Star" />
                       <h1 className="text-[12px]"> <span className="text-[14px] font-bold">{search.vote_average}</span>/10</h1>
                      </div>
                    </div>
                    <div className="flex justify-around gap-20">
                      <h1>{search.release_date.slice(0,4)}</h1>
                      <h1>Bottuon</h1>
                    </div>
                  </div>
                </div>
              </div>
              
            ))}
          <div className="p-[20px]"><h1>See all results for ... </h1></div>
          </div>
          </div>
        </div>
      )}
      {!isMobile && (
        <div className="h-[80px] bg-white flex justify-center w-full items-center gap-20 ">
          <div className="w-full  flex justify-around gap-20 sm:gap-4 xl:gap-40 items-center  ">
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
                  <DropdownMenuCheckboxItem
                    checked={showStatusBar}
                    onCheckedChange={setShowStatusBar}
                  >
                    Status Bar
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={showActivityBar}
                    onCheckedChange={setShowActivityBar}
                    disabled
                  >
                    Activity Bar
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={showPanel}
                    onCheckedChange={setShowPanel}
                  >
                    Panel
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div
                className="flex bg-white md:w-[379px]  px-4 rounded-md
                     items-center border  border-solid shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
              >
                <Search className="text-[#E4E4E7]" />
                <Input
                  type="text"
                  placeholder="Search..."
                  className="border-none outline-none focus:outline-none "
                />
              </div>
            </div>
            <div className="flex gap-4">
              <Button className="w-[35px] text-[10px] bg-white text-black  hover:text-white">
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
