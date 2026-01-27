import { Router } from 'express';
import { postHeartbeat } from '../controllers/heartbeat';

const router = Router();

router.post('/', postHeartbeat);

export default router;
