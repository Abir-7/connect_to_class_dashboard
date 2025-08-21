import { TUserRoles } from "@/interface/authinterface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: {
    token: string;
    role: TUserRoles;
    email: string;
    id: string;
  } | null;
  userProfile: {
    fullName: string;
    mobile: string;
    image: string;
  } | null;

  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  userProfile: null,
  isLoading: true,
};

export const authSlice = createSlice({
  name: "authState",
  initialState,
  reducers: {
    addAuthData: (state, action: PayloadAction<AuthState>) => {
      state.user = action.payload.user;
      state.userProfile = action.payload.userProfile;
      state.isLoading = false;
    },
    updateAuthProfile: (state, action: PayloadAction<AuthState>) => {
      state.userProfile = action.payload.userProfile;
      state.isLoading = false;
    },
    removeAuth: (state) => {
      state.user = null;
      state.userProfile = null;
      state.isLoading = false;
    },
    setAuthLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export const { addAuthData, removeAuth, updateAuthProfile, setAuthLoading } =
  authSlice.actions;

export default authSlice.reducer;
