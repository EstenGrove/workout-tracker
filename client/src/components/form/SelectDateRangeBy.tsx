import { useState } from "react";
import styles from "../../css/form/SelectDateRangeBy.module.scss";
import DatePicker from "../shared/DatePicker";
import Checkbox from "../shared/Checkbox";

type DateRangeType =
	| "Day"
	| "Week"
	| "Month"
	| "Year"
	| "Quarter"
	| "Custom"
	| "None";

type Props = {
	rangeOptions: DateRangeType[];
};

const defaultRangeBy: DateRangeType[] = [
	"Day",
	"Month",
	"Quarter",
	"Year",
	"Custom",
	"None",
];

type RangeTypeProps = {
	type: DateRangeType;
	onSelect: () => void;
	isSelected: boolean;
};

const RangeType = ({ type, onSelect, isSelected = false }: RangeTypeProps) => {
	const css = {
		backgroundColor: isSelected ? "rgba(0, 124, 255, 0.1)" : "initial",
		color: isSelected ? "var(--accent-blue)" : "#fff",
		border: isSelected
			? "1px solid var(--accent-blue)"
			: "1px solid var(--blueGrey800)",
	};
	return (
		<button
			type="button"
			onClick={onSelect}
			className={styles.RangeType}
			style={css}
		>
			{type}
		</button>
	);
};

const SelectDateRangeBy = ({ rangeOptions = defaultRangeBy }: Props) => {
	const [rangeBy, setRangeBy] = useState<DateRangeType>("None");
	const [isChecked, setIsChecked] = useState(false);

	const onChange = (name, value) => {
		setIsChecked(value);
	};

	const selectRangeType = (type: DateRangeType) => {
		setRangeBy(type);
	};

	return (
		<div className={styles.SelectDateRangeBy}>
			<div className={styles.SelectDateRangeBy_label}>
				Select date range type
			</div>

			<div className={styles.SelectDateRangeBy_types}>
				{rangeOptions &&
					rangeOptions.map((type, idx) => (
						<RangeType
							key={`${type}-${idx}`}
							type={type}
							isSelected={rangeBy === type}
							onSelect={() => selectRangeType(type)}
						/>
					))}
			</div>
			<div className={styles.SelectDateRangeBy_options}>
				{rangeBy === "Day" && (
					<div className={styles.SelectDateRangeBy_options_row}>
						<label htmlFor="byDay">By Day</label>
						<DatePicker />
					</div>
				)}
				{rangeBy === "Month" && (
					<div className={styles.SelectDateRangeBy_options_row}>
						<label htmlFor="byDay">By Day</label>
						{/* <Checkbox /> */}
					</div>
				)}
				{/*  */}
				{/*  */}
				{/*  */}
			</div>
		</div>
	);
};

export default SelectDateRangeBy;
