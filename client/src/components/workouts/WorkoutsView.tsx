import { useMemo, useState } from "react";
import { CurrentUser } from "../../features/user/types";
import { UserWorkout, WorkoutCategory } from "../../features/workouts/types";
import styles from "../../css/workouts/WorkoutsView.module.scss";
import WorkoutsList from "./WorkoutsList";
import WorkoutFilters from "./WorkoutFilters";

type Props = {
	categories: WorkoutCategory[];
	workouts: UserWorkout[];
	currentUser: CurrentUser;
};

const filterWorkouts = (
	selectedFilters: string[],
	workouts: UserWorkout[]
): UserWorkout[] => {
	const hasNoFilters = !selectedFilters || selectedFilters?.length <= 0;
	if (hasNoFilters) {
		return workouts;
	} else {
		const filtered = [...workouts].filter((entry) => {
			return selectedFilters.includes(entry.categoryName);
		});
		return filtered;
	}
};

// ##TODOS:
// - Fix grouping or workouts by filter type
// - Fix UI design of workouts page??? NOT SURE HOW YET!!!

const WorkoutsView = ({ categories, workouts, currentUser }: Props) => {
	const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
	const showAll = useMemo(() => {
		const allSelected = selectedFilters.length === categories.length;
		const isEmpty = !selectedFilters.length || selectedFilters.length <= 0;

		return isEmpty || allSelected;
	}, [categories.length, selectedFilters.length]);
	const filteredWorkouts = useMemo(() => {
		return filterWorkouts(selectedFilters, workouts);
	}, [selectedFilters, workouts]);

	const selectFilter = (filter: WorkoutCategory) => {
		if (filter.categoryName === "All") {
			return setSelectedFilters([]);
		}

		if (selectedFilters.includes(filter.categoryName)) {
			setSelectedFilters((prev) => [
				...prev.filter((x) => x !== filter.categoryName),
			]);
		} else {
			setSelectedFilters((prev) => [...prev, filter.categoryName]);
		}
	};

	console.log("currentUser", currentUser);

	return (
		<div className={styles.WorkoutsView}>
			<div className={styles.WorkoutsView_filters}>
				<WorkoutFilters
					filters={categories}
					selectFilter={selectFilter}
					selectedFilters={selectedFilters}
					showAllFilters={showAll}
				/>
			</div>
			<div className={styles.WorkoutsView_workouts}>
				<WorkoutsList workouts={filteredWorkouts} />
			</div>
		</div>
	);
};

export default WorkoutsView;
