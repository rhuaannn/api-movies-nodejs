const { Router } = require("express");

const usersRoutes = require("./users.routes");

const movie_notesRoutes = require("./movie_notes.routes.js");

const tagsRoutes = require("./tags.routes.js");

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/notes", movie_notesRoutes);
routes.use("/tags", tagsRoutes);
 


module.exports = routes;
