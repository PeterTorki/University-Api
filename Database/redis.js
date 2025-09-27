import { createClient } from "redis";

const redisClient = createClient();
redisClient.on("error", (err) => console.error("❌ Redis Error:", err));
await redisClient.connect();

export const getOrSetCache = async (key, cb) => {
  try {
    const cached = await redisClient.get(key);
    if (cached) {
      return JSON.parse(cached);
    }

    const freshData = await cb();
    await redisClient.set(key, JSON.stringify(freshData), {
      EX: 60 * 60,
    });
    return freshData;
  } catch (error) {
    console.log(error.message);
  }
};


export { redisClient };
