import db from "../db.js";
import md5 from "md5";

class MessagesController {
 
  async getMessages() {
    try {
      let response = await db.query("SELECT * FROM messages");
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getMessage(id) {
    try {
      let response = await db.query("SELECT * FROM messages WHERE id = "+id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async addMessage(data) {
    try {
      let response = await db.query("SELECT * FROM users WHERE LOWER(username) = LOWER($1) AND password = $2",
      [data.username, data.password]
      );
      if(response.rows.length){
        response = await db.query(
          "INSERT INTO messages (username, message, date) VALUES ($1, $2, $3) RETURNING *",
          [data.username, data.message, data.date]
        );
        return {message: "OK", data: response.rows[0]}
      }
        else return {message: "Error", data: {}};
    } catch (error) {
      console.log(error);
    }
  }
}

export default new MessagesController();