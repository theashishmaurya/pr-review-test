// New feature file for testing incremental review

/**
 * Validates an email address format
 * @param {string} email - The email to validate
 * @returns {boolean} - True if valid email format
 */
function validateEmail(email) {
  // Simple regex - could be improved
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Formats a phone number to standard US format
 * @param {string} phone - Phone number string
 * @returns {string} - Formatted phone number
 */
function formatPhone(phone) {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length !== 10) {
    return phone; // Return original if not 10 digits
  }
  return `(${cleaned.slice(0,3)}) ${cleaned.slice(3,6)}-${cleaned.slice(6)}`;
}

/**
 * Generates a random hex color
 * @returns {string} - Hex color code like #FF5500
 */
function randomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

module.exports = { validateEmail, formatPhone, randomColor };
