import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// create a rate limiter that allows 100 requests per 15 minutes
export const rateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, "900 s"),
});
