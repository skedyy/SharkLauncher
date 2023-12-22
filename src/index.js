//Imports
const electron = {app, BrowserWindow} = require('electron');
const path = require('path')
//Define vars
let window
//When app is ready
app.whenReady().then(() => {
    //Parameters of the window
    function createWindow() {
        window = new BrowserWindow({
            width: width * 0.7,
            height: height / 0.7,
            icon: path.join(__dirname, 'img/sharkcorp.ico')
        })
    }
    const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;
    createWindow();
});