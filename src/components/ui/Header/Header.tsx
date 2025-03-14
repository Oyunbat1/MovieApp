"use client";
import React from "react";
import Image from "next/image";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "react-responsive";
import { Search, Moon, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
type Checked = DropdownMenuCheckboxItemProps["checked"];

function Header({ setCurrentPage }) {
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
}

export default Header;
