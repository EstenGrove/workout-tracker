import { ChangeEvent } from "react";
import styles from "../../css/shared/RangeInput.module.scss";

type Props = {
	name: string;
	id: string;
	value: string;
	min?: number;
	max?: number;
	step?: number;
	onChange: (name: string, value: string | number) => void;
};

const RangeInput = ({
	name,
	id,
	value,
	onChange,
	min = 0,
	max = 100,
	step = 1,
}: Props) => {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		return onChange && onChange(name, value);
	};

	return (
		<div className={styles.RangeInput}>
			<input
				type="range"
				name={name}
				id={id}
				min={min}
				max={max}
				step={step}
				value={value}
				onChange={handleChange}
				className={styles.RangeInput_input}
			/>
		</div>
	);
};

export default RangeInput;
