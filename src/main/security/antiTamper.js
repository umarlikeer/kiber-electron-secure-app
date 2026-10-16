const { app } = require('electron');

function initAntiTamper() {
  const args = process.argv.join(' ');
  const forbiddenFlags = ['--inspect', '--remote-debugging-port', '--inspect-brk', '--remote-allow-origins'];
  
  for (const flag of forbiddenFlags) {
    if (args.includes(flag)) {
      console.error(`[SECURITY ALERT] Nojo'ya bayroq aniqlandi: ${flag}`);
      process.exit(1);
    }
  }
}

function setupDevToolsProtection(mainWindow) {
  mainWindow.webContents.on('devtools-opened', () => {
    mainWindow.webContents.closeDevTools();
    console.warn('[SECURITY] DevTools ochilishi taqiqlandi.');
  });

  mainWindow.webContents.on('before-input-event', (event, input) => {
    if (
      (input.control || input.meta) &&
      input.shift &&
      (input.key.toLowerCase() === 'i' || input.key.toLowerCase() === 'c')
    ) {
      event.preventDefault();
    }
    if (input.key === 'F12') {
      event.preventDefault();
    }
  });
}

module.exports = {
  initAntiTamper,
  setupDevToolsProtection
};