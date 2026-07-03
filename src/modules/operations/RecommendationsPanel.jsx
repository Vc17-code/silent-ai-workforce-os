import React from "react";

export default function RecommendationsPanel({ recommendations }) {
  return (
    <section className="ops-section">
      <header className="ops-section-header">
        <h2>Suggested Actions</h2>
      </header>

      <div className="ops-list">
        {recommendations.length === 0 ? (
          <article className="ops-card">
            <p className="ops-muted">No recommendations right now.</p>
          </article>
        ) : (
          recommendations.map((recommendation) => (
            <article
              key={recommendation.id || recommendation.title}
              className="ops-card"
            >
              <h3>{recommendation.title}</h3>
              <p>{recommendation.description}</p>
              <p className="ops-muted">Priority: {recommendation.priority || "MEDIUM"}</p>
            </article>
          ))
        )}
      </div>
    </section>
  );
}

