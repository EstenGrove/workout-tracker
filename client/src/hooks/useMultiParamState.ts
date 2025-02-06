import { useState } from "react";
import {
	removeAllQueryParams,
	removeQueryParams,
	upsertQueryParams,
} from "../utils/utils_params";

/**
 * 'useMultiParamsState': custom hook for syncing state from URL Query Params
 * - NOTE: this hooks works with objects as it's primitive data-structure. It returns objects, accepts objects etc.
 */

type Params = Record<string, string | number | boolean>;

const getInitial = (): Params => {
	const raw = new URLSearchParams(window.location.search);
	console.log("raw", raw);
	const params = Object.fromEntries(raw.entries());

	return params;
};

const useMultiParamsState = () => {
	const [params, setParams] = useState<Params>(getInitial());

	const update = (oneOrMoreParams: Params) => {
		const newState = {
			...params,
			...oneOrMoreParams,
		};

		upsertQueryParams(newState);
		setParams(newState);
	};

	const remove = (oneOrMoreKeys: Params) => {
		const newState = { ...params };
		const keys = Object.keys(oneOrMoreKeys);
		keys.forEach((key) => {
			delete newState[key];
		});
		removeQueryParams(keys);
		setParams(newState);
	};

	const clear = () => {
		removeAllQueryParams();
		setParams({});
	};

	return {
		params,
		update,
		remove,
		clear,
	};
};

export { useMultiParamsState };
