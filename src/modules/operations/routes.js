import React from "react";
import OperationsPage from "./OperationsPage";

/**
 * Operations module route definition.
 *
 * Integrate as the home route ("/") while keeping legacy dashboard routes
 * registered so existing dashboard access remains available.
 */
export const operationsHomeRoute = {
  path: "/",
  element: <OperationsPage />,
};

