import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
  },
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("sa_user", JSON.stringify(action.payload));
    },

    logOutUser: (state, action) => {
      state.user = {};
      localStorage.removeItem("sa_user");
      localStorage.removeItem("sa_token");
    },

    restoreUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { loginUser, restoreUser, logOutUser } = userSlice.actions;

export default userSlice.reducer;
