import { Router, Request, Response } from 'express';
import { jsonResponse } from '../../lib/jsonResponse';
import { error, log } from 'console';
import usersService from '../users/users.service';
import bcrypt from 'bcrypt';
import { getUserInfo } from '../../lib/getUserInfo';

const router = Router();

router.post("/", async (req: Request, res: Response) => {

    const { username, password } = req.body;

    if (!!!username || !!!password) {
        return res.status(400).json(
            jsonResponse(400, {
                error: "*Campos requeridos"
            })
        )
    }

    const user = await usersService.getByUsername(username);

    if (user) {

        const correctPassword = await bcrypt.compare(password, user.password);

        if (correctPassword) {

            const accessToken: string = user.createAccessToken();
            const refreshToken: string = await user.createRefreshToken();

            res.status(200).json(jsonResponse(200, { user: getUserInfo(user), accessToken, refreshToken }))

        } else {
            res.status(400).json(
                jsonResponse(400, {
                    error: "*Usuario o contraseña incorrecta",
                })
            );
        }
    } else {
        res.status(400).json(
            jsonResponse(400, {
                error: "*Usuario no encontrado",
            })
        );
    }
})

export default router;