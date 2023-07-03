import axios from "axios";

class CommentService {
  static addNewComment = (body, id) => axios.post(`/comments/add/${id}`, body);
  static editComment = (body, id) => axios.put(`/comments/${id}`, body);
  static deleteComment = (id) => axios.delete(`/comments/${id}`);
}

export default CommentService;
