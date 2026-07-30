const { execSync } = require('child_process');
try {
  execSync('bun run build', { stdio: 'inherit' });
} catch (e) {
  console.error("Build failed");
}
