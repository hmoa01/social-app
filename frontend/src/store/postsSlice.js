import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    count: null,
    posts: [],

    addRemoveLike: false,
    removePost: false,
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
  },
});

export const { storeAllPosts, addRemoveLikeToggle, removePost } =
  postsSlice.actions;
export default postsSlice.reducer;
