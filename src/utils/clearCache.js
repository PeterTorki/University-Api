import { redisClient } from "../../Database/redis.js"

export async function clearUserCache(cacheName = `users_all`, id = null) {
    if (id === null) {
        await redisClient.del(`/${cacheName}`)
    } else {
        await Promise.all([
            redisClient.del(`/${cacheName}`),
            redisClient.del(`/${cacheName}/${id}`)
        ]);
    }

}