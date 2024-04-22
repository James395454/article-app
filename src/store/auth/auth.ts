import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ALLUSERS, USER } from "src/common/constants";
import { User } from "src/interfaces/UserInterface";

export interface AuthState {
  user?: User;
  allUsers?: User[];
}

const storedUser = localStorage.getItem(USER);
const allStoredUsers = localStorage.getItem(ALLUSERS);

const initialState: AuthState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  allUsers: allStoredUsers ? JSON.parse(allStoredUsers) : [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    registerUser: (state, action: PayloadAction<User>) => {
      state.allUsers?.push(action.payload);
    },
    fetchAllUsers: (state) => {
      const stringifiedUsers = localStorage.getItem(ALLUSERS);
      const allUsers = stringifiedUsers ? JSON.parse(stringifiedUsers) : [];
      state.allUsers = [...allUsers];
    },
    fetchCurrentUser: (state) => {
      const storedUser = localStorage.getItem(USER);
      const currentUser = storedUser ? JSON.parse(storedUser) : null;
      state.user = { ...currentUser };
    },
  },
});
export const { setCurrentUser, registerUser, fetchAllUsers, fetchCurrentUser } =
  authSlice.actions;

export default authSlice.reducer;
