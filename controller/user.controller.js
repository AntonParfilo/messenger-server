import md5 from "md5";
import db from "../db.js";
class userController {
  async getUsers() {
    try {
      let response = await db.query("SELECT * FROM users");
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async checkUser(data) {
    try {
      let response = await db.query("SELECT * FROM users WHERE LOWER(username) = LOWER($1) AND password = $2",
      [data.username, data.password]
      );
      if(response.rows.length) return {message: "OK", data: response.rows[0]}
        else return {message: "Error", data: {}};
      
    } catch (error) {
      console.log(error);
    }
  }

  async addUser(data) {
    try {
      let response = await db.query("SELECT * FROM users WHERE LOWER(username) = LOWER($1)", [data.username]);
      if(response.rows.length) return {message: "already", data: response.rows[0]};
      data.password = md5(data.password);
      response = await db.query(
        "INSERT INTO users (username, password, agent) VALUES ($1, $2, $3) RETURNING *",
        [data.username, data.password, data.agent]
      );
      return {message: "OK", data: response.rows[0]};
    } catch (error) {
      console.log(error);
    }
  }
} 

export default new userController();
