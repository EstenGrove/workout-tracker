import { DashboardSummary } from "../features/dashboard/types";
import { AsyncResponse } from "../features/types";
import { apiEndpoints, currentEnv } from "./utils_env";

export type DashboardSummaryResp = AsyncResponse<DashboardSummary>;

const fetchDashboardSummaryForDate = async (
	userID: string,
	targetDate: string
): DashboardSummaryResp => {
	let url = currentEnv.base + apiEndpoints.dashboard.getSummary;
	url += "?" + new URLSearchParams({ userID, targetDate });

	try {
		const request = await fetch(url);
		const response = await request.json();
		return response;
	} catch (error) {
		return error;
	}
};

export { fetchDashboardSummaryForDate };
