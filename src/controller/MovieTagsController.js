const sqliteConnection = require("../database/sqlite/index");

class MovieTagsController {
  async index(req, res) {
    const { user_id } = req.params;
    const database = await sqliteConnection();

    try {
      const tags = await database.all(`
        SELECT movie_tags.name FROM movie_tags
        JOIN movie_notes ON movie_notes.id = movie_tags.notes_id
        WHERE movie_notes.user_id = ?
      `, [user_id]);
        console.log(tags);
      return res.status(200).json(tags);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to retrieve tags." });
    }
  }
}

module.exports = MovieTagsController;
