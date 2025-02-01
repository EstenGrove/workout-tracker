import { useMemo } from "react";
import styles from "../../css/dashboard/RecentWorkouts.module.scss";
import { RecentWorkout as IRecentWorkout } from "../../features/dashboard/types";
import RecentWorkout from "./RecentWorkout";

type Props = {
	recentWorkouts: IRecentWorkout[];
	viewWorkout: (workout: IRecentWorkout) => void;
};

const fake: IRecentWorkout[] = [
	{
		workoutID: 1,
		workoutDate: "2025-01-28T20:36:00.000Z",
		workoutLength: 32,
		activityType: "Strength",
	},
	{
		workoutID: 2,
		workoutDate: "2025-01-27T16:14:00.000Z",
		workoutLength: 8,
		activityType: "Stretch",
	},
	{
		workoutID: 3,
		workoutDate: "2025-02-01T14:39:00.000Z",
		workoutLength: 117,
		activityType: "Walk",
	},
	{
		workoutID: 4,
		workoutDate: "2025-01-30T18:22:00.000Z",
		workoutLength: 42,
		activityType: "Walk",
	},
];

const LIMIT = 5;

const RecentWorkouts = ({ recentWorkouts = fake, viewWorkout }: Props) => {
	const limitedList = useMemo(() => {
		if (!recentWorkouts || !recentWorkouts.length) return [];

		return recentWorkouts.slice(0, LIMIT);
	}, [recentWorkouts]);
	const totalCount = recentWorkouts.length || 0;
	const limitCount = limitedList.length || 0;

	return (
		<div className={styles.RecentWorkouts}>
			<div className={styles.RecentWorkouts_header}>
				<h4>Recent Workouts </h4>
				<i>
					{limitCount}/{totalCount}
				</i>
			</div>
			<ul className={styles.RecentWorkouts_list}>
				{recentWorkouts &&
					recentWorkouts.map((workout) => (
						<RecentWorkout
							key={workout.workoutID}
							recentWorkout={workout}
							selectWorkout={() => viewWorkout(workout)}
						/>
					))}
			</ul>
		</div>
	);
};

export default RecentWorkouts;
