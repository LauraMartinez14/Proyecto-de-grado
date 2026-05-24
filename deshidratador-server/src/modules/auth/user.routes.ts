import { Router, Request, Response } from 'express';
import { jsonResponse } from '../../lib/jsonResponse';

const router = Router();

router.get("/", (req: any, res: Response) => {
    res.status(200).json(jsonResponse(200, req.user));
});

export default router;