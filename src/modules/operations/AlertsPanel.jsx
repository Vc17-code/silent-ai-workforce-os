import React from "react";

export default function AlertsPanel({ alerts }) {
  return (
    <section className="ops-section">
      <header className="ops-section-header">
        <h2>Operational Alerts</h2>
      </header>

      <div className="ops-list">
        {alerts.length === 0 ? (
          <article className="ops-card">
            <p className="ops-muted">No critical alerts.</p>
          </article>
        ) : (
          alerts.map((alert) => (
            <article key={alert.id || alert.message} className="ops-card ops-alert-card">
              <div className="ops-row-between">
                <strong>{alert.title || "Critical Alert"}</strong>
                <span>{alert.level || "CRITICAL"}</span>
              </div>
              <p>{alert.message}</p>
              <p className="ops-muted">Site: {alert.siteId || "N/A"}</p>
            </article>
          ))
        )}
      </div>
    </section>
  );
}

