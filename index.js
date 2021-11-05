const electron = require('electron');
const MainWindow = require('./app/main_window');
const TimerTray = require('./app/timer_tray');

const { app, ipcMain } = electron;

let mainWindow;
let tray;

app.on('ready', () => {
    mainWindow = new MainWindow(`file://${__dirname}/src/index.html`);
    // darwin is to check if the operating system is mac
    process.platform === 'darwin' ? app.dock.hide() : mainWindow.setSkipTaskbar(true);

    // win32 is to check if the operating system is windows
    const iconName = process.platform === 'win32' ? 'alarm.png' : 'iconTemplate.png';
    const iconPath = `${__dirname}/src/assets/${iconName}`;
    tray = new TimerTray(iconPath, mainWindow);
});

ipcMain.on('update-timer', (event, timeLeft) => {
    tray.setTitle(timeLeft);
});