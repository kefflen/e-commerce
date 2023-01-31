export interface ICacheDataAccess {
  get(key: string): Promise<string | null>
  set(key: string, value: string, secondsToExpire: number): Promise<void>
}
