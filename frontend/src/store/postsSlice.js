import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    count: null,
    posts: [],

    addRemoveLike: false,
    removePost: false,
    createNewPost: false,
  },
  reducers: {
    storeAllPosts: (state, action) => {
      state.count = action.payload.count;
      state.posts = action.payload.posts;
    },

    addRemoveLikeToggle: (state, action) => {
      state.addRemoveLike = !state.addRemoveLike;
    },

    removePost: (state, action) => {
      state.removePost = !state.removePost;
    },

    createPost: (state, action) => {
      state.createNewPost = !state.createNewPost;
    },
  },
});

export const { storeAllPosts, addRemoveLikeToggle, removePost, createPost } =
  postsSlice.actions;
export default postsSlice.reducer;
