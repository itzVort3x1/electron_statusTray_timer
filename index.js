const electron = require('electron');

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
    mainWindow.loadURL(`file://${__dirname}/src/index.html`);

    const iconName = process.platform === 'win32' ? 'clock.png' : 'iconTemplate.png';
    const iconPath = `${__dirname}/src/assets/${iconName}`;
    tray = new Tray(iconPath);
    tray.on('click', (event, bounds) => {
        // Click event bounds
        const { x, y } = bounds;

        // Window height and width
        const { width, height } = mainWindow.getBounds();

        if(mainWindow.isVisible()){
            mainWindow.hide();
        }else {
            const yPosition = process.platform === 'darwin' ? y : y - height;
            mainWindow.setBounds({
                x: Math.round(x - width /2),
                y: Math.round(yPosition),
                height,
                width
            })
            mainWindow.show();
        }
    });
});