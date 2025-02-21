import styles from "../../css/workouts/ActiveWorkout.module.scss";
import sprite from "../../assets/icons/main.svg";
import { EndedWorkoutDetails, Workout } from "../../features/workouts/types";
import { CurrentUser } from "../../features/user/types";
import { ActiveTimer } from "../../hooks/useWorkoutTimer";
import { useState } from "react";
import { formatTime } from "../../utils/utils_dates";
import { getTotalTime } from "../../utils/utils_workouts";
import WorkoutTimer from "./WorkoutTimer";
import { useParams } from "react-router";

type Props = {
	workout: Workout;
	currentUser: CurrentUser;
};

type DetailsProps = {
	heading: string;
	info: ActiveTimer;
};

const WorkoutDetails = ({ heading, info }: DetailsProps) => {
	const { startedAt, stoppedAt } = info;
	const started = formatTime(startedAt as string, "shortMs");
	const ended = formatTime(stoppedAt as string, "shortMs");
	const totalTime = getTotalTime(info);

	return (
		<div className={styles.WorkoutDetails}>
			<EndedWorkout totalTime={totalTime} />
			<div className={styles.WorkoutDetails_heading}>{heading}</div>
			<div className={styles.WorkoutDetails_when}>
				<span>{started}</span> - <span>{ended}</span>
			</div>
		</div>
	);
};

type EndedWorkoutProps = {
	totalTime: string;
};

const EndedWorkout = ({ totalTime }: EndedWorkoutProps) => {
	return (
		<div className={styles.EndedWorkout}>
			<svg className={styles.EndedWorkout_icon}>
				<use xlinkHref={`${sprite}#icon-checked-2`}></use>
			</svg>
			<div className={styles.EndedWorkout_title}>Workout Has Ended</div>
			<div className={styles.EndedWorkout_info}>
				You worked out for {totalTime}
			</div>
		</div>
	);
};

const ResetButton = ({ onClick }: { onClick: () => void }) => {
	return (
		<button type="button" onClick={onClick} className={styles.ResetButton}>
			<svg className={styles.ResetButton_icon}>
				<use xlinkHref={`${sprite}#icon-time-machine`}></use>
			</svg>
			<span>Reset</span>
		</button>
	);
};

const ActiveWorkout = ({ workout, currentUser }: Props) => {
	const [workoutDetails, setWorkoutDetails] =
		useState<EndedWorkoutDetails | null>(null);
	const [hasEnded, setHasEnded] = useState<boolean>(false);
	const { id } = useParams();
	const workoutID: number = Number(id);

	const onStart = () => {
		// fire off request w/ data
		console.log("workoutID", workoutID);
	};

	const onPause = () => {
		// fire off request w/ data
	};

	const onEnd = (details: EndedWorkoutDetails) => {
		// fire off request w/ data
		setHasEnded(true);
		setWorkoutDetails(details);
		console.log("FINISHED: ", workoutID);
	};

	const onReset = () => {
		setHasEnded(false);
		setWorkoutDetails(null);
	};

	return (
		<div className={styles.ActiveWorkout}>
			{!hasEnded && (
				<WorkoutTimer
					title="Strength (20 mins)"
					onStart={onStart}
					onPause={onPause}
					onEnd={onEnd}
					onReset={onReset}
				/>
			)}
			{hasEnded && workoutDetails && (
				<WorkoutDetails
					heading="Strength (20 mins)"
					info={workoutDetails.info}
				/>
			)}
			{hasEnded && (
				<div className={styles.ActiveWorkout_row}>
					<ResetButton onClick={onReset} />
				</div>
			)}
		</div>
	);
};

export default ActiveWorkout;
