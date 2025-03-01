import styles from "../../css/workouts/TodaysWorkouts.module.scss";
import sprite from "../../assets/icons/main.svg";
import { Workout } from "../../features/workouts/types";
import { Card, CardHeader, CardIcon, CardTitles } from "../layout/Card";

type Props = {
	workouts: Workout[];
};

const NoWorkoutsFound = () => {
	return (
		<div className={styles.NoWorkoutsFound}>
			<svg className={styles.NoWorkoutsFound_icon}>
				<use xlinkHref={`${sprite}#icon-empty-box-2`}></use>
			</svg>
			<div className={styles.NoWorkoutsFound_title}>No workouts found.</div>
		</div>
	);
};

const showCard = false;

const TodaysWorkouts = ({ workouts = [] }: Props) => {
	if (!showCard) {
		return (
			<div className={styles.TodaysWorkouts}>
				{(!workouts || !workouts.length) && <NoWorkoutsFound />}
				{/*  */}
				{/*  */}
			</div>
		);
	}
	return (
		<Card>
			<CardHeader>
				<CardIcon icon="exercise" color="var(--accent-purple)" />
				<CardTitles title="Scheduled" />
			</CardHeader>
			<div className={styles.TodaysWorkouts}>
				{(!workouts || !workouts.length) && <NoWorkoutsFound />}
				{/*  */}
				{/*  */}
			</div>
		</Card>
	);
};

export default TodaysWorkouts;
