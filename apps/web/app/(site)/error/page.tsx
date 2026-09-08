"use client";

import ErrorPage from "../error";

export default function ErrorPreviewPage() {
  return (
    <ErrorPage
      error={new Error("Preview error")}
      reset={() => window.location.reload()}
      logError={false}
    />
  );
}
