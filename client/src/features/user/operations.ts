import { createAsyncThunk } from "@reduxjs/toolkit";
import {
	fetchUserByID,
	fetchUserByLogin,
	UserResponse,
} from "../../utils/utils_user";
import { AwaitedResponse } from "../types";

interface LoginParams {
	username: string;
	password: string;
}

const getUserByLogin = createAsyncThunk(
	"user/getUserByLogin",
	async (params: LoginParams) => {
		const response = (await fetchUserByLogin(
			params.username,
			params.password
		)) as AwaitedResponse<UserResponse>;

		const data = response.Data;

		return data as UserResponse;
	}
);

const getUserByID = createAsyncThunk(
	"user/getUserByID",
	async (userID: string) => {
		const response = (await fetchUserByID(
			userID
		)) as AwaitedResponse<UserResponse>;
		const data = response.Data;

		return data as UserResponse;
	}
);

export { getUserByLogin, getUserByID };
