import { useMemo } from "react";
import styles from "../../css/dashboard/RecentWorkouts.module.scss";
import { RecentWorkout as IRecentWorkout } from "../../features/dashboard/types";
import RecentWorkout from "./RecentWorkout";
import { NavLink } from "react-router";

type Props = {
	recentWorkouts: IRecentWorkout[];
	viewWorkout: (workout: IRecentWorkout) => void;
};

const LIMIT = 4;

const RecentWorkouts = ({ recentWorkouts = [], viewWorkout }: Props) => {
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
				<NavLink to="history?preset=this-week">Show All</NavLink>
			</div>
			<ul className={styles.RecentWorkouts_list}>
				{limitedList &&
					limitedList.map((workout) => (
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
