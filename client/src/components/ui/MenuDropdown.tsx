import { ReactNode, useRef } from "react";
import styles from "../../css/ui/MenuDropdown.module.scss";
import { useOutsideClick } from "../../hooks/useOutsideClick";

type Props = {
	closeMenu: () => void;
	children?: ReactNode;
};

const MenuDropdown = ({ closeMenu, children }: Props) => {
	const menuRef = useRef<HTMLDivElement>(null);
	useOutsideClick(menuRef, closeMenu);
	return (
		<div ref={menuRef} className={styles.MenuDropdown}>
			<ul className={styles.MenuDropdown_list}>{children}</ul>
		</div>
	);
};

export default MenuDropdown;
