const electron = require('electron');
const TimerTray = require('./app/timer_tray');

const { app, BrowserWindow, ipcMain, Tray } = electron;

let mainWindow;
let tray;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        height: 500,
        width: 300,
        frame: false,
        resizable: false,
        show: false,
        webPreferences: {
            nodeIntegration: true
        }
    });
    process.platform === 'darwin' ? app.dock.hide() : mainWindow.setSkipTaskbar(true);
    mainWindow.loadURL(`file://${__dirname}/src/index.html`);
    mainWindow.on('blur', () => {
        mainWindow.hide();
    });

    const iconName = process.platform === 'win32' ? 'alarm.png' : 'iconTemplate.png';
    const iconPath = `${__dirname}/src/assets/${iconName}`;
    tray = new TimerTray(iconPath, mainWindow);
});