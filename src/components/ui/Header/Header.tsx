"use client";
import React from "react";
import Image from "next/image";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "react-responsive";
import { Search, Moon, ChevronDown, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";

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
  const [search, setSearch] = useState(null);
  const isMobileQuery = useMediaQuery({ maxWidth: 639 });
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(isMobileQuery);
  }, [isMobileQuery]);

  return (
    <div>
      {isMobile && (
        <div className="h-[60px] bg-white flex justify-center w-full items-center gap-20 ">
          {search === null && (
            <div className="w-full  flex justify-around gap-20 items-center   ">
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
                  className="w-[35px] text-[10px] bg-white text-black hover:text-white "
                >
                  <Search />
                </Button>
                <Button className="w-[35px] text-[10px] bg-white text-black  hover:text-white">
                  <Moon />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
      {!isMobile && (
        <div className="h-[80px] bg-white flex justify-center w-full items-center gap-20 sm:bg-red-300 md:bg-amber-300 lg:bg-green-400 xl:bg-blue-400 ">
          {search === null && (
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
                  <DropdownMenuContent className="w-[500px] xl:ml-[405px] lg:ml-[400px]">
                    <DropdownMenuLabel className="text-[24px] font-[600]">
                    
                      Genres
                      <p className="text-[16px] font-[400]">
                        See lists of movies by genre
                      </p>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className="grid grid-cols-3 xl:grid-cols-5 xl:gap-y-8 gap-3 p-[8px] ">
                      {genreMovies &&
                        genreMovies.map((genres: Genre) => (
                          <div className="" key={genres.id}>
                      <Link href={`/genremovie/${genres.name}`}>      <Button
                              key={genres.id}
                              className="bg-white border h-[24px] text-black text-[12px] hover:text-white "
                            >
                              {genres.name}{" "}
                              <ChevronRight className="text-black" />
                            </Button></Link>
                          </div>
                        ))}
                    </div>
                    <DropdownMenuSeparator />
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
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
