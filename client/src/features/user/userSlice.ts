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
	userID: "4f515e66-ec64-447e-8d26-79f8ad83c5a3",
	username: "EstenGrove",
	password: "Tripper99",
	firstName: "Steven",
	lastName: "Gore",
	userAvatar: null,
	isActive: true,
	createdDate: "2025-02-02 08:25:22.769558",
	lastLoginDate: null,
	token: "640d912e-693c-4d35-ad3a-5f89d176d379",
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
