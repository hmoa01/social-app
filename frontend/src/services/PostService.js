import axios from "axios";

class PostService {
  static getAllPosts = () => axios.get("/posts/all");
  static deletePost = (id) => axios.delete(`/posts/${id}`);
  static addLike = (id) => axios.post(`/likes/addRemove/${id}`);
}

export default PostService;
