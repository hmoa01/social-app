import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    count: null,
    posts: [],

    addRemoveLike: false,
  },
  reducers: {
    storeAllPosts: (state, action) => {
      state.count = action.payload.count;
      state.posts = action.payload.posts;
    },

    addRemoveLikeToggle: (state, action) => {
      state.addRemoveLike = !state.addRemoveLike;
    },
  },
});

export const { storeAllPosts, addRemoveLikeToggle } = postsSlice.actions;
export default postsSlice.reducer;
