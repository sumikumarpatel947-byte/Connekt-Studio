const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = 8001;

// MIME types
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.wav': 'audio/wav',
  '.mp4': 'video/mp4',
  '.woff': 'application/font-woff',
  '.ttf': 'application/font-ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'application/font-otf',
  '.wasm': 'application/wasm'
};

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  // Handle root request
  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './index.html';
  }

  // Get file extension
  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeType = mimeTypes[extname] || 'application/octet-stream';

  // Read file
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // File not found
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1><p>The requested file was not found.</p>', 'utf-8');
      } else {
        // Server error
        res.writeHead(500);
        res.end(`Server Error: ${error.code}`, 'utf-8');
      }
    } else {
      // Success
      res.writeHead(200, {
        'Content-Type': mimeType,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      });
      res.end(content, 'utf-8');
    }
  });
});

console.log('='.repeat(60));
console.log('🧘‍♀️  CONNEKT STUDIO WEBSITE SERVER');
console.log('='.repeat(60));
console.log(`🌐 Server starting on port ${PORT}`);
console.log(`📁 Serving from: ${process.cwd()}`);
console.log('');
console.log('🚀 Open your browser and go to:');
console.log(`   http://localhost:${PORT}`);
console.log('');
console.log('📱 Or use these links:');
console.log(`   http://localhost:${PORT}/index.html`);
console.log(`   http://localhost:${PORT}/test.html`);
console.log('');
console.log('🛑 Press Ctrl+C to stop the server');
console.log('='.repeat(60));

server.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
  
  // Auto-open browser
  setTimeout(() => {
    const start = (process.platform === 'darwin' ? 'open' : 
                  process.platform === 'win32' ? 'start' : 'xdg-open');
    exec(`${start} http://localhost:${PORT}/index.html`);
  }, 1000);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`❌ Port ${PORT} is already in use!`);
    console.log('💡 Try a different port or close the other server');
  } else {
    console.log(`❌ Error starting server: ${err}`);
  }
});

process.on('SIGINT', () => {
  console.log('\n🛑 Server stopped by user');
  console.log('👋 Thank you for using Connekt Studio!');
  process.exit(0);
});
