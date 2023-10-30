import React, { useEffect, useState } from "react";
import { Stack, Button, Grid, TextField } from "@mui/material/";

import { Link, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";

export const Movies = () => {
  const dispatch = useDispatch();
  return (
    <>
      <Stack spacing={2} marginTop={4} direction="row">
        <Link to={"/"}>
          <Button className="simpleBtn">All Movies</Button>
        </Link>
        <Link to={"/movies/add"}>
          <Button className="simpleBtn">Add Movie</Button>
        </Link>
        <TextField
          id="outlined-basic"
          label="Search movie"
          variant="outlined"
          size="small"
          onChange={(e) =>
            dispatch({ type: "SEARCH", payload: e.target.value })
          }
        />
      </Stack>
      <br />
      <Grid container spacing={2}>
        <Outlet />
      </Grid>
    </>
  );
};
