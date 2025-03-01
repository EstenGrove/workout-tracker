import { useEffect } from "react";
import { useParams } from "react-router";
import NavArrows from "../components/layout/NavArrows";
import PageContainer from "../components/layout/PageContainer";
import styles from "../css/pages/WorkoutDetailsPage.module.scss";

const WorkoutDetailsPage = () => {
	const { id } = useParams();
	const workoutID: number = Number(id);
	console.log("workoutID", workoutID);

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}

		//
		//
		//

		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<PageContainer>
			<div className={styles.WorkoutDetailsPage}>
				<NavArrows />
				<h1>Workout Details</h1>
				{/*  */}
				{/*  */}
			</div>
		</PageContainer>
	);
};

export default WorkoutDetailsPage;
