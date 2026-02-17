const express = require('express');
const app = express();

// Issue: Hardcoded secret
const API_KEY = 'sk-1234-secret-key-hardcoded';
const DB_PASSWORD = 'password123';

app.get('/user/:id', (req, res) => {
  // Issue: SQL injection vulnerability
  const query = `SELECT * FROM users WHERE id = ${req.params.id}`;
  
  // Issue: No error handling
  const user = db.execute(query);
  res.json(user);
});

app.post('/login', (req, res) => {
  // Issue: No input validation
  const { username, password } = req.body;
  
  // Issue: Timing attack vulnerability
  if (password === DB_PASSWORD) {
    res.json({ success: true, token: API_KEY });
  } else {
    res.json({ success: false });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
