const { spawnSync } = require('child_process');

const dirs = ['frontend', 'backend'];

for (const dir of dirs) {
  console.log(`\n📦 Installing ${dir}...`);
  const result = spawnSync('npm', ['install'], {
    cwd: dir,
    stdio: 'inherit',
    shell: true
  });
  
  if (result.error) {
    console.error(`✗ ${dir} install failed:`, result.error);
  } else {
    console.log(`✓ ${dir} install complete`);
  }
}
