import { createClient } from "redis";

const redisHost = process.env.REDIS_HOST || "localhost"; // Default to localhost if not set
const redisClient = createClient({
  url: `redis://${redisHost}:6379`, // Use the service name here
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
