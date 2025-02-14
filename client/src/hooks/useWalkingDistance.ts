import { useState, useEffect, useRef } from "react";
import { Coords } from "../utils/utils_steps";

// Haversine formula to calculate distance in feet
const getDistanceInFeet = (
	lat1: number,
	lon1: number,
	lat2: number,
	lon2: number
): number => {
	const R = 20902230; // Earth's radius in feet
	const dLat = toRad(lat2 - lat1);
	const dLon = toRad(lon2 - lon1);
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(toRad(lat1)) *
			Math.cos(toRad(lat2)) *
			Math.sin(dLon / 2) *
			Math.sin(dLon / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	return R * c; // Distance in feet
};

// Convert degrees to radians
const toRad = (degrees: number): number => {
	return degrees * (Math.PI / 180);
};

interface HookOpts {
	onChange?: (position: GeolocationPosition) => void;
	onError?: (err: GeolocationPositionError) => void;
	options?: PositionOptions;
}

const defaultSettings: PositionOptions = {
	enableHighAccuracy: true,
	maximumAge: 0,
	timeout: 2000,
};
const defaultOptions: HookOpts = {
	onChange(position) {
		return position;
	},
	onError(err) {
		return err;
	},
	options: defaultSettings,
};

const useWalkingDistance = (hookParams: HookOpts = defaultOptions) => {
	const { onChange, onError, options } = hookParams;
	const watchRef = useRef<number | null>(null);
	const [isTracking, setIsTracking] = useState<boolean>(false);
	const [position, setPosition] = useState<Coords | null>(null);
	const [distanceInFeet, setDistanceInFeet] = useState<number>(0);
	const [previousPosition, setPreviousPosition] = useState<Coords | null>(null);

	const startTracking = () => {
		setIsTracking(true);
		setDistanceInFeet(0); // Reset distance when restarting tracking
	};

	// Function to start/stop tracking
	const stopTracking = () => {
		if (isTracking) {
			setIsTracking(false);
			setPreviousPosition(null);
		}
	};

	useEffect(() => {
		if (!isTracking || !navigator.geolocation) return;

		const id = navigator.geolocation.watchPosition(
			(pos: GeolocationPosition) => {
				const { latitude, longitude } = pos.coords;
				const newPosition = { latitude, longitude, timestamp: pos.timestamp };

				if (previousPosition) {
					const distanceFeet = getDistanceInFeet(
						previousPosition.latitude,
						previousPosition.longitude,
						latitude,
						longitude
					);

					// Apply a minimum threshold to filter out GPS noise (e.g., <3 feet)
					if (distanceFeet > 3) {
						setDistanceInFeet((prev) => prev + distanceFeet);
						setPreviousPosition(newPosition);
					}
					setPosition(newPosition);
					return onChange && onChange(pos);
				} else {
					setPreviousPosition(newPosition); // Set initial position
					setPosition(newPosition);
					return onChange && onChange(pos);
				}
			},
			(err) => {
				return onError && onError(err);
			},
			options
		);

		watchRef.current = id;

		return () => {
			if (watchRef.current !== null) {
				navigator.geolocation.clearWatch(watchRef.current);
				watchRef.current = null;
			}
		};
	}, [isTracking, onChange, onError, options, previousPosition]);

	return {
		position,
		distanceInFeet,
		isTracking,
		start: startTracking,
		stop: stopTracking,
	};
};

export { useWalkingDistance };
