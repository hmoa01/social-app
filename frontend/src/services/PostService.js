import axios from "axios";

class PostService {
  static getAllPosts = (page = 1, limit = 9) =>
    axios.get(`/posts/all?page=${page}&limit=${limit}`);
  static userPosts = (id) => axios.get(`/posts/${id}`);
  static getSinglePost = (id) => axios.get(`/posts/singlePost/${id}`);
  static getUserPosts = (id) => axios.get(`/posts/${id}`);
  static createNewPost = (body) => axios.post("/posts/add", body);
  static editPost = (body, id) => axios.put(`/posts/${id}`, body);
  static deletePost = (id) => axios.delete(`/posts/${id}`);
  static addLike = (id) => axios.post(`/likes/addRemove/${id}`);
  static searchPost = (title, page = 1, limit = 9) =>
    axios.get(`/posts/search?page=${page}&limit=${limit}&q=${title}`);
}

export default PostService;
