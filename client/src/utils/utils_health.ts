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

// Me: 28.22 inches
const calculateStrideLength = (heightFt: number, heightInches: number = 0) => {
	const heightInInches = feetToInches(heightFt, heightInches);
	const factors = {
		women: 0.413,
		men: 0.415,
	};
	const stride = heightInInches * factors.men;

	return stride;
};

export { inchesToFeet, feetToInches, formatHeight, calculateStrideLength };
