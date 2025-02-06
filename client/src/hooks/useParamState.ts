import { useMemo, useState } from "react";

type TParams = {
	[key: string]: string | number | boolean;
};

const upsertQueryParams = (paramsObj: TParams) => {
	const url = new URL(window.location.href);
	for (const [key, val] of Object.entries(paramsObj)) {
		url.searchParams.set(key, val as string);
	}
	history.pushState({}, "", url);
};

const removeQueryParams = (keysToRemove: string[]) => {
	const url = new URL(window.location.href);
	for (let i = 0; i < keysToRemove.length; i++) {
		const key = keysToRemove[i];
		url.searchParams.delete(key);
	}
	window.history.pushState({}, "", url);
};

const getQueryParams = (paramKey?: string): TParams => {
	const raw = new URLSearchParams(window.location.search);
	// if no key provided, return all query params
	if (!paramKey) {
		const params = Object.fromEntries([...raw]);
		return params;
	} else {
		// return only param for given key, must normalize the key since urls will make all keys lowercase
		const param = raw.get(paramKey.toLowerCase());
		return {
			[paramKey]: param,
		} as TParams;
	}
};

const useParamState = <T extends string | number | boolean | null>(
	initial: T = "" as T
) => {
	const [param, setParam] = useState<T | null>(initial);
	const allParams = useMemo(() => {
		const params = new URLSearchParams(window.location.search);
		return params;
	}, []);

	const setParamState = (key: string, value: T) => {
		if (!value || value === null || value === undefined) {
			setParam(null);
			removeQueryParams([key]);
		} else {
			setParam(value);

			upsertQueryParams({
				[key]: value,
			});
		}
	};

	const getParam = (key?: string) => {
		if (!key) {
			const params = getQueryParams();
			return params;
		} else {
			const param = getQueryParams(key);
			return {
				...param,
			};
		}
	};

	console.log("allParams", allParams);

	return {
		param: param,
		setParam: setParamState,
		getParam: getParam,
	};
};

export { useParamState };
