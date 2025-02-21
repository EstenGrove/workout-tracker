const inchesToFeet = (inches: number) => {
	const feet = Math.floor(inches / 12);
	const restInches = inches % 12;
	return {
		feet,
		inches: restInches,
	};
};

const feetToInches = (feet: number, inches: number = 0) => {
	const newHeight = feet * 12 + inches;

	return newHeight;
};

const formatHeight = (feet: number, inches: number) => {
	return `${feet}'${inches}"`;
};

export { inchesToFeet, feetToInches, formatHeight };
