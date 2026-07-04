export type SubscriptionTier = 'demo' | 'starter' | 'pro' | 'business';

export type FileFormat = 'csv' | 'xlsx' | 'xls' | 'tsv' | 'json' | 'xml' | 'ods' | 'txt';

export interface SubscriptionPlan {
  id: SubscriptionTier;
  name: string;
  price: string;
  reportsPerMonth: number | null;
  formats: FileFormat[];
  exports: ('pdf' | 'docx' | 'html')[];
  highlight?: string;
}

export const SUBSCRIPTION_PLANS: Record<Exclude<SubscriptionTier, 'demo'>, SubscriptionPlan> = {
  starter: {
    id: 'starter',
    name: 'Starter',
    price: 'Included with access key',
    reportsPerMonth: 20,
    formats: ['csv', 'xlsx', 'xls', 'tsv'],
    exports: ['html'],
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    price: '$29/mo',
    reportsPerMonth: 100,
    formats: ['csv', 'xlsx', 'xls', 'tsv', 'json', 'xml', 'ods', 'txt'],
    exports: ['pdf', 'html', 'docx'],
    highlight: 'Most popular',
  },
  business: {
    id: 'business',
    name: 'Business',
    price: '$79/mo',
    reportsPerMonth: null,
    formats: ['csv', 'xlsx', 'xls', 'tsv', 'json', 'xml', 'ods', 'txt'],
    exports: ['pdf', 'html', 'docx'],
    highlight: 'Unlimited',
  },
};

export const DEMO_PLAN: SubscriptionPlan = {
  id: 'demo',
  name: 'Demo',
  price: 'Free',
  reportsPerMonth: 3,
  formats: ['csv', 'xlsx', 'xls'],
  exports: ['html'],
};

export const ALL_FORMATS: FileFormat[] = ['csv', 'xlsx', 'xls', 'tsv', 'json', 'xml', 'ods', 'txt'];

export const FORMAT_LABELS: Record<FileFormat, string> = {
  csv: 'CSV',
  xlsx: 'Excel',
  xls: 'Excel 97',
  tsv: 'TSV',
  json: 'JSON',
  xml: 'XML',
  ods: 'OpenDocument',
  txt: 'Text',
};

export function getPlanForTier(tier: SubscriptionTier): SubscriptionPlan {
  if (tier === 'demo') return DEMO_PLAN;
  return SUBSCRIPTION_PLANS[tier];
}

export function tierAllowsFormat(tier: SubscriptionTier, ext: string): boolean {
  const plan = getPlanForTier(tier);
  return plan.formats.includes(ext.toLowerCase() as FileFormat);
}

export function tierAllowsExport(tier: SubscriptionTier, format: string): boolean {
  const plan = getPlanForTier(tier);
  const f = format === 'word' ? 'docx' : format;
  return plan.exports.includes(f as 'pdf' | 'docx' | 'html');
}
