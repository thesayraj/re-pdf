import { lazy } from "react";

export const Document = lazy(() =>
  import("react-pdf").then((module) => ({ default: module.Document }))
);

export const Page = lazy(() =>
  import("react-pdf").then((module) => ({ default: module.Page }))
);
