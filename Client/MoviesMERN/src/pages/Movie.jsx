import { Grid } from "@mui/material/";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { MovieCard } from "../components/MovieCard";

export const Movie = () => {
  const { movieid } = useParams();
  const movieData = useSelector((state) => state.search.movies);
  console.log(movieData);

  const findMovie = () => movieData.find((movie) => movie._id == movieid);
  console.log(findMovie());

  return (
    <Grid item xs={4}>
      <MovieCard {...findMovie()} />
    </Grid>
  );
};
