const logs = []; // Memory leak - never cleared
export function log(msg) { console.log(msg); } // No log levels
