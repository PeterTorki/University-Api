// src/utils/clearCache.js
import { getRedisClient } from "../../Database/redis.js";

export async function clearUserCache(cacheName = "users_all", id = null) {
  const client = await getRedisClient();

  if (id === null) {
    await client.del(cacheName);
  } else {
    await Promise.all([client.del(cacheName), client.del(`${cacheName}/${id}`)]);
  }
}
