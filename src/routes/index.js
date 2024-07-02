const { Router } = require("express");

const usersRoutes = require("./users.routes");

const movie_notesRoutes = require("./movie_notes.routes.js");

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/notes", movie_notesRoutes);
 


module.exports = routes;
