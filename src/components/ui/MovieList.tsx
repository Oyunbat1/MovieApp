import React from "react";
import MovieListEach from "@/components/ui/MovieListEach";
import Movie from "@/components/type/Type";

type Props = {
  movieList: Movie[];
};
const details = {
  titles: ["Upcoming", "TopRated", "Popular"],
};

function MovieList(props: Props) {
  return (
    <div>
      {details.titles.map((title, index) => (
        <MovieListEach
          key={index}
          title={title}
          movieList={props.movieList}
        ></MovieListEach>
      ))}
    </div>
  );
}

export default MovieList;
