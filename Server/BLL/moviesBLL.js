const { MovieModel, SubscriptionModel } = require("../Model/MovieSchema");

const getAllMovies = () => {
  return MovieModel.find({});
};

const getMovie = (id) => {
  return MovieModel.findById(id);
};
const addMovie = async (movie) => {
  const newMovie = MovieModel(movie);
  console.log("inside BLL - movie");
  console.log(movie);
  await newMovie.save();
  return newMovie;
};
const updateMovie = async (id, movie) => {
  return await MovieModel.findByIdAndUpdate(id, movie, { new: true });
};

const deleteMovie = async (id) => {
  await SubscriptionModel.deleteMany({ movieId: id });
  await MovieModel.findByIdAndDelete(id);
  return `Movie ${id} - Removed`;
};

module.exports = {
  getMovie,
  getAllMovies,
  addMovie,
  updateMovie,
  deleteMovie,
};
