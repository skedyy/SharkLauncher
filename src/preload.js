const { contextBridge, ipcRenderer, ipcMain } = require('electron')

contextBridge.exposeInMainWorld(
    'app',
    {
        savedata: (name, data) => ipcRenderer.send('savedata', name, data),
        getdata: (callback) => ipcRenderer.on('getdata', callback),
        loginMicrosoft: () => ipcRenderer.send('loginMicrosoft'),
        loginCracked: (username) => ipcRenderer.send('logincracked',username),
        startminecraft: (clientpackage,forge,cracked) => ipcRenderer.invoke('startminecraft', clientpackage,forge,cracked),
        getdat: (type) => ipcRenderer.send('getdat'),
        gettoken: () => ipcRenderer.send('gettoken'),
        getoken: (callback) => ipcRenderer.on('getoken',callback),
        removedata: () => ipcRenderer.send('removedata')
    }
)