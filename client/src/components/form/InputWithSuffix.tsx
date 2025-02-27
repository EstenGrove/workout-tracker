import { ChangeEvent, ComponentPropsWithoutRef, FocusEvent } from "react";
import sprite from "../../assets/icons/main.svg";
import styles from "../../css/form/InputWithSuffix.module.scss";
import { iconsMap } from "../../utils/utils_icons";

interface InputProps {
	type?: string;
	name: string;
	id: string;
	value: string | number;
	onChange: (name: string, value: string | number) => void;
	suffix: string;
	icon?: keyof typeof iconsMap;
	inputMode?:
		| "search"
		| "text"
		| "email"
		| "tel"
		| "url"
		| "none"
		| "numeric"
		| "decimal";
}

// @ts-expect-error: this is fine
interface Props extends InputProps, ComponentPropsWithoutRef<"input"> {}

const selectTextOnFocus = (e: FocusEvent<HTMLInputElement>) => {
	const target = e.currentTarget as HTMLInputElement;

	if (target) {
		target.select();
	}
};

const InputWithSuffix = ({
	type = "text",
	name,
	id,
	value,
	onChange,
	suffix,
	icon = "calories2",
	inputMode = "text",
}: Props) => {
	const showIcon = false;
	const iconName = iconsMap[icon];

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		return onChange && onChange(name, value);
	};
	return (
		<div className={styles.InputWithSuffix}>
			{showIcon && (
				<div className={styles.InputWithSuffix_iconWrapper}>
					<svg className={styles.InputWithSuffix_iconWrapper_icon}>
						<use xlinkHref={`${sprite}#icon-${iconName}`}></use>
					</svg>
				</div>
			)}
			<input
				type={type}
				name={name}
				id={id}
				value={value}
				onChange={handleChange}
				onFocus={selectTextOnFocus}
				inputMode={inputMode}
				className={styles.InputWithSuffix_input}
				onContextMenu={(e) => e.preventDefault()}
				style={{ width: `${Math.max(3, String(value).length)}ch` }}
			/>
			<span className={styles.InputWithSuffix_suffix}>{suffix}</span>
		</div>
	);
};

export default InputWithSuffix;
