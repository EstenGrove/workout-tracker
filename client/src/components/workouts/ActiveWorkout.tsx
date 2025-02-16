import styles from "../../css/workouts/ActiveWorkout.module.scss";
import sprite from "../../assets/icons/main.svg";
import { EndedWorkoutDetails, Workout } from "../../features/workouts/types";
import { CurrentUser } from "../../features/user/types";
import { ActiveTimer } from "../../hooks/useWorkoutTimer";
import { useState } from "react";
import { formatTime } from "../../utils/utils_dates";
import { getTotalTime } from "../../utils/utils_workouts";
import WorkoutTimer from "./WorkoutTimer";

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

const ActiveWorkout = ({ workout, currentUser }: Props) => {
	const [workoutDetails, setWorkoutDetails] =
		useState<EndedWorkoutDetails | null>(null);
	const [hasEnded, setHasEnded] = useState<boolean>(false);

	const onStart = () => {
		// fire off request w/ data
	};

	const onPause = () => {
		// fire off request w/ data
	};

	const onEnd = (details: EndedWorkoutDetails) => {
		// fire off request w/ data
		setHasEnded(true);
		setWorkoutDetails(details);
	};

	return (
		<div className={styles.ActiveWorkout}>
			{!hasEnded && (
				<WorkoutTimer
					title="Strength (20 mins)"
					onStart={onStart}
					onPause={onPause}
					onEnd={onEnd}
				/>
			)}
			{hasEnded && workoutDetails && (
				<WorkoutDetails
					heading="Strength (20 mins)"
					info={workoutDetails.info}
				/>
			)}
			{/*  */}
			{/*  */}
		</div>
	);
};

export default ActiveWorkout;
