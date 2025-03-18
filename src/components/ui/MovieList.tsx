import React from "react";
import MovieListEach from "@/components/ui/MovieListEach";
import Movie from "@/components/type/Type";

type Props = {
  upcomingMovies: Movie[];
  topRatedMovies: Movie[];
  popularMovies: Movie[];
};

const details = {
  titles: ["Upcoming", "TopRated", "Popular"],
};

function MovieList({ upcomingMovies, topRatedMovies, popularMovies }: Props) {
  return (
    <div>
      {details.titles.map((title, index) => {
        let movieList: Movie[] = [];
        if (title === "Upcoming") movieList = upcomingMovies;
        if (title === "TopRated") movieList = topRatedMovies;
        if (title === "Popular") movieList = popularMovies;

        return (
          <MovieListEach key={index} title={title} movieList={movieList} />
        );
      })}
    </div>
  );
}

export default MovieList;
