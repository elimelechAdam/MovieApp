const express = require("express");
const router = express.Router();
const moviesBLL = require("../BLL/moviesBLL");

router.get("/", async (req, res) => {
  try {
    const movies = await moviesBLL.getAllMovies();
    res.json(movies);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const movies = await moviesBLL.getMovie(id);
    res.json(movies);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/", async (req, res) => {
  let { name, yearPremiered, genres, imageUrl } = req.body;

  if (!name || name.trim() === "") {
    return res.status(400).send("Name is required.");
  }
  if (!yearPremiered || yearPremiered.trim() === "") {
    return res.status(400).send("Year Premiered is required.");
  }

  if (!genres || genres.length === 0) {
    return res.status(400).send("Genres is required.");
  }
  if (!imageUrl || imageUrl.trim() === "") {
    return res.status(400).send("Image is required.");
  }

  let status = await moviesBLL.addMovie(req.body);

  if (!status) {
    return res.send("Can't add movie");
  }
  return res.json(status);
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const obj = req.body;
    const result = await moviesBLL.updateMovie(id, obj);
    console.log(result);
    return res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const result = await moviesBLL.deleteMovie(id);
  return res.json(result);
});

module.exports = router;
