const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the current directory
app.use(express.static('.'));

// Handle all routes by serving index.html for SPA behavior
app.get('*', (req, res) => {
  // Check if the request is for a specific HTML file
  const requestedFile = req.path;
  if (requestedFile.endsWith('.html') || requestedFile === '/') {
    const filePath = requestedFile === '/' ? 'index.html' : requestedFile.substring(1);
    res.sendFile(path.join(__dirname, filePath), (err) => {
      if (err) {
        res.status(404).sendFile(path.join(__dirname, 'index.html'));
      }
    });
  } else {
    // For other files, let express.static handle them
    res.status(404).send('File not found');
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});