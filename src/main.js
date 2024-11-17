const {app, BrowserWindow } = require ('electron')
const path = require('path')

let mainWindow;

app.on ('ready', () => {
    mainWindow = new BrowserWindow({
        width: 400,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    mainWindow.loadFile('./build/index.html')
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})