import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./index.css";
import SignIn from "./components/Signin";
import { Navbar } from "./components/Navbar";
import { Movies } from "./pages/Movies";
import { Container } from "@mui/material";
import { AddMovie } from "./pages/AddMovie";
import { MovieList } from "./pages/MovieList";
import { Subscriptions } from "./pages/Subscriptions";
import { MemberList } from "./pages/MemberList";
import { AddMember } from "./pages/AddMember";
import { useDispatch } from "react-redux";
import { fetchData } from "./utils/apiUtils";
import { Movie } from "./pages/Movie";
import { ProtectedRoutes } from "./components/ProtectedRoutes";
import { Member } from "./pages/Member";
function App() {
  const dispatch = useDispatch();

  const fetchMovies = async () => {
    try {
      const movies = await fetchData("/movies");
      const subs = await fetchData("/subs");
      const members = await fetchData("/members");

      if (!movies) return;
      if (!subs) return;
      if (!members) return;
      dispatch({ type: "ALL_MOVIES", payload: movies });
      dispatch({ type: "ALL_SUBS", payload: subs });
      dispatch({ type: "ALL_MEMBERS", payload: members });
    } catch (error) {
      console.error("Failed to fetch movies or subs:", error.message);
    }
  };
  useEffect(() => {
    fetchMovies();
  }, []);
  return (
    <>
      <Navbar />
      <Container maxWidth={false}>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Movies />}>
              <Route path="/" element={<MovieList />} />
              <Route path="movies/add" element={<AddMovie />} />
              <Route path="movies/:movieid" element={<Movie />} />
            </Route>

            <Route path="subs" element={<Subscriptions />}>
              <Route path="" element={<MemberList />} />
              <Route path="add" element={<AddMember />} />
              <Route path=":memberid" element={<Member />} />
            </Route>
          </Route>
          <Route path="/login" element={<SignIn />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
