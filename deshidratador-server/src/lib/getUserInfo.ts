import User from "../modules/users/user.model";

export function getUserInfo(user: User) {
    return {
        username: user.username,
        name: user.name,
        id: user.id
    }
}