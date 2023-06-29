import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    count: null,
    posts: [],
  },
  reducers: {
    storeAllPosts: (state, action) => {
      state.count = action.payload.count;
      state.posts = action.payload.posts;
    },
  },
});

export const { storeAllPosts } = postsSlice.actions;
export default postsSlice.reducer;
