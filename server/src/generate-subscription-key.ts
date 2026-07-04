import { generateSubscriptionKey } from './services/subscriptionKeys.js';
import { SubscriptionTier } from './services/subscriptions.js';

const args = process.argv.slice(2);
const tier = (args[0] ?? 'pro').toLowerCase() as SubscriptionTier;
const months = parseInt(args[1] ?? '1', 10) || 1;
const note = args.slice(2).join(' ').trim() || undefined;

try {
  const key = generateSubscriptionKey(tier, months, note);
  console.log('\nSubscription key generated (one-time use):\n');
  console.log(`  ${key}`);
  console.log(`  Tier:     ${tier}`);
  console.log(`  Duration: ${months} month(s)`);
  if (note) console.log(`  Note:     ${note}`);
  console.log('\nShare this key with the customer to activate or upgrade their plan.\n');
} catch (err) {
  console.error(err instanceof Error ? err.message : 'Failed to generate key');
  console.error('\nUsage: npm run generate-subscription-key --prefix server -- <tier> [months] [note]');
  console.error('Tiers: starter, pro, business');
  process.exit(1);
}
