//Imports
const electron = {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path')
const Store = require('electron-store');
//Electron reload
if (process.env.NODE_ENV !== 'production') {
    require('electron-reload')(__dirname, {
    });
}
//Define vars
const files = new Store();
let window
let javawpath = process.env.path.split(";")
javawpath = javawpath[4]
javawpath = javawpath+"\\javaw.exe"
const tokenFilePath = './token.json'
const windowProperties = {
    alwaysOnTop: true,
    minimizable: false,
    resizable: false,
    movable: false,
    maximizable: false,
    width: 1000,
    height: 540,
}
let event;
//When app is ready
app.whenReady().then(() => {
    //Parameters of the window
    function createWindow() {
        window = new BrowserWindow({
            icon: path.join(__dirname, 'assets/img/smallpng2.png'),
            width: width * 0.7,
            height: height / 0.7,
            resizable: false,
            maximizable: false,
            title: "SharkLauncher",
            webPreferences: {
                preload: path.join(__dirname, "preload.js"),
            }
        })
        window.setMenuBarVisibility(false)
        window.loadFile(path.join(__dirname,'html/main.html'))
        console.log(javawpath)
    }
    const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;
    createWindow();
    //IPC METHODS
    ipcMain.on('loginMicrosoft', () => {
        const { Client } = require("minecraft-launcher-core");
        launcher = new Client();
        const { Auth} = require("msmc");
        var fs = require('graceful-fs')
        const authManager = new Auth("select_account");
        if (!fs.existsSync(tokenFilePath)) {
            authManager.launch("electron", windowProperties).then(async xboxManager => {
                token = await xboxManager.getMinecraft();
                tokenConverted = token.mclc()
                files.set('token', JSON.stringify(tokenConverted))
                let opts = {
                    clientPackage: null,
                    authorization: token.mclc(),
                };
                launcher.launch(opts);
                window.loadURL(path.join(__dirname, "html/launcher/select.html"));
            }).catch(async xboxManager => {
                window.loadURL(path.join(__dirname, "html/main.html"))
            });
        } else {
            window.loadURL(path.join(__dirname, "html/launcher/select.html"));
        }
    })
    ipcMain.on('logincracked', (event, username) => {
        const { Client, Authenticator} = require("minecraft-launcher-core");
        launcher = new Client();
        var fs = require('graceful-fs')
        if (!fs.existsSync(tokenFilePath)) {
                files.set('token', JSON.stringify(username))
                let opts = {
                    clientPackage: null,
                    authorization: Authenticator.getAuth(username),
                };
                launcher.launch(opts);
                window.loadURL(path.join(__dirname, "html/launcher/select.html"));
            }else{
                window.loadURL(path.join(__dirname, "html/launcher/select.html"));
            }
        }
)
    ipcMain.handle('startminecraft',(event,clientpackage,forge,cracked) => {
        if(cracked==false){
            var https = require('https')
            var fs = require('graceful-fs')
            if (!fs.existsSync("./.sharklauncher")) {
                fs.mkdir("./.sharklauncher", (err) => {
                    if (err) {
                        return console.error(err);
                    }
                    console.log('Directory created successfully!');
                });
            }
            const file = fs.createWriteStream("./.sharklauncher/forge-1.18.2.jar");
            https.get(forge, async (response) => {
                if (response.statusCode === 200) {
                    await response.pipe(file);

                    file.on('finish', () => {
                        file.close(async () => {
                            await console.log(`File downloaded`);
                        });
                    });
                } else {
                    console.error(`Failed to download file.`);
                }
            });
        console.log("premium")
        const { Client } = require("minecraft-launcher-core");
        var fs = require('graceful-fs')
        const { Auth } = require('msmc')
        launcher = new Client();
        var json = files.get('token')
        var json1 = JSON.parse(json);
        let opts = {
            clientPackage: clientpackage,
            authorization: json1,
            root: "./.sharklauncher",
            version: {
                number: "1.18.2",
                type: "release"
            },
            forge: "./.sharklauncher/forge-1.18.2.jar",
            memory: {
                max: "4G",
                min: "2G"
            },
        };
        launcher.launch(opts);
            launcher.on('data', (e) => console.log(e));
            launcher.on('debug', (e) => console.log(e));
        launcher.on('progress', (e) => {
            window.webContents.send('getdata', e);
            console.log(e)
        })
        launcher.on("close", () => {
            var status = "closed"
            console.log("closed");
        })
        } if(cracked==true){
            var https = require('https')
            var fs = require('graceful-fs')
            if (!fs.existsSync("./.sharklauncherc")) {
                fs.mkdir("./.sharklauncherc", (err) => {
                    if (err) {
                        return console.error(err);
                    }
                    console.log('Directory created successfully!');
                });
            }
            const file = fs.createWriteStream("./.sharklauncherc/forge-1.18.2.jar");
            https.get(forge, async (response) => {
                if (response.statusCode === 200) {
                    await response.pipe(file);

                    file.on('finish', () => {
                        file.close(async () => {
                            await console.log(`File downloaded`);
                        });
                    });
                } else {
                    console.error(`Failed to download file.`);
                }
            });
            console.log("nopremium")
            const { Client, Authenticator } = require("minecraft-launcher-core");
            var fs = require('graceful-fs')
            const { Auth } = require('msmc')
            launcher = new Client();
            var json = files.get("token")
            var json1 = JSON.parse(json);
            console.log(json1)
            let opts = {
                clientPackage: clientpackage,
                authorization: Authenticator.getAuth(json1),
                root: "./.sharklauncherc",
                version: {
                    number: "1.18.2",
                    type: "release"
                },
                forge: "./.sharklauncherc/forge-1.18.2.jar",
                memory: {
                    max: "4G",
                    min: "2G"
                },
            };
            launcher.launch(opts);
            launcher.on('debug', (e) => console.log(e));
            launcher.on('progress', (e) => {
                window.webContents.send('getdata', e);
            })
            launcher.on("close", () => {
                window.webContents.send('getdata', "Closed");
            })  
        }
    });
    ipcMain.on('gettoken', (type) => {
        var datos = files.get('token')
        window.webContents.send('getoken', datos);
    })
    ipcMain.on('removedata', (event) => {
        files.delete('token')
    })
    ipcMain.on('savedata', (event, name, data) => {
        files.delete('token');
        if(data== undefined){}else{
            files.set(name, data);
        }
    })
    ipcMain.on('getdat', (type) => {
        var datos = event
        sendData(datos)
    })
    function sendData(datos) {
        mainWindow.webContents.send('getdata', datos);
    }  
});