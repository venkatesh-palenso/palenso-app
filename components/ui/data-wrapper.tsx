import React from "react";
import { SWRResponse } from "swr";
import Loading from "./loading";
import Error from "./error";

interface DataWrapperProps<T> {
  data: SWRResponse<T, any>;
  children: (data: T) => React.ReactNode;
  loadingText?: string;
  errorMessage?: string;
  className?: string;
}

const DataWrapper = <T,>({
  data,
  children,
  loadingText = "Loading...",
  errorMessage,
  className = "",
}: DataWrapperProps<T>) => {
  const { data: swrData, error, isLoading, mutate } = data;

  if (isLoading) {
    return <Loading text={loadingText} className={className} />;
  }

  if (error) {
    return (
      <Error
        message={errorMessage || error.message}
        onRetry={() => mutate()}
        className={className}
      />
    );
  }

  if (!swrData) {
    return <Error message="No data available" className={className} />;
  }

  return <>{children(swrData)}</>;
};

export default DataWrapper; 