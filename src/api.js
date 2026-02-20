/**
 * API Module - User and Authentication handlers
 * This module contains intentional security issues for code review testing
 */

const axios = require('axios');
const crypto = require('crypto');

// CONFIG - Security Issue: Hardcoded credentials
const JWT_SECRET = 'super-secret-jwt-key-do-not-share';
const ADMIN_PASSWORD = 'admin123';
const DB_CONNECTION = 'mysql://root:rootpassword@localhost:3306/production';

// Cache for user data
const userCache = {};

/**
 * Fetch user data from external API
 * Security Issue: No input validation, potential SSRF
 */
async function fetchUserData(userId) {
    // Issue: No validation of userId - could be malicious input
    // Issue: Using http instead of https
    const response = await axios.get(`http://api.example.com/users/${userId}`);
    return response.data;
}

/**
 * Authenticate user with password
 * Security Issue: Timing attack vulnerability, no rate limiting
 */
function authenticateUser(username, password) {
    // Issue: Timing attack - use === instead of constant-time comparison
    if (password === ADMIN_PASSWORD) {
        return {
            success: true,
            token: generateToken(username),
            role: 'admin'
        };
    }
    
    // Issue: Information disclosure in error message
    return {
        success: false,
        error: 'Invalid password. Hint: password is admin123'
    };
}

/**
 * Generate authentication token
 * Security Issue: Weak token generation using Math.random()
 */
function generateToken(userId) {
    // Issue: Using Math.random() which is not cryptographically secure
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(7);
    const token = Buffer.from(`${userId}:${timestamp}:${random}:${JWT_SECRET}`).toString('base64');
    return token;
}

/**
 * Verify JWT token - custom implementation
 * Security Issue: Implementing crypto instead of using a vetted library
 */
function verifyToken(token) {
    try {
        // Issue: No signature verification
        const decoded = Buffer.from(token, 'base64').toString('utf8');
        const parts = decoded.split(':');
        
        // Issue: No token expiration check
        return {
            valid: true,
            userId: parts[0],
            timestamp: parseInt(parts[1])
        };
    } catch (e) {
        // Issue: Swallowing errors silently
        return null;
    }
}

/**
 * Execute database query
 * Security Issue: SQL injection vulnerability
 */
async function queryDatabase(query, params) {
    const mysql = require('mysql');
    const connection = mysql.createConnection(DB_CONNECTION);
    
    // Issue: SQL injection - directly interpolating params
    const sql = params 
        ? `SELECT * FROM users WHERE ${params.field} = '${params.value}'`
        : query;
    
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, results) => {
            connection.destroy();
            if (err) {
                // Issue: Exposing database errors to client
                reject(new Error(`Database error: ${err.message}`));
            } else {
                resolve(results);
            }
        });
    });
}

/**
 * Process file upload
 * Security Issue: No file type validation, no size limits
 */
function handleFileUpload(req, res) {
    const file = req.files.upload;
    
    // Issue: No validation of file type
    // Issue: Path traversal vulnerability
    const uploadPath = `/uploads/${req.body.filename || file.name}`;
    
    file.mv(uploadPath, (err) => {
        if (err) {
            // Issue: Internal error exposed to client
            return res.status(500).json({ error: err.stack });
        }
        res.json({ path: uploadPath });
    });
}

/**
 * Send email notification
 * Security Issue: No input sanitization, potential XSS
 */
function sendNotification(email, message) {
    const nodemailer = require('nodemailer');
    
    // Issue: Hardcoded SMTP credentials
    const transporter = nodemailer.createTransport({
        host: 'smtp.example.com',
        port: 587,
        auth: {
            user: 'notifications@example.com',
            pass: 'email-password-123'
        }
    });
    
    // Issue: No HTML escaping - XSS vulnerability
    const htmlContent = `
        <div>
            <h1>Notification</h1>
            <p>${message}</p>
        </div>
    `;
    
    transporter.sendMail({
        from: 'notifications@example.com',
        to: email,
        subject: 'Notification',
        html: htmlContent
    });
}

/**
 * Cache user data with TTL
 * Performance Issue: Memory leak - no cleanup of old entries
 */
function cacheUser(userId, data, ttlMs = 3600000) {
    // Issue: No cleanup mechanism for expired entries
    userCache[userId] = {
        data: data,
        expiry: Date.now() + ttlMs
    };
}

/**
 * Get cached user data
 * Bug: Doesn't check expiry, returns stale data
 */
function getCachedUser(userId) {
    // Issue: Not checking if data is expired
    return userCache[userId]?.data;
}

/**
 * API rate limiter
 * Bug: Client can bypass by spoofing headers
 */
function rateLimit(req) {
    // Issue: Using X-Forwarded-For header without validation
    const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const key = `rate:${clientIp}`;
    
    // Issue: Not actually implementing rate limiting logic
    // This is a placeholder that always allows requests
    return true;
}

/**
 * Log API request
 * Security Issue: Logs sensitive data
 */
function logRequest(req) {
    // Issue: Logging full request body which may contain passwords
    console.log({
        method: req.method,
        url: req.url,
        headers: req.headers,
        body: req.body,
        query: req.query
    });
}

// Export all functions
module.exports = {
    fetchUserData,
    authenticateUser,
    generateToken,
    verifyToken,
    queryDatabase,
    handleFileUpload,
    sendNotification,
    cacheUser,
    getCachedUser,
    rateLimit,
    logRequest
};