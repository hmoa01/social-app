import axios from "axios";

class PostService {
  static getAllPosts = () => axios.get("/posts/all");
}

export default PostService;
