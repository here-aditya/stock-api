import express from 'express';
import { fetchLast20Records } from '../controllers/stocks-controller';

const router = express.Router();

router.get('/stock/:name', fetchLast20Records);

export default router;
