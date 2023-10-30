import React, { useEffect, useState } from "react";
import { MovieCard } from "../components/MovieCard";
import { Grid, Fade } from "@mui/material/";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

export const MovieList = () => {
  const searchQuery = useSelector((state) => state.search.searchQuery);
  const movies = useSelector((state) => state.search.movies);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const filteredMovies = movies.filter((movie) => {
    const query = searchQuery.toLowerCase();

    // Check if movie name includes the search query
    const nameMatch = movie.name.toLowerCase().includes(query);

    // Convert each genre to lowercase and check if any match the search query
    const genreMatch = movie.genres
      .map((genre) => genre.toLowerCase())
      .some((genre) => genre.includes(query));

    return nameMatch || genreMatch; // Return true if either name or any genre matches
  });
  return (
    <>
      {!isLoading ? (
        filteredMovies.map((movie, idx) => {
          return (
            <Fade in={filteredMovies.length > 0} timeout={500} key={idx}>
              <Grid item xs={4}>
                <MovieCard {...movie} />
              </Grid>
            </Fade>
          );
        })
      ) : (
        <CircularProgress />
      )}
    </>
  );
};
