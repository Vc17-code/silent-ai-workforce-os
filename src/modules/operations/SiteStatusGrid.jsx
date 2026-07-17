import React from "react";

export default function SiteStatusGrid({ siteStatus }) {
  return (
    <section className="ops-section">
      <header className="ops-section-header">
        <h2>Site Status</h2>
      </header>

      <div className="ops-grid ops-grid-3">
        {siteStatus.length === 0 ? (
          <article className="ops-card">
            <p className="ops-muted">No site status updates available.</p>
          </article>
        ) : (
          siteStatus.map((site) => (
            <article key={site.id || site.siteId} className="ops-card">
              <h3>{site.name || site.siteName || site.siteId}</h3>
              <p>Status: {site.status || "UNKNOWN"}</p>
              <p>Active Workers: {site.activeWorkers ?? 0}</p>
              <p>Project: {site.projectName || site.projectId || "N/A"}</p>
            </article>
          ))
        )}
      </div>
    </section>
  );
}

