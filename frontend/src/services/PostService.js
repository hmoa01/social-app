import axios from "axios";

class PostService {
  static getAllPosts = (page, limit) =>
    axios.get(`/posts/all?page=${page}&limit=${limit}`);
  static getSinglePost = (id) => axios.get(`/posts/singlePost/${id}`);
  static createNewPost = (body) => axios.post("/posts/add", body);
  static editPost = (body, id) => axios.put(`/posts/${id}`, body);
  static deletePost = (id) => axios.delete(`/posts/${id}`);
  static addLike = (id) => axios.post(`/likes/addRemove/${id}`);
}

export default PostService;
