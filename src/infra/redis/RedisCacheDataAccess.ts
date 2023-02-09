import Redis from 'ioredis'
import { ICacheDataAccess } from '../../domain/ports'

const redis = new Redis()

export class RedisCacheDataAccess implements ICacheDataAccess {
  async get(key: string): Promise<string | null> {
    const value = await redis.get(key)

    return value
  }
  async set(
    key: string,
    value: string,
    secondsToExpire: number,
  ): Promise<void> {
    await redis.set(key, value, 'EX', secondsToExpire)
  }
}
