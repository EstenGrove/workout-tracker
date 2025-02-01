import { createSlice } from "@reduxjs/toolkit";
import { TStatus } from "../types";
import { CurrentSession, CurrentUser } from "./types";
import { RootState } from "../../store/store";

export interface CurrentUserSlice {
	status: TStatus;
	currentUser: CurrentUser | null;
	currentSession: CurrentSession | null;
}

const fakeUser: CurrentUser = {
	userID: "e8sld-81k34-lKdjhr",
	username: "EstenGrove",
	password: "1234",
	firstName: "Esten",
	lastName: "Grove",
	userAvatar: null,
	isActive: true,
	createdDate: new Date().toISOString(),
	lastLoginDate: new Date().toISOString(),
	token: "token",
};

const initialState: CurrentUserSlice = {
	status: "IDLE",
	currentUser: fakeUser,
	currentSession: null,
};

const userSlice = createSlice({
	name: "user",
	initialState: initialState,
	reducers: {
		resetUserState() {
			return initialState;
		},
	},
});

export const selectCurrentUser = (state: RootState): CurrentUser => {
	return state.user.currentUser as CurrentUser;
};
export const selectCurrentSession = (state: RootState): CurrentSession => {
	return state.user.currentSession as CurrentSession;
};

export const { resetUserState } = userSlice.actions;

export default userSlice.reducer;
