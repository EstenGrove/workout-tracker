import { useRef, useState } from "react";
import sprite from "../../assets/icons/calendar2.svg";
import styles from "../../css/form/DateRangeSelector.module.scss";
import Button from "../shared/Button";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { RangePreset } from "../../utils/utils_dates";

type Props = {
	selectedPreset: string;
	presets?: RangePreset[];
	onSelect: (value: RangePreset) => void;
};

const customCSS = {
	btn: {
		minWidth: "100%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		gap: "0 .5rem",
	},
};

// const defaultTypes: RepeatType[] = [...REPEAT_TYPES];
const defaultTypes: RangePreset[] = [
	"Today",
	"Yesterday",
	"This Week",
	"Last Week",
	"This Month",
	"Last Month",
];

type MenuProps = {
	items: RangePreset[];
	selectedItem: string;
	onClose: () => void;
	onSelect: (value: RangePreset) => void;
};

type MenuItemProps = {
	item: string;
	isSelected: boolean;
	onSelect: () => void;
};

const MenuItem = ({ item, isSelected = false, onSelect }: MenuItemProps) => {
	return (
		<div
			onClick={onSelect}
			className={`${styles.MenuItem} ${isSelected && styles.isSelected}`}
		>
			{item}
		</div>
	);
};

const Menu = ({ items = [], selectedItem, onClose, onSelect }: MenuProps) => {
	const menuRef = useRef(null);
	useOutsideClick(menuRef, onClose);

	const handleSelectAndClose = (item: RangePreset) => {
		onSelect(item);
		onClose();
	};

	return (
		<div ref={menuRef} className={styles.Menu}>
			<div className={styles.Menu_label}>Presets</div>
			<div className={styles.Menu_list}>
				{items &&
					items.map((item, idx) => (
						<MenuItem
							key={item + idx}
							item={item}
							isSelected={selectedItem === item}
							onSelect={() => handleSelectAndClose(item)}
						/>
					))}
			</div>
		</div>
	);
};

const DateRangeSelector = ({
	selectedPreset,
	presets = defaultTypes,
	onSelect,
}: Props) => {
	const [showMenu, setShowMenu] = useState<boolean>(false);

	const openMenu = () => {
		setShowMenu(true);
	};
	const closeMenu = () => {
		setShowMenu(false);
	};

	return (
		<div className={styles.DateRangeSelector}>
			<Button style={customCSS.btn} onClick={openMenu}>
				<svg className={styles.DateRangeSelector_icon}>
					<use xlinkHref={`${sprite}#icon-filter_alt`}></use>
				</svg>
				<span className={styles.DateRangeSelector_text}>
					{selectedPreset || "Filters"}
				</span>
			</Button>

			{showMenu && (
				<Menu
					items={presets}
					onClose={closeMenu}
					onSelect={onSelect}
					selectedItem={selectedPreset}
				/>
			)}
		</div>
	);
};

export default DateRangeSelector;
