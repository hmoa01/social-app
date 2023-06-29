import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import postsSlice from "./postsSlice";

const store = configureStore({
  reducer: {
    storeUser: userSlice,
    storePosts: postsSlice,
  },
});

export default store;
