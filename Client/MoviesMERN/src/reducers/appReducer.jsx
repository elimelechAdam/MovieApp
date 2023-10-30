const initialState = {
  user: {},
  movies: [],
  subs: [],
  members: [],
  searchQuery: "",
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case "SEARCH":
      return {
        ...state,
        searchQuery: action.payload,
      };
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "ALL_MOVIES":
      return { ...state, movies: action.payload };
    case "ALL_SUBS":
      return { ...state, subs: action.payload };
    case "ALL_MEMBERS":
      return { ...state, members: action.payload };
    case "DELETE_MOVIE":
      return {
        ...state,
        movies: state.movies.filter((movie) => movie._id !== action.payload),
        subs: state.subs.filter((sub) => sub.movieId !== action.payload),
      };
    case "EDIT_MOVIE":
      const updatedMovies = state.movies.map((movie) =>
        movie._id === action.payload._id ? action.payload : movie
      );
      return {
        ...state,
        movies: updatedMovies,
      };
    case "ADD_MOVIE":
      return {
        ...state,
        movies: [...state.movies, action.payload],
      };
    case "ADD_SUB":
      return {
        ...state,
        subs: [...state.subs, action.payload],
      };
    case "DELETE_SUB":
      return {
        ...state,
        subs: state.subs.filter((sub) => sub.memberId !== action.payload),
      };
    default:
      return state;
  }
}
