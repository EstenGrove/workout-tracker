import { useCallback, useEffect, useState } from "react";
import {
	Medication,
	MedicationSchedule,
	MedLogEntry,
} from "../features/meds/types";
import { useAppDispatch } from "../store/store";
import { fetchMedDetails } from "../utils/utils_meds";
import { AwaitedResponse } from "../features/types";

export interface MedDetails {
	med: Medication;
	logs: MedLogEntry[];
	schedules: {
		active: MedicationSchedule;
		all: MedicationSchedule[];
	};
}

interface DetailsParams {
	userID: string;
	medID: number;
}

interface HookParams extends DetailsParams {
	onSuccess?: (details: MedDetails) => void;
	onError?: (err: Error) => void;
}

const useMedDetails = (params: HookParams) => {
	const { userID, medID, onSuccess, onError } = params;
	const [details, setDetails] = useState<MedDetails | null>(null);

	const getDetails = useCallback(() => {
		const getData = async (userID: string, medID: number) => {
			const response = (await fetchMedDetails(
				userID,
				medID
			)) as AwaitedResponse<MedDetails>;
			const data = response.Data;

			if (response instanceof Error) {
				return onError && onError(response);
			} else {
				setDetails(data as MedDetails);
				return onSuccess && onSuccess(data as MedDetails);
			}
		};
		if (userID && medID) {
			getData(userID, medID);
		}
	}, [medID, onError, onSuccess, userID]);

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}
		getDetails();

		return () => {
			isMounted = false;
		};
	}, [getDetails]);

	return details;
};

export { useMedDetails };
