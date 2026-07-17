import React from "react";
import TodaysEvents from "./TodaysEvents";

/**
 * Future-friendly timeline wrapper.
 * Keeps naming aligned with module roadmap while reusing today's events widget.
 */
export default function OperationsTimeline({ events }) {
  return <TodaysEvents events={events} />;
}

