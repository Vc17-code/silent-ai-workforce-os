import { Router } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth.js';
import { listPlans, getSubscriptionStatus } from '../services/subscriptionService.js';
import { activateSubscriptionKey } from '../services/subscriptionKeys.js';
import { getClientIp } from '../utils/clientIp.js';

const router = Router();

router.get('/plans', (_req, res) => {
  res.json(listPlans());
});

router.get('/status', authMiddleware, (req: AuthRequest, res) => {
  const status = getSubscriptionStatus(req.user!, getClientIp(req));
  res.json(status);
});

router.post('/activate', authMiddleware, (req: AuthRequest, res) => {
  const { subscriptionKey } = req.body;
  if (!subscriptionKey) {
    return res.status(400).json({ error: 'Subscription key is required' });
  }

  try {
    const tier = activateSubscriptionKey(subscriptionKey, req.user!.id);
    const status = getSubscriptionStatus(req.user!, getClientIp(req));
    res.json({ tier, status, message: `Upgraded to ${tier} plan` });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Activation failed';
    res.status(400).json({ error: message });
  }
});

export default router;
