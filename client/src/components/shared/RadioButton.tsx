import { ChangeEvent } from "react";
import styles from "../../css/shared/RadioButton.module.scss";

type Props = {
	name: string;
	id: string;
	value: boolean;
	label: string;
	onChange?: (name: string, value: boolean) => void;
	onGroupChange?: (name: string, value: string) => void;
};

const RadioButton = ({
	label,
	name,
	id,
	value,
	onChange,
	onGroupChange,
}: Props) => {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { id, name, checked } = e.target;

		if (onGroupChange) {
			return onGroupChange(name, id);
		}

		return onChange && onChange(name, checked);
	};

	return (
		<div className={styles.RadioButton}>
			<input
				type="radio"
				name={name}
				id={id}
				value={String(value)}
				onChange={handleChange}
				// onClick={handleGroupSelection}
				className={styles.RadioButton_input}
			/>
			<label htmlFor={id} className={styles.RadioButton_label}>
				{label}
			</label>
		</div>
	);
};

export default RadioButton;
