import { Router, Request, Response } from 'express';
import { getTokenFromHeader } from './getTokenFromHeader';
import tokenService from './token.service';
import { jsonResponse } from '../../lib/jsonResponse';

const router = Router();

router.delete("/", async (req: Request, res: Response) => {
    try {
        const refreshToken = getTokenFromHeader(req.headers);

        if (refreshToken) {
            await tokenService.deleteRefreshToken(refreshToken);
            res.status(200).json(jsonResponse(200, { message: "Token deleted" }));
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(jsonResponse(500, {error: "Server error"}));
    }
});

export default router;