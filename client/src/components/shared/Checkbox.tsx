import { ChangeEvent, ComponentPropsWithoutRef } from "react";
import styles from "../../css/shared/Checkbox.module.scss";

interface InputProps {
	name: string;
	id: string;
	value: boolean;
	label: string;
	onChange: (name: string, value: boolean) => void;
	isDisabled?: boolean;
}

// @ts-expect-error: this is fine
interface Props extends InputProps, ComponentPropsWithoutRef<"input"> {}

const Checkbox = ({
	name,
	id,
	value,
	label,
	onChange,
	isDisabled = false,
	...rest
}: Props) => {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = e.target;
		return onChange && onChange(name, checked);
	};
	return (
		<div className={styles.Checkbox}>
			<input
				type="checkbox"
				name={name}
				id={id}
				checked={value}
				onChange={handleChange}
				className={styles.Checkbox_input}
				disabled={isDisabled}
				{...rest}
			/>
			<label htmlFor={id} className={styles.Checkbox_label}>
				{label}
			</label>
			{/*  */}
			{/*  */}
			{/*  */}
		</div>
	);
};

export default Checkbox;
