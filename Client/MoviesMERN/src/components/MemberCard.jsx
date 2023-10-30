import {
  Card,
  Button,
  CardContent,
  Typography,
  Stack,
  Grid,
} from "@mui/material";

import { updateData, deleteData } from "../utils/apiUtils";
import { useState } from "react";
import { EditMemberModal } from "./EditMemberModal";
import { SubMovieModal } from "./SubMovieModal";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export const MemberCard = ({
  _id,
  name,
  email,
  city,
  deleteMember,
  editMember,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const subs = useSelector((state) => state.search.subs);
  const movies = useSelector((state) => state.search.movies);
  const dispatch = useDispatch();
  const [memberData, setMemberData] = useState({
    name: name,
    email: email,
    city: city,
  });
  const [open, setOpen] = useState(false);

  const memberSubs = subs.filter((sub) => sub.memberId === _id);
  const watchedMovies = memberSubs
    .map((sub) => {
      const movie = movies.find((movie) => movie._id === sub.movieId);
      if (!movie) {
        return null;
      }
      return {
        ...movie,
        watchDate: sub.date,
      };
    })
    .filter(Boolean);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const handleDelete = async (id) => {
    await deleteData("/members", id);
    deleteMember(id);
    dispatch({ type: "DELETE_SUB", payload: id });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateData("/members", _id, memberData);
      editMember(_id, memberData);
    } catch (error) {
      console.log(error);
    }
    setIsEditing(false);
  };
  return (
    <>
      <Card sx={{ maxWidth: 500, padding: 2 }}>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <CardContent>
              <Typography variant="overline" fontSize={17} display={"flex"}>
                {name}
              </Typography>
              <Typography
                variant="button"
                fontSize={12}
                alignItems={"flex-start"}
              >
                <Typography variant="overline" display="block">
                  {email}
                </Typography>
                <Typography variant="overline" display="block">
                  {city}
                </Typography>
              </Typography>
              <Stack spacing={1} marginTop={4} direction="row">
                <Button className="simpleBtn" onClick={handleEdit}>
                  Edit
                </Button>
                <Button className="simpleBtn" onClick={() => handleDelete(_id)}>
                  Delete
                </Button>
                <Button className="simpleBtn" onClick={handleClickOpen}>
                  Subscribe
                </Button>
              </Stack>
            </CardContent>
          </Grid>
          <Grid item xs={6}>
            <CardContent>
              <Typography variant="overline" fontSize={13}>
                Movies Watched
              </Typography>
              {watchedMovies.map((movie, index) => (
                <Link to={`/movies/${movie._id}`} key={index}>
                  <Typography variant="body2">
                    {movie.name}, {movie.watchDate}
                  </Typography>
                </Link>
              ))}
            </CardContent>
          </Grid>
        </Grid>
      </Card>

      <br />
      <EditMemberModal
        isOpen={isEditing}
        onClose={handleClose}
        memberData={memberData}
        setMemberData={setMemberData}
        handleFormSubmit={handleFormSubmit}
      />
      {/* Edit Modal */}
      <SubMovieModal isOpen={open} onClose={handleClose} memberId={_id} />
    </>
  );
};
