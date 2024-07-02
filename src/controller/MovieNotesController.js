const sqliteConnection = require("../database/sqlite/index.js");

class MovieNotesController {
  async create(req, res) {
    const { title, description, rating } = req.body;
    const { user_id } = req.params;
    const database = await sqliteConnection();

    try {
      const user = await database.get("SELECT * FROM users WHERE id = ?", [
        user_id,
      ]);

      if (!user) {
        return res.status(404).json({ message: "User does not exist." });
      }
      const result = await database.run(
        "INSERT INTO movie_notes (title, description, rating, user_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)",
        [title, description, rating, user_id, new Date(), new Date()]
      );

      const note_id = result.lastID;

      return res
        .status(201)
        .json({ note_id, message: "Movie note created successfully!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to create movie note." });
    }
  }
  async show(req, res) {
    const database = await sqliteConnection();

    const note = await database.all("SELECT * FROM movie_notes");

    return res.status(200).json(note);
  }
}

module.exports = MovieNotesController;
