import React from "react";
import "../App.css";
import { Container, Button, Stack, Chip } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { getName } from "../utils/utils";
import { useDispatch } from "react-redux";
export const Navbar = () => {
  const navigate = useNavigate();
  const userLoggedIn = localStorage.getItem("user");
  const dispatch = useDispatch();
  const Logout = () => {
    localStorage.clear();
    dispatch({ type: "LOGOUT" });
    window.location.reload(true);
  };

  return (
    <Container maxWidth={false} sx={{ backgroundColor: "#262833" }}>
      <Stack
        direction="row"
        spacing={4}
        sx={{ padding: "1rem", alignItems: "center" }}
      >
        <div className="logo-container">
          <img src="../src/logo.png" alt="Logo" />
        </div>
        {userLoggedIn ? (
          <>
            <Link to={"/"}>
              <Button className="buttonNav" sx={{ padding: "15px" }}>
                Movies
              </Button>
            </Link>
            <Link to={"/subs"}>
              <Button className="buttonNav" sx={{ padding: "15px" }}>
                Subscriptions
              </Button>
            </Link>
            <Link to={"/"} style={{ flexGrow: 1 }}>
              <Button
                className="buttonNav"
                sx={{ padding: "15px" }}
                onClick={Logout}
              >
                Logout
              </Button>
            </Link>
            <Chip
              variant="outlined"
              label={getName()}
              size="small"
              style={{ color: "white", borderColor: "#39e991" }}
            />
          </>
        ) : null}
      </Stack>
    </Container>
  );
};
