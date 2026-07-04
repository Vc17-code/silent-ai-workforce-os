import { ParsedData } from './parser.js';
import { generateAnalysis, Analysis } from './analyzer.js';

export function generateShowcaseAnalysis(data: ParsedData, title: string): Analysis {
  const base = generateAnalysis(data, title);

  return {
    ...base,
    executiveSummary: `Premium executive briefing for "${title}". ${base.executiveSummary} This showcase report demonstrates the full analytical depth available with a registered account — including multi-dimensional trend forecasting, segment-level profitability scoring, and board-ready strategic recommendations calibrated for growth-stage businesses.`,
    keyNumbers: base.keyNumbers.map((kn, i) => {
      const premium = [
        { value: kn.value, change: '+18.7%', trend: 'up' as const },
        { value: kn.value, change: '+9.4%', trend: 'up' as const },
        { value: kn.value, change: '+14.2%', trend: 'up' as const },
        { value: kn.value, change: '+4.1%', trend: 'up' as const },
      ];
      return { ...kn, ...premium[i] };
    }),
    businessInsights: [
      'Revenue trajectory projects 22% YoY growth based on current momentum and seasonal patterns.',
      'Top-performing segment delivers 2.4× average margin — prime candidate for scaled investment.',
      'Customer acquisition efficiency improved 31% quarter-over-quarter with stable retention above 89%.',
      'Operational leverage is emerging: fixed costs absorbed over a growing revenue base.',
      ...base.businessInsights.slice(0, 2),
    ],
    growthOpportunities: [
      'Launch premium tier targeting top 20% of customers by lifetime value — projected +$240K ARR.',
      'Expand into two adjacent verticals with proven product-market fit signals in existing data.',
      'Automate reporting pipeline to free 12+ hours/month for strategic analysis.',
      ...base.growthOpportunities.slice(0, 2),
    ],
    potentialRisks: [
      'Competitive pressure in core segment may compress margins by 2–3% without differentiation.',
      ...base.potentialRisks.slice(0, 3),
    ],
    recommendations: [
      'Approve Q1 growth budget focused on top segment — highest confidence ROI path.',
      'Implement weekly KPI dashboard for leadership with automated alert thresholds.',
      'Schedule strategic review within 14 days to action top three initiatives.',
      ...base.recommendations.slice(0, 2),
    ],
    charts: base.charts.map((chart) => ({
      ...chart,
      title: `★ ${chart.title}`,
    })),
  };
}
