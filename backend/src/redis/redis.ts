import { createClient } from "redis";

const redisClient = createClient({
  url: "redis://localhost:6379",
  database: 0,
});

(async () => {
  try {
    await redisClient.connect();
    console.log("Connected to Redis successfully");
  } catch (error) {
    console.error("Failed to connect to Redis:", error);
  }
})();

export default redisClient;
