import axios from "axios";

class userService {
  static registerUser = (body) => axios.post("/auth/signup", body);
}

export default userService;
