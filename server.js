require("express-async-errors");

const express = require("express");

const routes = require("./src/routes/users.routes");
const database = require("./src/database/sqlite/index.js");

const app = express();
app.use(express.json());

app.use(routes);

const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
