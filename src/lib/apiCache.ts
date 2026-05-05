import { api } from './axios';


interface CacheEntry {
  data: any;
  timestamp: number;
  promise?: Promise<any>;
}

const cache = new Map<string, CacheEntry>();
const DEFAULT_TTL = 30_000; 


export async function cachedGet<T = any>(url: string, ttl = DEFAULT_TTL): Promise<T> {
  const now = Date.now();
  const entry = cache.get(url);

  
  if (entry && (now - entry.timestamp) < ttl) {
    if (entry.promise) return entry.promise;
    return entry.data;
  }

  
  const promise = api.get(url).then(res => {
    const data = res.data;
    cache.set(url, { data, timestamp: Date.now() });
    return data;
  }).catch(err => {
    
    cache.delete(url);
    throw err;
  });

  cache.set(url, { data: null, timestamp: now, promise });
  return promise;
}


export function invalidateCache(url: string) {
  cache.delete(url);
}


export function clearCache() {
  cache.clear();
}
