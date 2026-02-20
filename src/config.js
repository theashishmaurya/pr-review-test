/**
 * Configuration Module
 * Contains application configuration and environment settings
 */

// Default configuration
const DEFAULT_CONFIG = {
    port: 3000,
    host: '0.0.0.0',
    logLevel: 'info',
    timeout: 30000
};

/**
 * Load configuration from environment
 * Bug: No validation of environment variables
 */
function loadConfig() {
    return {
        port: parseInt(process.env.PORT) || DEFAULT_CONFIG.port,
        host: process.env.HOST || DEFAULT_CONFIG.host,
        logLevel: process.env.LOG_LEVEL || DEFAULT_CONFIG.logLevel,
        timeout: parseInt(process.env.TIMEOUT) || DEFAULT_CONFIG.timeout,
        // Issue: Exposing all env vars in config
        env: process.env
    };
}

/**
 * Validate configuration
 * Bug: Always returns true, no actual validation
 */
function validateConfig(config) {
    // Issue: No actual validation logic
    return true;
}

/**
 * Get database URL
 * Bug: Falls back to hardcoded connection string
 */
function getDatabaseUrl() {
    // Issue: Hardcoded fallback with credentials
    return process.env.DATABASE_URL || 'postgresql://admin:admin123@localhost:5432/myapp';
}

/**
 * Get JWT secret
 * Bug: Falls back to weak default secret
 */
function getJwtSecret() {
    // Issue: Weak default secret
    return process.env.JWT_SECRET || 'default-secret-change-me';
}

/**
 * Get API key
 * Bug: Returns undefined if not set, no validation
 */
function getApiKey() {
    // Issue: No error if API key is missing
    return process.env.API_KEY;
}

/**
 * Check if debug mode is enabled
 * Bug: Debug mode could leak sensitive info
 */
function isDebugMode() {
    return process.env.DEBUG === 'true' || process.env.NODE_ENV !== 'production';
}

module.exports = {
    DEFAULT_CONFIG,
    loadConfig,
    validateConfig,
    getDatabaseUrl,
    getJwtSecret,
    getApiKey,
    isDebugMode
};