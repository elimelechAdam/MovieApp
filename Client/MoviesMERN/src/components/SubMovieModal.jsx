import {
  Button,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  Modal,
  Box,
  MenuItem,
  Menu,
} from "@mui/material";

import { useSelector } from "react-redux/es/hooks/useSelector";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { addData } from "../utils/apiUtils";

export const SubMovieModal = ({ isOpen, onClose, memberId }) => {
  const [selectedMovie, setSelectedMovie] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const movies = useSelector((state) => state.search.movies);
  const subs = useSelector((state) => state.search.subs);

  const dispatch = useDispatch();

  const memberSubs = subs.filter((sub) => sub.memberId === memberId);
  const filteredMoviesToSub = movies.filter(
    (movie) => !memberSubs.some((sub) => sub.movieId === movie._id)
  );
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const subData = {
        movieId: selectedMovie,
        memberId: memberId,
        date: selectedDate,
      };
      await addData("/subs", subData);
      dispatch({ type: "ADD_SUB", payload: subData });
      onClose();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 5,
        }}
      >
        <Typography gutterBottom variant="overline" fontSize={20}>
          Subscribe to Movie
        </Typography>
        <form onSubmit={handleFormSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth style={{ width: "200px" }}>
                <InputLabel id="demo-simple-select-label">
                  Select movie
                </InputLabel>

                <Select
                  labelId="movies-label"
                  id="movies"
                  label="Select movie"
                  value={selectedMovie}
                  onChange={(e) => setSelectedMovie(e.target.value)}
                >
                  {filteredMoviesToSub.map((movie) => (
                    <MenuItem key={movie._id} value={movie._id}>
                      {movie.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  onChange={(date) =>
                    setSelectedDate(date.format("YYYY-MM-DD"))
                  }
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={6}>
              <Button type="submit" fullWidth className="simpleBtn">
                Subscribe
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button onClick={onClose} fullWidth className="simpleBtn">
                Cancel
              </Button>
            </Grid>
          </Grid>
          <br />
        </form>
      </Box>
    </Modal>
  );
};
