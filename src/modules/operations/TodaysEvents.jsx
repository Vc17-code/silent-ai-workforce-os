import React from "react";

export default function TodaysEvents({ events }) {
  return (
    <section className="ops-section">
      <header className="ops-section-header">
        <h2>Event Timeline</h2>
      </header>

      <div className="ops-timeline">
        {events.length === 0 ? (
          <article className="ops-card">
            <p className="ops-muted">No workforce events recorded for today.</p>
          </article>
        ) : (
          events.map((event) => (
            <article key={event.id} className="ops-card">
              <div className="ops-row-between">
                <strong>{event.eventType}</strong>
                <span>{event.displayTime}</span>
              </div>
              <p>Worker: {event.workerId}</p>
              <p>Site: {event.siteId}</p>
              <p>Source: {event.source}</p>
            </article>
          ))
        )}
      </div>
    </section>
  );
}

