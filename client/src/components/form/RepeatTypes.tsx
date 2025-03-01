import styles from "../../css/form/RepeatTypes.module.scss";
import {
	REPEAT_TYPES as defaultTypes,
	RepeatType,
} from "../../utils/utils_recurring";

type Props = {
	name: string;
	options: RepeatType[];
	selectedOption: RepeatType;
	onSelect: (name: string, type: RepeatType) => void;
};

type TypeProps = {
	type: RepeatType;
	isSelected: boolean;
	onClick: () => void;
};

const Type = ({ type, onClick, isSelected = false }: TypeProps) => {
	const css = {
		backgroundColor: isSelected ? "var(--accent-blue)" : "var(--bg-foreground)",
		color: "#fff",
	};
	return (
		<button
			type="button"
			onClick={onClick}
			className={styles.RepeatType}
			style={css}
		>
			{type}
		</button>
	);
};

const RepeatTypes = ({
	name = "frequency",
	options = defaultTypes,
	selectedOption,
	onSelect,
}: Props) => {
	return (
		<div className={styles.RepeatTypes}>
			{options &&
				options.map((type: RepeatType, idx: number) => (
					<Type
						key={`${idx}-${type}`}
						type={type}
						isSelected={selectedOption === type}
						onClick={() => onSelect(name, type)}
					/>
				))}
		</div>
	);
};

export default RepeatTypes;
