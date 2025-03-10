import { ReactNode, ComponentPropsWithoutRef, RefObject } from "react";
import styles from "../../css/shared/Button.module.scss";

type ButtonProps = {
	onClick: () => void;
	isDisabled?: boolean;
	children?: ReactNode;
	className?: string;
	btnRef?: RefObject<HTMLButtonElement>;
};

// @ts-expect-error: this is fine
interface Props extends ButtonProps, ComponentPropsWithoutRef<"button"> {}

const Button = ({
	children,
	onClick,
	isDisabled,
	btnRef,
	className,
	...rest
}: Props) => {
	const classes = `${styles.Button} ${className}`;
	return (
		<button
			type="button"
			onClick={onClick}
			ref={btnRef}
			// className={styles.Button}
			className={classes}
			disabled={isDisabled}
			{...rest}
		>
			{children}
		</button>
	);
};

export default Button;
