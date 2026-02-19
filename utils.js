// Utility functions

function formatDate(date) {
  // Bug: No input validation
  return date.toISOString().split('T')[0];
}

function parseJSON(str) {
  // Security: No try-catch, will throw on invalid JSON
  return JSON.parse(str);
}

function generateId() {
  // Security: Weak random for IDs
  return Math.random().toString(36).substr(2, 9);
}

function deepClone(obj) {
  // Bug: Doesn't handle circular references
  return JSON.parse(JSON.stringify(obj));
}

module.exports = { formatDate, parseJSON, generateId, deepClone };
