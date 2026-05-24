
import { jsonResponse } from "../../lib/jsonResponse";
import { getTokenFromHeader } from "./getTokenFromHeader";
import { verifyAccessToken } from "./verifyTokens";

export function authenticate(req: any, res: any, next: any) {
    const token = getTokenFromHeader(req.headers);

    if (token) {
        const decoded = verifyAccessToken(token);
        if (decoded) {
            req.user = { ...decoded.user }
            next();
        } else {
            res.status(401).json(
                jsonResponse(401, {
                    message: "No token provided",
                })
            );
        }
    } else {
        res.status(401).json(
            jsonResponse(401, {
                message: "No token provided",
            })
        );
    }
}