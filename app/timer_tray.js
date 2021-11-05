const electron = require('electron');

const { Tray, app, Menu } = electron;

class TimerTray extends Tray {
    constructor(iconPath, mainWindow){
        super(iconPath);

        this.mainWindow = mainWindow;
        this.setToolTip('Tasky');
        this.on('click', this.onClick);
        this.on('right-click', this.onRightClick);
    }

    onClick(event, bounds) {
        // Click event bounds
        const { x, y } = bounds;

        // Window height and width
        const { width, height } = this.mainWindow.getBounds();

        if(this.mainWindow.isVisible()){
            this.mainWindow.hide();
        }else {
            const yPosition = process.platform === 'darwin' ? y : y - height;
            this.mainWindow.setBounds({
                x: Math.round(x - width /2),
                y: Math.round(yPosition - 10),
                height,
                width
            })
            this.mainWindow.show();
        }
    }

    onRightClick() {
        const menuConfig = Menu.buildFromTemplate([
            {
                label: 'Quit',
                click: () => {
                    app.quit();
                }
            }
        ]);

        this.popUpContextMenu(menuConfig);
    }
}

module.exports = TimerTray;