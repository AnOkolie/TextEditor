import { createClient } from "redis";
import { ENV } from "./ENV.js";

export const client = createClient({
  url: ENV.REDIS_URL,
});

client.on("error", (err) => console.log("Redis Client Error", err));

await client.connect();

// export default client;
