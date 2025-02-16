import styles from "../../css/workouts/WorkoutTimer.module.scss";
import sprite from "../../assets/icons/main.svg";
import {
	ActiveTimer,
	TimerStatus,
	useWorkoutTimer,
} from "../../hooks/useWorkoutTimer";
import { formatTime } from "../../utils/utils_dates";
import { addEllipsis } from "../../utils/utils_misc";
import { EndedWorkoutDetails } from "../../features/workouts/types";

type Props = {
	title: string;
	onStart: () => void;
	onPause: () => void;
	onEnd: (details: EndedWorkoutDetails) => void;
	onResume?: () => void;
	onReset?: () => void;
};

type DisplayProps = {
	startedAt: Date | string | null;
	time: string;
};

const getStartedAt = (startedAt: ActiveTimer["startedAt"]): string => {
	if (!startedAt) {
		return "";
	} else {
		const startTime = formatTime(startedAt, "short");
		return "Start: " + startTime;
	}
};

const TimerDisplay = ({ startedAt, time }: DisplayProps) => {
	const startTime = getStartedAt(startedAt);
	return (
		<div className={styles.TimerDisplay}>
			<h3 className={styles.TimerDisplay_time}>{time}</h3>
			<div className={styles.TimerDisplay_startedAt}>{startTime}</div>
		</div>
	);
};

type ControlsProps = {
	status: TimerStatus;
	start: () => void;
	pause: () => void;
	resume: () => void;
	stop: () => void;
	reset: () => void;
};

type BtnProps = {
	status: TimerStatus;
	onClick: () => void;
};

const PauseButton = ({ status, onClick }: BtnProps) => {
	const isDisabled = status === "PAUSED";
	return (
		<button
			type="button"
			onClick={onClick}
			disabled={isDisabled}
			className={styles.PauseButton}
		>
			<svg className={styles.PauseButton_icon}>
				<use xlinkHref={`${sprite}#icon-pause`}></use>
			</svg>
		</button>
	);
};
const StartButton = ({ status, onClick }: BtnProps) => {
	const isDisabled = status === "PAUSED";
	return (
		<button
			type="button"
			onClick={onClick}
			disabled={isDisabled}
			className={styles.StartButton}
		>
			<span>Start</span>
		</button>
	);
};
const EndButton = ({ status, onClick }: BtnProps) => {
	const isDisabled = status === "PAUSED";
	return (
		<button
			type="button"
			onClick={onClick}
			disabled={isDisabled}
			className={styles.EndButton}
		>
			<span>End Workout</span>
		</button>
	);
};
const ResumeButton = ({ status, onClick }: BtnProps) => {
	const isDisabled = status === "ACTIVE";
	return (
		<button
			type="button"
			onClick={onClick}
			disabled={isDisabled}
			className={styles.ResumeButton}
		>
			<span>Resume</span>
		</button>
	);
};

const TimerControls = ({
	status,
	start,
	pause,
	resume,
	stop,
}: ControlsProps) => {
	const isIdle = status === "IDLE";
	const isActive = status === "ACTIVE";
	const isPaused = status === "PAUSED";
	const isEnded = status === "STOPPED";
	const isInProgress = ["ACTIVE", "PAUSED", "IDLE"].includes(status);

	return (
		<div className={styles.TimerControls}>
			{isInProgress && (
				<>
					{!isEnded && isActive && (
						<PauseButton status={status} onClick={pause} />
					)}
					{isIdle && <StartButton status={status} onClick={start} />}
					{isActive && <EndButton status={status} onClick={stop} />}
					{isPaused && <ResumeButton status={status} onClick={resume} />}
				</>
			)}
		</div>
	);
};

const WorkoutTimer = ({
	title,
	onStart,
	onPause,
	onEnd,
	onResume,
	onReset,
}: Props) => {
	const heading = addEllipsis(title, 20);
	const workoutTimer = useWorkoutTimer();
	const { info, time, status } = workoutTimer;

	const start = () => {
		workoutTimer.start();

		return onStart && onStart();
	};
	const pause = () => {
		workoutTimer.pause();

		return onPause && onPause();
	};
	const resume = () => {
		workoutTimer.resume();

		return onResume && onResume();
	};
	const stop = () => {
		const endedDetails: EndedWorkoutDetails = { info, time };
		workoutTimer.stop();
		return onEnd && onEnd(endedDetails);
	};
	const reset = () => {
		workoutTimer.reset();

		return onReset && onReset();
	};

	return (
		<div className={styles.WorkoutTimer}>
			<TimerDisplay time={time} startedAt={info.startedAt} />
			<div className={styles.WorkoutTimer_title}>{heading}</div>
			<div className={styles.WorkoutTimer_controls}>
				<TimerControls
					status={status}
					start={start}
					stop={stop}
					pause={pause}
					resume={resume}
					reset={reset}
				/>
			</div>
		</div>
	);
};

export default WorkoutTimer;
