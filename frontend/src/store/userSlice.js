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

    restoreUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { loginUser, restoreUser } = userSlice.actions;

export default userSlice.reducer;
