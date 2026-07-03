import React from "react";
import { useSelector } from "react-redux";

import OperationsOverview from "./OperationsOverview";
import SiteStatusGrid from "./SiteStatusGrid";
import TodaysEvents from "./TodaysEvents";
import RecommendationsPanel from "./RecommendationsPanel";
import AlertsPanel from "./AlertsPanel";
import {
  getOperationsOverview,
  getSiteStatus,
  getCriticalAlerts,
  getTodaysEvents,
  getRecommendations,
} from "./selectors";

import "./operations.css";

export default function OperationsPage() {
  const overview = useSelector(getOperationsOverview);
  const siteStatus = useSelector(getSiteStatus);
  const criticalAlerts = useSelector(getCriticalAlerts);
  const todaysEvents = useSelector(getTodaysEvents);
  const recommendations = useSelector(getRecommendations);

  return (
    <main className="ops-page" aria-label="Operations Center">
      <header className="ops-page-header">
        <h1>Operations Center</h1>
        <p className="ops-muted">
          Live command view powered by Silent Core selectors.
        </p>
      </header>

      <OperationsOverview overview={overview} />

      <section className="ops-section">
        <header className="ops-section-header">
          <h2>Active Projects</h2>
        </header>
        <div className="ops-grid ops-grid-3">
          {overview.activeProjects.length === 0 ? (
            <article className="ops-card">
              <p className="ops-muted">No active projects available.</p>
            </article>
          ) : (
            overview.activeProjects.map((project) => (
              <article key={project.id || project.projectId} className="ops-card">
                <h3>{project.name || project.projectName || project.projectId}</h3>
                <p>Site: {project.siteName || project.siteId || "N/A"}</p>
                <p>Status: {project.status || "ACTIVE"}</p>
              </article>
            ))
          )}
        </div>
      </section>

      <SiteStatusGrid siteStatus={siteStatus} />

      <div className="ops-grid ops-grid-sidebar">
        <TodaysEvents events={todaysEvents} />
        <div className="ops-stack">
          <AlertsPanel alerts={criticalAlerts} />
          <RecommendationsPanel recommendations={recommendations} />
        </div>
      </div>
    </main>
  );
}

