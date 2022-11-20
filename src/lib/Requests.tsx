import React, { createContext, useContext, useEffect, useState } from "react";
import { BatchInterceptor } from "@mswjs/interceptors";
import browserInterceptors from "@mswjs/interceptors/lib/presets/browser.js";
import {
  DebugTokenHeaders,
  FCC,
  RequestsContextValue,
  ResponseInfo,
} from "./@types";

const RequestsContext = createContext<RequestsContextValue | undefined>(
  undefined
);

const interceptor = new BatchInterceptor({
  name: "symfony-debug",
  interceptors: browserInterceptors,
});

function hasProfilerHeaders(
  headers: Headers,
  tokenLinkHeader: string,
  tokenHeader: string
) {
  return headers.has(tokenLinkHeader) && headers.has(tokenHeader);
}

export const RequestsProvider: FCC<DebugTokenHeaders> = ({
  tokenHeader,
  tokenLinkHeader,
  children,
}) => {
  const [responses, setResponses] = useState<ResponseInfo[]>([]);

  /**
   * @param {Response} response
   */
  const onResponse = (response: Response) => {
    const headers = response.headers;
    if (hasProfilerHeaders(headers, tokenLinkHeader, tokenHeader)) {
      const requestInfo: ResponseInfo = {
        error: false,
        url: response.url,
        method: "?",
        type: response.type,
        status: response.status,
        token: headers.get(tokenHeader) ?? "",
        profiler: headers.get(tokenLinkHeader) ?? "",
      };

      addResponse(requestInfo);
    }
  };

  useEffect(() => {
    interceptor.apply();
    interceptor.on("response", onResponse);
  }, [onResponse]);

  const reset = () => setResponses([]);

  const addResponse = (requestInfo: ResponseInfo) =>
    setResponses((prevState) => [requestInfo, ...prevState]);

  const value = {
    responses,
    reset,
    addResponse,
    hasResponses: !!responses.length,
  };

  return (
    <RequestsContext.Provider value={value}>
      {children}
    </RequestsContext.Provider>
  );
};

export const useRequests = () => {
  const context = useContext(RequestsContext);

  if (context === undefined) {
    throw new Error(`Context undefined. Are you missing a Provider?`);
  }

  return context;
};
