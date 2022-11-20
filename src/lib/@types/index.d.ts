import { FC, PropsWithChildren } from "react";

export declare type FCC<T = {}> = FC<PropsWithChildren<T>>;

export interface DebugTokenHeaders {
  tokenLinkHeader: string;
  tokenHeader: string;
}

export interface ResponseInfo {
  error: boolean;
  url: string;
  method: string;
  type: string;
  status: number;
  token: string;
  profiler: string;
}

export interface RequestsContextValue {
  responses: ResponseInfo[];
  reset: () => void;
  addResponse: (responseInfo: ResponseInfo) => void;
  hasResponses: boolean;
}
