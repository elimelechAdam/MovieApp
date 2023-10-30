import {
  Card,
  Button,
  CardMedia,
  CardContent,
  Typography,
  Stack,
  Grid,
  Menu,
  MenuItem,
  ListItemIcon,
  IconButton,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { updateData, deleteData } from "../utils/apiUtils";
import { EditMovieModal } from "./EditMovieModal";
import { MovieSubs } from "./MovieSubs";
import { useDispatch } from "react-redux";

export const MovieCard = ({
  _id,
  genres = [],
  imageUrl,
  yearPremiered,
  name,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [id, setID] = useState(null);
  const [movieData, setMovieData] = useState({
    name: name,
    yearPremiered: yearPremiered,
    genres: genres,
    imageUrl: imageUrl,
  });

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleEdit = (id) => {
    setID(id);
    setIsEditing(!isEditing);
  };
  const handleDelete = async (id) => {
    await deleteData("/movies", id);
    dispatch({ type: "DELETE_MOVIE", payload: id });
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const resp = await updateData("/movies", id, movieData);
      dispatch({ type: "EDIT_MOVIE", payload: resp });
      navigate("/");
    } catch (error) {}
    setIsEditing(false);
  };

  return (
    <>
      <Card sx={{ maxWidth: 600 }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <CardMedia
              component="img"
              height="250"
              sx={{ objectFit: "cover" }}
              image={imageUrl}
              alt={name}
            />
          </Grid>

          <Grid item xs={4}>
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {name && yearPremiered
                  ? `${name} , ${yearPremiered.split("-")[0]}`
                  : "Loading..."}
              </Typography>
              <div>
                {genres.map((genre, index) => (
                  <Button
                    key={index}
                    variant="outlined"
                    size="small"
                    sx={{
                      marginRight: "0.5rem",
                      marginBottom: "0.5rem",
                      fontSize: "0.7rem",
                      padding: "2px 8px",
                    }}
                  >
                    {genre}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Grid>

          <Grid item xs={4}>
            <MovieSubs movieId={_id} />
          </Grid>
          <Grid item xs={1}>
            <Stack direction="row" spacing={1}>
              <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => handleEdit(_id)}>
                  <ListItemIcon>
                    <EditIcon fontSize="small" />
                  </ListItemIcon>
                  <Typography variant="inherit">Edit</Typography>
                </MenuItem>
                <MenuItem onClick={() => handleDelete(_id)}>
                  <ListItemIcon>
                    <DeleteIcon fontSize="small" />
                  </ListItemIcon>
                  <Typography variant="inherit">Delete</Typography>
                </MenuItem>
              </Menu>
            </Stack>
          </Grid>
        </Grid>
      </Card>
      <br />

      <EditMovieModal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        movieData={movieData}
        setMovieData={setMovieData}
        handleFormSubmit={handleFormSubmit}
      />
    </>
  );
};
