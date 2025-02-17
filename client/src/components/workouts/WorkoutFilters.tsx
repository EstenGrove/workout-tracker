import styles from "../../css/workouts/WorkoutFilters.module.scss";
import { WorkoutCategory } from "../../features/workouts/types";

type Props = {
	filters: Array<WorkoutCategory>;
	selectFilter: (filter: WorkoutCategory) => void;
	selectedFilters: string[];
	showAllFilters: boolean;
};

type FilterProps = {
	name: string;
	isSelected: boolean;
	onClick: () => void;
};

const CategoryFilter = ({ name, onClick, isSelected }: FilterProps) => {
	const css = isSelected
		? `${styles.CategoryFilter} ${styles.isSelected}`
		: styles.CategoryFilter;
	return (
		<button type="button" onClick={onClick} className={css}>
			{name}
		</button>
	);
};
const AllFilter = ({
	onClick,
	isSelected,
}: Pick<FilterProps, "isSelected" | "onClick">) => {
	const css = isSelected
		? `${styles.AllFilter} ${styles.isSelected}`
		: styles.AllFilter;
	return (
		<button type="button" onClick={onClick} className={css}>
			All
		</button>
	);
};

const WorkoutFilters = ({
	filters,
	selectFilter,
	selectedFilters = ["All", "Legs"],
	showAllFilters = true,
}: Props) => {
	const allFilter = filters.find(
		(x) => x.categoryName === "All"
	) as WorkoutCategory;
	const withoutAll = filters.filter((x) => x.categoryName !== "All");

	return (
		<div className={styles.WorkoutFilters}>
			<div className={styles.WorkoutFilters_count}>
				{selectedFilters.length || 0} / {filters.length}
			</div>
			<div className={styles.WorkoutFilters_list}>
				<AllFilter
					onClick={() => selectFilter(allFilter)}
					isSelected={showAllFilters}
				/>
				{withoutAll &&
					withoutAll.map((filter, idx) => (
						<CategoryFilter
							key={filter.categoryID + "-" + idx}
							name={filter.categoryName}
							onClick={() => selectFilter(filter)}
							isSelected={selectedFilters.includes(filter.categoryName)}
						/>
					))}
			</div>
			{/*  */}
			{/*  */}
		</div>
	);
};

export default WorkoutFilters;
