import axios from "axios";

class userService {
  static getSingleUser = (id) => axios.get(`/users/${id}`);
  static registerUser = (body) => axios.post("/auth/signup", body);
  static loginUser = (body) => axios.post("/auth/login", body);
  static updateUser = (id, body) => axios.put(`/users/edit/${id}`, body);
}

export default userService;
