import axios from "axios";

class userService {
  static registerUser = (body) => axios.post("/auth/signup", body);
  static loginUser = (body) => axios.post("/auth/login", body);
}

export default userService;
