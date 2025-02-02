export type TResponseStatus = "SUCCESS" | "FAILED";

export type TModelShape = {
	Status: TResponseStatus;
	Data?: object;
	Message?: string;
	Results?: string | number;
	ErrorMsg?: string;
	ErrorStack?: string;
};

export interface IResponse<T> {
	Status: TResponseStatus;
	Data: T;
	Message?: string;
	Results?: string | number;
	ErrorMsg?: string;
	ErrorStack?: string;
}

export interface IResponseModel {
	model: TModelShape;
	getModel: () => void;
	getProp: (prop: string) => void;
}
/**
 * 'IRequestResponse':
 * - Custom response object each API will return back to the client, upon processing the request
 */
export interface IRequestResponse {
	Status: TResponseStatus;
	Data?: {
		[key: string]: unknown;
	};
	Message?: string | null;
	Results?: string | number;
	ErrorMsg?: string | null;
	ErrorStack?: string | null;
}

export interface IRespParams {
	status: TResponseStatus;
	data?: object | undefined;
	msg?: string;
	results?: number | string;
	errorMsg?: string | null;
	errorStack?: string | null;
}

class ResponseModel {
	model: TModelShape;

	constructor({
		status,
		data = {},
		msg = "",
		results = 0,
		errorMsg = null,
		errorStack = null,
	}: IRespParams) {
		this.model = {
			Status: status,
			Data: data,
			Message: msg,
			Results: results,
			ErrorMsg: errorMsg as TModelShape["ErrorMsg"],
			ErrorStack: errorStack as TModelShape["ErrorStack"],
		};

		// @ts-expect-error
		return this.model;
	}
	getModel() {
		return this.model;
	}
	getProp(prop: string) {
		if (!this.model.hasOwnProperty(prop)) {
			throw new Error(
				`Invalid property: ${prop} This does not exist on 'model'`
			);
		} else {
			return this.model[prop as keyof object];
		}
	}
}

export interface IApiDefault<T> {
	Status: TResponseStatus;
	Data: T | null;
	Message?: string;
	Results?: string | number;
	ErrorMsg?: string | null;
	ErrorStack?: string | null;
}

const getResponseOk = <T extends object>(data: T): IApiDefault<T> => {
	const results: number = Object?.keys(data)?.length || 0;

	return {
		Status: "SUCCESS",
		Data: data,
		Results: results,
		ErrorMsg: null,
		ErrorStack: null,
	};
};

const getResponseError = <T extends object>(
	err: Error,
	data?: T
): IApiDefault<T> => {
	return {
		Status: "FAILED",
		Data: data as T,
		Results: 0,
		ErrorMsg: err?.message || "Unknown error occurred",
		ErrorStack: err?.stack || "Unknown stack",
	};
};

export { ResponseModel, getResponseOk, getResponseError };
