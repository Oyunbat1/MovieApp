"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import ACCESS_TOKEN from "@/constants/index";
import Movie from "@/components/type/Type";
import Header from "@/components/ui/Header/Header";
import FirstStep from "@/components/ui/Header/firstStep/First";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function MovieDetailPage() {
  const { id } = useParams();
  console.log("Movie ID:", id);

  const [similar, setSimilar] = useState([]);

  const getMovies = async () => {
    try {
      const [similar] = await Promise.all([
        axios.get(`https://api.themoviedb.org/3/movie/${id}/similar`, {
          headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
        }),
      ]);

      setSimilar(similar.data.results);
    } catch (error) {
      console.log("Алдаа гарлааа");
    }
  };
  useEffect(() => {
    getMovies();
  }, [id]);

  if (!similar) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <div className="grid grid-cols-2 gap-4 mt-[20px]">
        {similar.slice(0, 2).map((sim: Movie, index) => (
          <Link key={index} href={`/movie/${sim.id}`}>
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
    </div>
  );
}
