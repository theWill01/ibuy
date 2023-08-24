import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  let error = useRouteError();

  return isRouteErrorResponse(error) ? (
    <h1>
      {error.status} {error.statusText} 
    </h1>
  ) : (
    <h1>{error.message || error} </h1>
  );
}
