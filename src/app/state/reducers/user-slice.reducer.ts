import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserModel } from "../../@api/models";
import { ConversationModel } from "../../@api/models/conversation.model";

interface UserSlice {
  accessToken: string | null;
  isAuth: boolean;
  user: Partial<UserModel> | null;
  conversations: ConversationModel[];
}

const initState: UserSlice = {
  accessToken: null,
  isAuth: false,
  user: null,
  conversations: [],
};

const userSlice = createSlice({
  name: "userSlice",
  initialState: initState,
  reducers: {
    setUserToken: (state, action: PayloadAction<string>) => {
      const token = action.payload;
      state.accessToken = token;
    },

    setIsAuth: (state) => {
      state.isAuth = true;
    },
    setUser: (state, action: PayloadAction<UserModel>) => {
      state.user = {
        ...action.payload,
      };
    },

    logout: (state) => {
      state.accessToken = null;
      state.user = null;
      state.isAuth = false;
      localStorage.removeItem("persist:root");
    },
  },
});

export const { setUserToken, setUser, logout, setIsAuth } = userSlice.actions;

export const { reducer: userSliceReducer } = userSlice;
