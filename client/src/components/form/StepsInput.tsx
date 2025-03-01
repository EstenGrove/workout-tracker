import { ChangeEvent } from "react";
import styles from "../../css/form/StepsInput.module.scss";

type Props = {
	name: string;
	id: string;
	value: string | number;
	onChange: (name: string, value: string | number) => void;
};

const StepsInput = ({ name, id, value, onChange }: Props) => {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		return onChange && onChange(name, value);
	};

	return (
		<div className={styles.StepsInput}>
			<div className={styles.StepsInput_wrapper}>
				<input
					type="number"
					name={name}
					id={id}
					value={value}
					onChange={handleChange}
					className={styles.StepsInput_wrapper_input}
				/>
			</div>
			<span>steps</span>
			{/*  */}
			{/*  */}
			{/*  */}
		</div>
	);
};

export default StepsInput;
