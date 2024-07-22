import { createSlice } from "@reduxjs/toolkit";

export interface IUser {
  token: string;
  user: {
    name: string;
    email: string;
    profilePic: string;
  };
}

const initialState: IUser = {
  token: "",
  user: {
    name: "",
    email: "",
    profilePic: "",
  },
};

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    setUser: (state, action) => {
      const { name, email, profilePic } = action.payload;
      state.user = { email, name, profilePic };
    },
    setToken: (state, action) => {
      state.token = action.payload.token;
    },
  },
});

export const { setUser, setToken } = userSlice.actions;

export default userSlice.reducer;
