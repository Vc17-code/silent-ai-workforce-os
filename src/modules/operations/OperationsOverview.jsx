import React from "react";

function StatCard({ label, value }) {
  return (
    <article className="ops-card ops-stat-card">
      <p className="ops-card-label">{label}</p>
      <strong className="ops-card-value">{value}</strong>
    </article>
  );
}

export default function OperationsOverview({ overview }) {
  return (
    <section className="ops-section">
      <header className="ops-section-header">
        <h2>Operations Overview</h2>
      </header>

      <div className="ops-grid ops-grid-3">
        <div className="ops-subsection">
          <h3>Workforce Summary</h3>
          <div className="ops-grid ops-grid-2">
            <StatCard label="Total Workers" value={overview.workforce.totalWorkers} />
            <StatCard label="Checked In" value={overview.workforce.checkedIn} />
            <StatCard label="Checked Out" value={overview.workforce.checkedOut} />
            <StatCard label="On Leave" value={overview.workforce.onLeave} />
          </div>
        </div>

        <div className="ops-subsection">
          <h3>Site Summary</h3>
          <div className="ops-grid ops-grid-2">
            <StatCard label="Total Sites" value={overview.sites.totalSites} />
            <StatCard label="Active Sites" value={overview.sites.activeSites} />
            <StatCard label="Delayed Sites" value={overview.sites.delayedSites} />
          </div>
        </div>

        <div className="ops-subsection">
          <h3>Financial Summary</h3>
          <div className="ops-grid ops-grid-1">
            <StatCard label="Labor Cost Today" value={overview.finance.laborCostToday} />
            <StatCard label="Projected Payroll" value={overview.finance.projectedPayroll} />
            <StatCard label="Budget Variance" value={overview.finance.budgetVariance} />
          </div>
        </div>
      </div>
    </section>
  );
}

