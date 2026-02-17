const express = require('express');
const app = express();

// Fix: Use environment variables
const API_KEY = process.env.API_KEY;
const DB_PASSWORD = process.env.DB_PASSWORD;

if (!API_KEY || !DB_PASSWORD) {
  throw new Error('Missing required environment variables');
}

app.get('/user/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    // Fix: Validate input
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }
    
    // Fix: Use parameterized query
    const query = 'SELECT * FROM users WHERE id = ?';
    const user = db.execute(query, [id]);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/login', (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Fix: Input validation
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }
    
    // Fix: Use constant-time comparison
    const crypto = require('crypto');
    const expectedPassword = Buffer.from(DB_PASSWORD, 'utf8');
    const providedPassword = Buffer.from(password, 'utf8');
    
    if (expectedPassword.length !== providedPassword.length) {
      return res.status(401).json({ success: false });
    }
    
    if (crypto.timingSafeEqual(expectedPassword, providedPassword)) {
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
