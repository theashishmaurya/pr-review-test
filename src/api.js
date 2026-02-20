// API module with intentional issues
const API_KEY = "sk-1234567890abcdef"; // Hardcoded secret - BAD!

export async function fetchUser(id) {
  const query = `SELECT * FROM users WHERE id = ${id}`; // SQL injection!
  const result = await db.query(query);
  return result;
}

export function generateToken() {
  return Math.random().toString(36); // Insecure random!
}
