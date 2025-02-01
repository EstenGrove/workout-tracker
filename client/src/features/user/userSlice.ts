import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TStatus } from "../types";
import { CurrentSession, CurrentUser } from "./types";
import { RootState } from "../../store/store";

export interface CurrentUserSlice {
	status: TStatus;
	currentUser: CurrentUser | null;
	currentSession: CurrentSession | null;
}

const initialState: CurrentUserSlice = {
	status: "IDLE",
	currentUser: null,
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

export const { resetUserState } = userSlice.actions;

export default userSlice.reducer;
