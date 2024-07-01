const { hash, compare } = require("bcryptjs");
const AppError = require("../utils/AppError");

const sqliteConnection = require("../database/sqlite/index.js");

class UsersController {
  async create(req, res) {
    const { name, email, password } = req.body;
    const database = await sqliteConnection();

    const checkUserExists = await database.get(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (checkUserExists) {
      return res.status(404).json({ error: "E-mail Existente!" });
    }

    const hashedPassword = await hash(password, 8);

    await database.run(
      "INSERT INTO users(name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );
    return res.status(201).json();
  }

  async updateUsers(req, res) {
    const { name, email, password } = req.body;
    const userId = req.params.id;
    const database = await sqliteConnection();

    const existUser = await database.get("SELECT * FROM users WHERE id = ?", [
      userId,
    ]);
    const existEmail = await database.get(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existEmail && existEmail.userId !== userId) {
      return res.status(404).json({ error: "Email existente!" });
    }
    if (!existUser) {
      res.status(404).json({ error: "Usuário não existe!" });
    }
    let hashedPassword = existUser.password;
    if (password) {
      hashedPassword = await hash(password, 8);
    }

    await database.run(
      "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?",
      [name, email, hashedPassword, userId]
    );
    return res.status(200).json({ message: "Usuário atualizado com sucesso." });
  }

  async deleteUsers(req, res) {
    const userId = req.params.id;
    const database = await sqliteConnection();

    const existUserDelete = await database.get(
      "SELECT * FROM users WHERE id = ?",
      [userId]
    );

    if (!existUserDelete) {
      res.status(404).json({ error: "Nao existe esse usuario!" });
    }

    await database.run("DELETE FROM users WHERE id = ?", [userId]);
    return res.status(200).json({ message: "Usuário deletado com sucesso." });
  }
}

module.exports = UsersController;
