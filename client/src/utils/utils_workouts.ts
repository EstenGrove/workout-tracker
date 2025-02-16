import { formatDistance } from "date-fns";
import { ActiveTimer, TimerStatus } from "../hooks/useWorkoutTimer";

const isWorkoutInProgress = (status: TimerStatus, info: ActiveTimer) => {
	const hasActiveStatus = ["ACTIVE", "PAUSED", "IDLE"].includes(status);
	const { startedAt, stoppedAt } = info;

	const inProgress = hasActiveStatus && !!startedAt && !stoppedAt;

	return inProgress;
};

const getTotalTime = (info: ActiveTimer) => {
	const start = info.startedAt;
	const end = info.stoppedAt;
	const startDate = new Date(start as string);
	const endDate = new Date(end as string);

	const distance = formatDistance(endDate, startDate);
	return distance;
};

export { getTotalTime, isWorkoutInProgress };
