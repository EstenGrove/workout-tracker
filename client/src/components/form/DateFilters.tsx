import styles from "../../css/form/DateFilters.module.scss";
import { REPEAT_TYPES } from "../../utils/utils_recurring";

type Props = {
	selectedPreset: string;
	selectedRange: string;
	onPresetSelect: (preset: string) => void;
	onRangeSelect: (value: string) => void;
};

const defaultFilters = {
	presets: [
		"Today",
		"Yesterday",
		"This Week",
		"This Month",
		"Last Week",
		"Last Month",
	],
	filters: [
		...REPEAT_TYPES.filter((x) => x !== "Never"),
		// "By Date",
		// "By Week",
		// "By Month",
		// "By Quarter",
		// "By Year",
		// "Custom",
	],
};

type BtnProps = {
	isSelected: boolean;
	onSelect: () => void;
	filterName: string;
};

const FilterButton = ({
	isSelected = false,
	onSelect,
	filterName,
}: BtnProps) => {
	return (
		<button
			type="button"
			onClick={onSelect}
			className={`${styles.FilterButton} ${isSelected && styles.isSelected}`}
		>
			{filterName}
		</button>
	);
};

const DateFilters = ({
	onRangeSelect,
	onPresetSelect,
	selectedRange,
	selectedPreset,
}: Props) => {
	return (
		<div className={styles.DateFilters}>
			<div className={styles.DateFilters_label}>Presets</div>
			<div className={styles.DateFilters_presets}>
				{defaultFilters.presets.map((preset, idx) => (
					<FilterButton
						key={preset + idx}
						filterName={preset}
						isSelected={selectedPreset === preset}
						onSelect={() => onPresetSelect(preset)}
					/>
				))}
			</div>
			<div className={styles.DateFilters_label}>Filter By</div>
			<div className={styles.DateFilters_filters}>
				{defaultFilters.filters.map((filter, idx) => (
					<FilterButton
						key={filter + idx}
						filterName={filter}
						isSelected={selectedRange === filter}
						onSelect={() => onRangeSelect(filter)}
					/>
				))}
			</div>
		</div>
	);
};

export default DateFilters;
