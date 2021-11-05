const electron = require('electron');

const { app, BrowserWindow, ipcMain, Tray } = electron;

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        height: 500,
        width: 300,
        frame: false,
        resizable: false,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadURL(`file://${__dirname}/src/index.html`);

    const iconName = process.platform === 'win32' ? 'clock.png' : 'iconTemplate.png';
    const iconPath = `${__dirname}/src/assets/${iconName}`;
    new Tray(iconPath);
})