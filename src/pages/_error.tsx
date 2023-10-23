import React from "react";
import { useRouter } from "next/router";
import NotFoundComponent from "@/lib/ui/not-found";

const ErrorPage = () => {
  const router = useRouter();

  // Check if the error status is 404
  if (router.query.statusCode === "404") {
    return <NotFoundComponent />;
  }

  // Handle other error cases here

  return <div>An error occurred</div>;
};

export default ErrorPage;
