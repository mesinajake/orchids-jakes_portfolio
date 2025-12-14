const { execSync } = require('child_process');

console.log('Installing frontend...');
try {
  process.chdir('/c/Users/Jake/orchids-projects/jakes_portfolioweb/frontend');
  execSync('npm install', { stdio: 'inherit' });
  console.log('✓ Frontend install complete');
} catch (e) {
  console.error('✗ Frontend install failed:', e.message);
}

console.log('\nInstalling backend...');
try {
  process.chdir('/c/Users/Jake/orchids-projects/jakes_portfolioweb/backend');
  execSync('npm install', { stdio: 'inherit' });
  console.log('✓ Backend install complete');
} catch (e) {
  console.error('✗ Backend install failed:', e.message);
}
