import React, { useEffect, useState } from "react";
import { Stack, Button, Grid, TextField } from "@mui/material/";

import { Link, Outlet } from "react-router-dom";

export const Subscriptions = () => {
  return (
    <>
      <Stack spacing={2} marginTop={4} direction="row">
        <Link to={""}>
          <Button className="simpleBtn">All Members</Button>
        </Link>
        <Link to={"add"}>
          <Button className="simpleBtn">Add Member</Button>
        </Link>
      </Stack>
      <br />
      <Grid container spacing={2}>
        <Outlet />
      </Grid>
    </>
  );
};
