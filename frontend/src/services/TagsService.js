import axios from "axios";

class TagsService {
  static allTags = () => axios.get("/tags");
}

export default TagsService;
