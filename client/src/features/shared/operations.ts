import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSharedAppData, SharedAppData } from "../../utils/utils_shared";
import { AwaitedResponse } from "../types";

const getSharedAppData = createAsyncThunk(
	"shared/getSharedAppData",
	async (userID: string) => {
		const response = (await fetchSharedAppData(
			userID
		)) as AwaitedResponse<SharedAppData>;
		const data = response.Data;

		console.log("data", data);

		return data as SharedAppData;
	}
);

export { getSharedAppData };
