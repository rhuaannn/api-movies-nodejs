const { Router } = require("express");

const UsersController = require("../controller/UsersController");

const usersRoutes = Router();

const usersController = new UsersController();

usersRoutes.post("/", usersController.create);
usersRoutes.put("/:id", usersController.updateUsers);
usersRoutes.delete("/:id", usersController.deleteUsers);
 
 


module.exports = usersRoutes;
