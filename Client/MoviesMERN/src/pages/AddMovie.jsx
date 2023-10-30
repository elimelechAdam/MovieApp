import {
  Container,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Grid,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { addData as addMovieUtil } from "../utils/apiUtils";
import { Link, useNavigate } from "react-router-dom";
import { genresList } from "../utils/utils";
import { useDispatch } from "react-redux";
export const AddMovie = () => {
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState({
    name: "",
    yearPremiered: "",
    genres: [],
    imageUrl: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(movieData);
    // Handle form submission logic here
    try {
      const result = await addMovieUtil("/movies", movieData);
      console.log("Movie added successfully");
      console.log(result);
      setSuccess("Movie added successfully");
      setError(""); // Clear any previous error message
      dispatch({ type: "ADD_MOVIE", payload: result });
      navigate("/");
    } catch (error) {
      console.error("Error while adding movie:", error);
      setSuccess(""); // Clear success messages
      setError(error || "An unexpected error occurred."); // Handle other errors
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              id="name"
              label="Name"
              value={movieData.name}
              onChange={(e) =>
                setMovieData({ ...movieData, name: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              id="yearPremiered"
              label="Year Premiered"
              value={movieData.yearPremiered}
              onChange={(e) =>
                setMovieData({
                  ...movieData,
                  yearPremiered: e.target.value,
                })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="genres-label">Genres</InputLabel>
              <Select
                labelId="genres-label"
                id="genres"
                multiple
                value={movieData.genres}
                onChange={(e) =>
                  setMovieData({ ...movieData, genres: e.target.value })
                }
                label="Genres"
                renderValue={(selected) => selected.join(", ")}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 200,
                      width: 250,
                    },
                  },
                }}
              >
                {genresList.map((genre) => (
                  <MenuItem key={genre} value={genre}>
                    <Checkbox checked={movieData.genres.indexOf(genre) > -1} />
                    <ListItemText primary={genre} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              id="imageUrl"
              label="Image URL"
              value={movieData.imageUrl}
              onChange={(e) =>
                setMovieData({ ...movieData, imageUrl: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={6}>
            <Button type="submit" fullWidth className="simpleBtn">
              Add Movie
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Link to={"/movies"}>
              <Button type="submit" fullWidth className="simpleBtn">
                Cancel
              </Button>
            </Link>
          </Grid>
        </Grid>
        <br />
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
      </form>
    </Container>
  );
};
