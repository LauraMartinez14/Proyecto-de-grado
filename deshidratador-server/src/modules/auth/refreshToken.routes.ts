import { Router, Request, Response } from 'express';
import { getTokenFromHeader } from './getTokenFromHeader';
import { jsonResponse } from '../../lib/jsonResponse';
import Token from './token.model';
import tokenService from './token.service';
import { error } from 'console';
import { verifyRefreshToken } from './verifyTokens';
import { generateAccessToken } from './generateTokens';

const router = Router();

router.post("/", async (req: Request, res: Response) => {
    const refreshToken = getTokenFromHeader(req.headers);
    if (refreshToken) {

        try {
            const found = await tokenService.getByRefreshToken(refreshToken);
            if (!found) {
                return res.status(401).send(jsonResponse(401, {error: "Unauthorized"}));
            }

            const payload = verifyRefreshToken(found.token);
            if (payload) {
                const accessToken = generateAccessToken(payload.user);

                return res.status(200).json(jsonResponse(200, { accessToken }));
            } else {
                return res.status(401).send(jsonResponse(401, {error: "Unauthorized"}));
            }


        } catch (error) {
            return res.status(401).send(jsonResponse(401, {error: "Unauthorized"}));
        }

    } else {
        res.status(401).send(jsonResponse(401, { error: "Unauthorized" }));
    }
    res.send("refresh token");
});

export default router;