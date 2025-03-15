import React from "react";
import { Search, X } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
function First() {
  return (
    <div className="flex">
      <Image
        src="/Logo.png"
        width={120}
        height={50}
        alt="Movie Logo"
        className="mt-[10px]"
      />
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
        <X />
      </div>
    </div>
  );
}

export default First;
