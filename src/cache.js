const cache = {}; // No TTL, no cleanup
export function get(k) { return cache[k]; }
export function set(k, v) { cache[k] = v; }
