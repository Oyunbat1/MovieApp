import React from "react";
import { Search, X, ChevronDown, Moon, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { useMediaQuery } from "react-responsive";
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
  const [search, setSearch] = useState(null);
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true);
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false);
  const [showPanel, setShowPanel] = React.useState<Checked>(false);

  const isMobileQuery = useMediaQuery({ maxWidth: 639 });
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(isMobileQuery);
  }, [isMobileQuery]);

  return (
    <div>
      {isMobile && (
        <div className="h-[60px] bg-white flex justify-center w-full items-center gap-1 pt-[10px]">
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
              type="text"
              placeholder="Search..."
              className="border-none outline-none focus:outline-none "
            />
            <X onClick={() => setCurrentPage("header")} />
          </div>
        </div>
      )}
      {!isMobile && (
        <div className="h-[80px] bg-white flex justify-center w-full items-center gap-20 ">
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
          )}
        </div>
      )}
    </div>
  );
};

export default First;
