import axios from "axios";

class userService {
  static getUser = (id) => axios.get(`/users/${id}`);
  static registerUser = (body) => axios.post("/auth/signup", body);
  static loginUser = (body) => axios.post("/auth/login", body);
  static editUser = (id, body) => axios.put(`/users/edit/${id}`, body);
}

export default userService;
