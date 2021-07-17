import { Router } from 'express';

import { reset } from '../common/utils';

import { StatusCodes } from '../common/status-codes';

const router = Router();

// reset to defaults
router.put('/', async (req, res) => {
  await reset();
  return res.sendStatus(StatusCodes.Checked);
});

export default router;
