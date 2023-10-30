import {
  Button,
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Modal,
  Box,
  MenuItem,
} from "@mui/material";
import React from "react";
import { genresList } from "../utils/utils";

export const EditMovieModal = ({
  isOpen,
  onClose,
  movieData,
  setMovieData,
  handleFormSubmit,
}) => {
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
          Edit Movie
        </Typography>
        <form onSubmit={handleFormSubmit}>
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
                  {genresList.map((movie, idx) => (
                    <MenuItem key={idx} value={movie}>
                      {movie}
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
                Save
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button type="submit" fullWidth className="simpleBtn">
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
