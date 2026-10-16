const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { initAntiTamper, setupDevToolsProtection } = require('./security/antiTamper');

initAntiTamper();

const { scanDevice } = require('./modules/deviceScanner');
const { removeScreenTime } = require('./modules/removeScreenTime');
const { removeScreenTimeAccount } = require('./modules/removeScreenTimeAccount');
const { blockOtaReset } = require('./modules/blockOtaReset');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 650,
    resizable: false,
    frame: true,
    transparent: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  setupDevToolsProtection(mainWindow);
  mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
}

ipcMain.handle('kiber-api-task', async (event, { action, payload }) => {
  switch (action) {
    case 'scanDevice':
      return await scanDevice();
    case 'removeScreenTime':
      return await removeScreenTime(payload);
    case 'removeScreenTimeAccount':
      return await removeScreenTimeAccount(payload);
    case 'blockOtaReset':
      return await blockOtaReset(payload);
    default:
      throw new Error('Noma\'lum operatsiya');
  }
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});