const { Router } = require("express");
const MovieNotesController = require("../controller/MovieNotesController.js");

const movie_notesRoutes = Router();
const movieNotesController = new MovieNotesController();

movie_notesRoutes.post(
  "/:user_id",
  movieNotesController.create.bind(movieNotesController)
);

module.exports = movie_notesRoutes;
