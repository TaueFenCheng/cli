import React, { FC, PropsWithChildren, ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
function Fallback({ error, resetErrorBoundary }: any) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
}
interface Iprops {}
function ComponentBoundary(props: PropsWithChildren<Iprops>) {
  const { children } = props;
  return (
    <ErrorBoundary
      FallbackComponent={Fallback}
      onReset={(details) => {
        console.log(details);
      }}
    >
      {/* <></> */}
      {children}
    </ErrorBoundary>
  );
}

export default ComponentBoundary;