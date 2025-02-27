export interface DistanceCoords {
	prevLat: number;
	prevLong: number;
	currentLat: number;
	currentLong: number;
}

export interface Coords {
	latitude: number;
	longitude: number;
	timestamp?: number;
}

export type DistanceUnit = "km" | "mi";

export interface DistanceOptions {
	gender: "men" | "women" | "male" | "female" | "general";
	unit: "km" | "mi";
}

const strideLengths = {
	men: 0.78, // meters per step
	women: 0.72,
	general: 0.75, // 2.5 feet per step
};

// Converts degrees to radians
const toRadians = (degrees: number) => {
	return degrees * (Math.PI / 180);
};

const isValidCoords = (
	lastCoords: Coords | null,
	newCoords: Coords,
	minDistance: number = 5
): boolean => {
	if (!lastCoords) return true;

	const newDistance = getDistanceFromCoords({
		prevLat: lastCoords.latitude,
		prevLong: lastCoords.longitude,
		currentLat: newCoords.latitude,
		currentLong: newCoords.longitude,
	});

	const meetsMinimum: boolean = newDistance >= minDistance;

	return meetsMinimum;
};

// const getDistanceFromCoords=(lat1, lon1, lat2, lon2) =>{
const getDistanceFromCoords = (coords: DistanceCoords) => {
	const { prevLat, prevLong, currentLat, currentLong } = coords;
	const R = 3958.8; // Earth's radius in miles
	const dLat = toRadians(currentLat - prevLat);
	const dLon = toRadians(currentLong - prevLong);
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(toRadians(prevLat)) *
			Math.cos(toRadians(currentLat)) *
			Math.sin(dLon / 2) *
			Math.sin(dLon / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	return R * c; // Distance in miles
};

// Haversine formula to calculate distance in feet
// Lat1: previous
// Lat2: current
const getDistanceInFeet = (
	lat1: number,
	lon1: number,
	lat2: number,
	lon2: number
) => {
	const R = 20902230; // Earth's radius in feet
	const dLat = toRadians(lat2 - lat1);
	const dLon = toRadians(lon2 - lon1);
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(toRadians(lat1)) *
			Math.cos(toRadians(lat2)) *
			Math.sin(dLon / 2) *
			Math.sin(dLon / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	return R * c; // Distance in feet
};

type MilesTo = "feet" | "yards" | "meters" | "steps";

const convertMilesTo = (miles: number, to: MilesTo = "steps") => {
	const conversionRates = {
		feet: 5280, // 1 mile = 5280 feet
		yards: 1760, // 1 mile = 1760 yards
		meters: 1609.34, // 1 mile = 1609.34 meters
		steps: 2112, // Approx. 1 mile = 2112 steps (based on avg step length of 2.5 feet)
	};

	switch (to) {
		case "steps": {
			return miles * conversionRates.steps;
		}
		case "feet": {
			return miles * conversionRates.feet;
		}
		case "yards": {
			return miles * conversionRates.yards;
		}
		case "meters": {
			return miles * conversionRates.meters;
		}

		default:
			return 0;
	}
};

const convertStepsToMiles = (stepsInInches: number, strideInInches: number) => {
	const miles = (stepsInInches * strideInInches) / 63360;

	return miles;
};

const convertMilesToSteps = (miles: number, strideInInches: number) => {
	const steps = (miles * 63360) / strideInInches;

	return steps;
};

export {
	strideLengths,
	toRadians,
	getDistanceInFeet,
	getDistanceFromCoords,
	convertMilesTo,
	isValidCoords,
	convertStepsToMiles,
	convertMilesToSteps,
};
