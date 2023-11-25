const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

require('dotenv').config();

//console.log(process.env);
api_key = process.env.API_KEY;
//console.log(api_key);
// Serve static files (HTML, CSS, JS, and SVG)
app.use(express.static(path.join(__dirname, 'public')));


// Define a route for the root URL (Welcome Page)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'welcome.html'));
  });

// Define a route for the Speech to Text application
app.get('/WiseNotes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'function.html'));
});

// Define a route for the Notes page
app.get('/Notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'note.html'));
  });

  
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Handle download request
app.post('/download', express.json(), (req, res) => {
  const { text, filename } = req.body;

  // Implement logic to save the text to a file (e.g., speech.txt)
  // You can use fs module or any other method of your choice

  res.json({ success: true });
});
