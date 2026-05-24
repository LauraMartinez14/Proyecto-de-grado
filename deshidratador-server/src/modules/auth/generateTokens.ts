import jwt from 'jsonwebtoken';

function sign(payload: any, isAccessToken: boolean) {
    return jwt.sign(
        payload, 
        isAccessToken ? 
        'cdb07d16-7a7b-4a98-a63a-2c60a156f832' 
        : '8a99b0f7-794f-4852-95eb-3007576826e4', 
    {
        algorithm: "HS256",
        expiresIn: '3600'
    }
);
}

export function generateAccessToken(user: any) {
    return sign({ user }, true);
}

export function generateRefreshToken(user: any) {
    return sign({ user }, false);
}