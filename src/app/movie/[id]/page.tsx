"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import ACCESS_TOKEN from "@/constants/index";
import Movie from "@/components/type/Type";
import Header from "@/components/ui/Header/Header";
import Footer from "@/components/ui/Footer";
import { useMediaQuery } from "react-responsive";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Credit {
  id: number;
  job: string;
  name: string;
}

export default function MovieDetailPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [trailer, setTrailer] = useState(null);
  const [credits, setCredits] = useState<Credit[]>([]);
  const [similar, setSimilar] = useState<Movie[]>([]);
  const [numItemsToShow, setNumItemsToShow] = useState(2);

  const isMobileQuery = useMediaQuery({ maxWidth: 639 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(isMobileQuery);
  }, [isMobileQuery]);

  const getMovies = async () => {
    try {
      const [movie, trailer, credits, similar] = await Promise.all([
        axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
          headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
        }),
        axios.get(`https://api.themoviedb.org/3/movie/${id}/videos`, {
          headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
        }),
        axios.get(`https://api.themoviedb.org/3/movie/${id}/credits`, {
          headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
        }),
        axios.get(`https://api.themoviedb.org/3/movie/${id}/similar`, {
          headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
        }),
      ]);
      setMovie(movie.data);
      setTrailer(trailer.data.results);
      setCredits(credits.data.crew);
      setSimilar(similar.data.results);
    } catch (error) {
      console.log("Алдаа гарлааа");
    }
  };

  const updateItemsToShow = () => {
    if (window.innerWidth >= 1280) {
      setNumItemsToShow(5);
    } else if (window.innerWidth >= 1024) {
      setNumItemsToShow(4);
    } else if (window.innerHeight >= 768) {
      setNumItemsToShow(3);
    } else {
      setNumItemsToShow(2);
    }
  };

  useEffect(() => {
    getMovies();
    updateItemsToShow(); 
    window.addEventListener("resize", updateItemsToShow);
    return () => window.removeEventListener("resize", updateItemsToShow); 
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <Header setCurrentPage={() => {}} genreMovies={[]} />
      <div className="p-[40px]">
        {isMobile && (
          <div className="mt-[80px]">
            <div className="flex justify-between gap-8">
              <div>
                <h1 className="text-3xl font-bold">{movie.title}</h1>
                <p className="text-1xl font-bold">{movie.release_date}</p>
              </div>
              <div className="flex ">
                <p>⭐</p>
                <div className="flex flex-col">
                  <p>{movie.vote_average}/10</p>
                  <p>34k</p>
                </div>
              </div>
            </div>
            <div>trailer</div>
            <div className="flex gap-4">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="mt-4 w-[100px] h-[148px]"
              />
              <div>
                {movie.genres.map((genre) => (
                  <Button
                    key={genre.id}
                    className="bg-white text-black border h-[20px] m-[4px] hover:bg-gray-100"
                  >
                    {genre.name}
                  </Button>
                ))}
                <p className="mt-4 text-lg">{movie.overview}</p>
              </div>
            </div>
          </div>
        )}
        {!isMobile && (
          <div className="mt-[20px]">
            <div className="flex justify-between gap-18">
              <div>
                <h1 className="text-3xl font-bold">{movie.title}</h1>
                <p className="text-1xl font-bold">{movie.release_date}</p>
              </div>
              <div className="flex ">
                <p>⭐</p>
                <div className="flex flex-col">
                  <p>{movie.vote_average}/10</p>
                  <p>34k</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mb-[20px] mt-[10px]">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="mt-4 w-[100px] h-[148px] sm:w-[140px] sm:h-[200px] md:w-[180px] md:h-[240px] lg:w-[220px] lg:h-[260px] xl:w-[300px] xl:h-[360px]"
              />
              <div>trailer</div>
            </div>
            <div>
              {movie.genres.map((genre) => (
                <Button
                  key={genre.id}
                  className="bg-white text-black border h-[20px] m-[4px] hover:bg-gray-100"
                >
                  {genre.name}
                </Button>
              ))}
              <p className="mt-4 text-lg">{movie.overview}</p>
            </div>
          </div>
        )}

        <div className="mt-[80px] flex flex-col gap-[20px]">
          <div className="flex justify-around gap-20 border-b pb-[24px]">
            <h1 className="w-[100px]">Director</h1>
            {credits.map((credit) => {
              if (credit.job === "Director") {
                return <p key={credit.id}>{credit.name}</p>;
              }
              return null;
            })}
          </div>
          <div className="flex justify-around gap-20 border-b pb-[24px]">
            <h1 className="w-[100px]">Writers</h1>
            {credits.map((credit) => {
              if (credit.job === "Writer") {
                return <p key={credit.id}>{credit.name}</p>;
              }
              return null;
            })}
          </div>
          <div className="flex justify-around gap-20 border-b pb-[24px]">
            <h1 className="w-[100px]">Stars</h1>
            {credits.map((credit) => {
              if (credit.job === "Writer") {
                return <p key={credit.id}>{credit.name}</p>;
              }
              return null;
            })}
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center mt-[40px] outline-none">
            <h1 className="text-[24px] font-[600]">More like this</h1>
            <Link href={`/movie/${id}/more-like-this`}>
              <Button className="bg-white text-black hover:bg-gray-100">
                See more <ArrowRight />
              </Button>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-[20px]">
          {similar.slice(0, numItemsToShow).map((sim: Movie, index) => (
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
      <div className="mt-[30px]">
        <Footer />
      </div>
    </div>
  );
}
