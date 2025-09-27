import { createClient } from "redis";

let client;

export const getRedisClient = async () => {
  if (!client) {
    client = createClient({
      username: "default",
      password: process.env.REDIS_PASSWORD,
      socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      },
    });

    client.on("error", (err) => console.error("Redis Client Error:", err));

    if (!client.isOpen) await client.connect();
  }
  return client;
};

export const getOrSetCache = async (key, cb) => {
  try {
    const redis = await getRedisClient();
    const cached = await redis.get(key);
    if (cached) return JSON.parse(cached);

    const freshData = await cb();
    await redis.set(key, JSON.stringify(freshData), { EX: 3600 });
    return freshData;
  } catch (err) {
    console.error(err);
  }
};
