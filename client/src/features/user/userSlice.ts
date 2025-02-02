import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TStatus } from "../types";
import { CurrentSession, CurrentUser } from "./types";
import { RootState } from "../../store/store";
import { getUserByLogin, getUserByID } from "./operations";
import { UserResponse } from "../../utils/utils_user";

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
	extraReducers(builder) {
		// Get user by login creds
		builder
			.addCase(getUserByLogin.pending, (state: CurrentUserSlice) => {
				state.status = "PENDING";
			})
			.addCase(
				getUserByLogin.fulfilled,
				(state: CurrentUserSlice, action: PayloadAction<UserResponse>) => {
					state.status = "FULFILLED";
					state.currentUser = action.payload.user;
					state.currentSession = action.payload.session;
				}
			);
		// Get user by ID
		builder
			.addCase(getUserByID.pending, (state: CurrentUserSlice) => {
				state.status = "PENDING";
			})
			.addCase(
				getUserByID.fulfilled,
				(state: CurrentUserSlice, action: PayloadAction<UserResponse>) => {
					state.status = "FULFILLED";
					state.currentUser = action.payload.user;
					state.currentSession = action.payload.session;
				}
			);
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
