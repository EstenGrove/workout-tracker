import styles from "../css/pages/HistoryPage.module.scss";
import { useSelector } from "react-redux";
import { useCallback, useState, useEffect } from "react";
import {
	CustomRange,
	CustomRangeType,
	formatDate,
	getDateRangeFromPreset,
	RangePreset,
} from "../utils/utils_dates";
import { selectCurrentUser } from "../features/user/userSlice";
import { useAppDispatch } from "../store/store";
import { getHistoryByRange } from "../features/history/operations";
import {
	selectHistoryLogs,
	selectIsLoadingHistory,
} from "../features/history/historySlice";
import { selectHistorySettings } from "../features/settings/settingsSlice";
import Loader from "../components/layout/Loader";
import LogWorkout from "../components/workouts/LogWorkout";
import WorkoutHistoryHeader from "../components/history/WorkoutHistoryHeader";
import WorkoutHistoryList from "../components/history/WorkoutHistoryList";
import WorkoutHistoryRangeHeader from "../components/history/WorkoutHistoryRangeHeader";
import { getUserWorkouts } from "../features/workouts/operations";
import { useQueryParams } from "../hooks/useQueryParams";

const getInitialPreset = (params: URLSearchParams): RangePreset => {
	const presetKey = params.get("preset");
	const preset = presetsMap[presetKey as keyof object];

	return preset || "Today";
};

const presetsMap = {
	today: "Today",
	yesterday: "Yesterday",
	"this-week": "This Week",
	"last-week": "Last Week",
	"this-month": "This Month",
};

const HistoryPage = () => {
	const dispatch = useAppDispatch();
	const { params } = useQueryParams();
	const initialPreset = getInitialPreset(params);
	const baseDate = formatDate(new Date(), "long");
	const currentUser = useSelector(selectCurrentUser);
	const settings = useSelector(selectHistorySettings);
	const workoutHistory = useSelector(selectHistoryLogs);
	const isLoadingLogs = useSelector(selectIsLoadingHistory);
	const [showLogWorkoutModal, setShowLogWorkoutModal] =
		useState<boolean>(false);
	const [customRange, setCustomRange] = useState<CustomRange>({
		type: "None",
		startDate: formatDate(new Date(), "long"),
		endDate: formatDate(new Date(), "long"),
	});
	const [rangePreset, setSelectedPreset] = useState<RangePreset>(initialPreset);

	// Select's a range preset (eg. 'Today', 'Last Week' etc)
	const onSelectPreset = (preset: RangePreset) => {
		setSelectedPreset(preset);
	};

	// Supports 'Weekly' UI AND custom range types
	const onSelectCustom = (
		name: string,
		value: CustomRangeType | Date | string
	) => {
		if (settings.useHistoryType === "Weekly") {
			setCustomRange({
				...customRange,
				type: "Daily",
				[name]: value,
			});
		} else {
			setCustomRange({
				...customRange,
				[name]: value,
			});
		}
	};

	const openLogWorkoutModal = () => {
		setShowLogWorkoutModal(true);
	};
	const closeLogWorkoutModal = () => {
		setShowLogWorkoutModal(false);
	};

	const getHistoryData = useCallback(() => {
		const { userID } = currentUser;
		const { startDate, endDate } = getDateRangeFromPreset(
			rangePreset as RangePreset
		);
		const params = {
			userID,
			startDate: formatDate(startDate, "db"),
			endDate: formatDate(endDate, "db"),
		};

		dispatch(getHistoryByRange(params));
	}, [currentUser, dispatch, rangePreset]);

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) return;
		const { startDate, endDate } = getDateRangeFromPreset(rangePreset);
		if (startDate && endDate) {
			getHistoryData();
		}

		return () => {
			isMounted = false;
		};
	}, [getHistoryData, rangePreset]);

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) return;

		if (currentUser.userID) {
			dispatch(getUserWorkouts(currentUser.userID));
		}

		return () => {
			isMounted = false;
		};
	}, [currentUser.userID, dispatch]);

	return (
		<div className={styles.HistoryPage}>
			{/* WEEKLY NAV */}
			{settings.useHistoryType === "Weekly" && (
				<div className={styles.HistoryPage_header}>
					<WorkoutHistoryHeader
						baseDate={baseDate}
						selectedDate={customRange.startDate}
						openLogModal={openLogWorkoutModal}
						onSelect={onSelectCustom}
					/>
				</div>
			)}
			{/* RANGE TYPES (Presets) */}
			{settings.useHistoryType === "Range" && (
				<div className={styles.HistoryPage_header}>
					<WorkoutHistoryRangeHeader
						openLogModal={openLogWorkoutModal}
						selectedPreset={rangePreset}
						onSelectPreset={onSelectPreset}
					/>
				</div>
			)}

			<div className={styles.HistoryPage_main}>
				{isLoadingLogs && <Loader>Loading...</Loader>}
				{workoutHistory && <WorkoutHistoryList entries={workoutHistory} />}
			</div>

			{/* Log Workout Modal */}
			{showLogWorkoutModal && (
				<LogWorkout currentUser={currentUser} onClose={closeLogWorkoutModal} />
			)}
		</div>
	);
};

export default HistoryPage;
