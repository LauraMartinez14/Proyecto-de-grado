import Token from "./token.model";

async function getByRefreshToken(token: string): Promise<Token | null> {
  return await Token.findOne({ 
    where: { token: token } 
  });
}

async function deleteRefreshToken(token: string): Promise<number> {
  return await Token.destroy({ 
    where: { token: token } 
  });
}

export default {
    getByRefreshToken,
    deleteRefreshToken
}