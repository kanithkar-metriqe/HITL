import React from "react";

type Props = {
  children: React.ReactNode;
  error: Error | null;
  errorFallback?: React.ReactNode;
  isLoading?: boolean;
  loadingFallback?: React.ReactNode;
};

function DefaultError({ error }: { error: Error }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-status-danger p-4">
      <div className="font-semibold mb-2">Something went wrong</div>

      <pre className="text-xs whitespace-pre-wrap break-all">{error.message}</pre>
    </div>
  );
}

const QueryStateHandler: React.FC<Props> = ({ isLoading, error, loadingFallback, errorFallback, children }) => {
  if (isLoading)
    return <>{loadingFallback}</>;
  if (error)
    return <>{errorFallback ?? <DefaultError error={error} />}</>;
  return <>{children}</>;
};

export default QueryStateHandler;
