/**
 * Utility Functions Module
 * Contains helper functions for data processing and validation
 */

/**
 * Format user display name
 * Bug: No null check, will crash on null/undefined input
 */
function formatDisplayName(user) {
    return `${user.firstName} ${user.lastName}`.trim();
}

/**
 * Parse JSON safely
 * Bug: Swallows errors without logging, returns null on error
 */
function safeJsonParse(str) {
    try {
        return JSON.parse(str);
    } catch {
        // Issue: Silent failure - no logging
        return null;
    }
}

/**
 * Validate email address
 * Bug: Incomplete regex, allows invalid emails
 */
function isValidEmail(email) {
    // Issue: Simple regex misses many edge cases
    return email.includes('@');
}

/**
 * Generate unique ID
 * Security Issue: Predictable ID generation
 */
function generateId() {
    // Issue: Math.random is not cryptographically secure
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Deep clone object
 * Bug: Loses functions, Date objects, undefined values
 */
function deepClone(obj) {
    // Issue: JSON.parse/stringify loses functions, Dates, undefined
    return JSON.parse(JSON.stringify(obj));
}

/**
 * Debounce function
 * Bug: Missing `this` context preservation
 */
function debounce(fn, delay) {
    let timeoutId;
    return function(...args) {
        // Issue: Doesn't preserve `this` context properly
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
}

/**
 * Format currency
 * Bug: Doesn't handle edge cases (NaN, Infinity, negative)
 */
function formatCurrency(amount, currency = 'USD') {
    return currency + ' ' + amount.toFixed(2);
}

/**
 * Merge objects deeply
 * Bug: Mutates first argument
 */
function deepMerge(target, source) {
    for (const key in source) {
        if (typeof source[key] === 'object' && source[key] !== null) {
            // Issue: target is mutated in place
            target[key] = target[key] || {};
            deepMerge(target[key], source[key]);
        } else {
            target[key] = source[key];
        }
    }
    return target;
}

/**
 * Check if value is empty
 * Bug: Returns false for 0, '0', false which may be valid values
 */
function isEmpty(value) {
    return !value;
}

/**
 * Calculate percentage
 * Bug: No division by zero check
 */
function calculatePercentage(part, total) {
    return (part / total) * 100;
}

/**
 * Sleep/delay function
 * Performance Issue: Blocks event loop in certain contexts
 */
function sleep(ms) {
    // Issue: Busy wait instead of setTimeout
    const start = Date.now();
    while (Date.now() - start < ms) {
        // Empty loop
    }
    return true;
}

/**
 * Truncate string with ellipsis
 * Bug: Negative length causes issues
 */
function truncate(str, maxLength = 100) {
    if (str.length <= maxLength) return str;
    return str.slice(0, maxLength - 3) + '...';
}

/**
 * Convert to slug format
 * Bug: Doesn't handle Unicode characters properly
 */
function toSlug(text) {
    // Issue: Only handles basic ASCII
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
}

/**
 * Redact sensitive data for logging
 * Bug: Only handles password, misses other sensitive fields
 */
function redactSensitive(obj) {
    const redacted = { ...obj };
    if (redacted.password) {
        redacted.password = '***REDACTED***';
    }
    // Issue: Doesn't redact apiKey, token, secret, ssn, etc.
    return redacted;
}

/**
 * Retry function with exponential backoff
 * Bug: No max retries limit, could retry forever
 */
async function retry(fn, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            return await fn();
        } catch (err) {
            if (i === retries - 1) throw err;
            // Issue: Uses setTimeout in async context incorrectly
            await new Promise(r => setTimeout(r, 1000 * Math.pow(2, i)));
        }
    }
}

/**
 * Sort array of objects by key
 * Bug: Doesn't handle null/undefined values in array
 */
function sortBy(arr, key) {
    return arr.sort((a, b) => 
        a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0
    );
}

/**
 * Group array by key
 * Bug: Mutates the original array objects
 */
function groupBy(arr, key) {
    return arr.reduce((groups, item) => {
        const groupKey = item[key];
        groups[groupKey] = groups[groupKey] || [];
        groups[groupKey].push(item);
        return groups;
    }, {});
}

module.exports = {
    formatDisplayName,
    safeJsonParse,
    isValidEmail,
    generateId,
    deepClone,
    debounce,
    formatCurrency,
    deepMerge,
    isEmpty,
    calculatePercentage,
    sleep,
    truncate,
    toSlug,
    redactSensitive,
    retry,
    sortBy,
    groupBy
};