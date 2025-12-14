const { spawn } = require('child_process');
const path = require('path');

// Start frontend (Vite on default port 5173)
console.log('Starting frontend dev server...');
const frontend = spawn('node', ['--loader=tsx', 'node_modules/.bin/vite'], {
  cwd: path.join(__dirname, 'frontend'),
  stdio: 'inherit',
  shell: true
});

frontend.on('error', (err) => {
  console.error('Frontend error:', err);
});

// Start backend (Express on port 5000 or 3001)
console.log('Starting backend dev server...');
const backend = spawn('node', ['node_modules/.bin/nodemon', 'server.js'], {
  cwd: path.join(__dirname, 'backend'),
  stdio: 'inherit',
  shell: true
});

backend.on('error', (err) => {
  console.error('Backend error:', err);
});

process.on('SIGINT', () => {
  frontend.kill();
  backend.kill();
  process.exit(0);
});
