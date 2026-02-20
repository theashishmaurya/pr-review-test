// Database module with intentional issues
const DB_PASSWORD = "super_secret_123"; // Hardcoded password - BAD!

export async function query(sql, params) {
  // No input validation
  const result = await db.execute(sql);
  return result;
}

export function connect() {
  // No error handling
  const conn = db.connect();
  return conn;
}
