import { useTimer } from "./useTimer";
import { LocalStorage } from "../utils/utils_storage";
import { formatDateTime } from "../utils/utils_dates";
import { useState } from "react";

const storage = new LocalStorage();
const WORKOUT_KEY = "ACTIVE-WORKOUT";

const getCacheAndTime = (key: string) => {
	const cache = storage.get(key);
	const time = formatDateTime(new Date(), "longMs");

	return {
		cache,
		time,
	};
};

export type TimerStatus = "ACTIVE" | "PAUSED" | "STOPPED" | "IDLE" | "ENDED";

export enum TimerStatusKey {
	IDLE = "IDLE",
	ACTIVE = "ACTIVE",
	PAUSED = "PAUSED",
	STOPPED = "STOPPED",
	ENDED = "ENDED",
}

export interface ActiveTimer {
	startedAt: Date | string | null;
	pausedAt: Date | string | null;
	resumedAt: Date | string | null;
	stoppedAt: Date | string | null;
}

const useWorkoutTimer = (key: string = WORKOUT_KEY) => {
	const timer = useTimer();
	const [status, setStatus] = useState<TimerStatus>("IDLE");
	const [timeInfo, setTimeInfo] = useState<ActiveTimer>({
		startedAt: null,
		pausedAt: null,
		resumedAt: null,
		stoppedAt: null,
	});

	const start = () => {
		const { cache, time } = getCacheAndTime(key);
		const newInfo: ActiveTimer = { ...cache, startedAt: time };

		storage.set(key, newInfo);
		timer.start();
		setTimeInfo(newInfo);
		setStatus(TimerStatusKey.ACTIVE);
	};

	const pause = () => {
		const { cache, time } = getCacheAndTime(key);
		const newInfo: ActiveTimer = { ...cache, pausedAt: time };

		storage.set(key, newInfo);
		timer.pause();
		setTimeInfo(newInfo);
		setStatus(TimerStatusKey.PAUSED);
	};

	const resume = () => {
		const { cache, time } = getCacheAndTime(key);
		const newInfo: ActiveTimer = { ...cache, resumedAt: time };

		timer.resume();
		setTimeInfo(newInfo);
		setStatus(TimerStatusKey.ACTIVE);
	};

	const stop = () => {
		const { cache, time } = getCacheAndTime(key);
		const newInfo: ActiveTimer = { ...cache, stoppedAt: time };

		storage.set(key, newInfo);
		timer.stop();
		setTimeInfo(newInfo);
		setStatus(TimerStatusKey.STOPPED);
	};

	const reset = () => {
		timer.reset();
		setStatus(TimerStatusKey.IDLE);
		setTimeInfo({
			startedAt: null,
			pausedAt: null,
			stoppedAt: null,
			resumedAt: null,
		});
	};

	return {
		info: timeInfo,
		status: status,
		time: timer.time,
		start: start,
		pause: pause,
		resume: resume,
		stop: stop,
		reset: reset,
	};
};

export { useWorkoutTimer };
