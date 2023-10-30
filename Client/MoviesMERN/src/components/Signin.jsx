import * as React from "react";
import axios from "axios";
import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Alert,
  createTheme,
  ThemeProvider,
} from "@mui/material/";

import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
  const [login, setLogin] = useState({ username: "", password: "" });
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("user");
  const getData = async () => {
    const { data } = await axios.get("http://localhost:9000/users/");
    setData(data);
  };
  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:9000/login/",
        {
          username: login.username,
          password: login.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 400) {
        setError(response.data.message);
      } else {
        setSuccess(response.data.message);
        setError("");
        let resData = JSON.stringify(response.data.user);
        localStorage.setItem("user", resData);
        dispatch({ type: "LOGIN", payload: resData });
        navigate("/");
      }
    } catch (e) {
      console.log(e.response.data);
      setSuccess("");
      setError(e.response.data || "An unexpected error occurred.");
    }
  };

  return isLoggedIn ? (
    <Navigate to="/" />
  ) : (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label="Username"
              name="username"
              value={login.username}
              onChange={(e) => setLogin({ ...login, username: e.target.value })}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={login.password}
              onChange={(e) => setLogin({ ...login, password: e.target.value })}
            />

            <Button
              type="submit"
              fullWidth
              className="simpleBtn"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
      </Container>
    </ThemeProvider>
  );
}
