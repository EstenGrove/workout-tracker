import { useState, useEffect, ReactNode } from "react";
import styles from "../../css/ui/FadeIn.module.scss";

type Props = {
	delay?: number;
	children?: ReactNode;
};

const FadeIn = ({ delay = 0.4, children }: Props) => {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setVisible(true);
		}, delay * 1000);

		return () => clearTimeout(timer); // Cleanup on unmount
	}, [delay]);

	return (
		<div
			className={visible ? `${styles.FadeIn} ${styles.visible}` : styles.FadeIn}
			style={{
				transition: `opacity ${delay}s cubic-bezier(0.3, 0.8, 0.3, 2.3)`,
			}}
		>
			{children}
		</div>
	);
};

export default FadeIn;
