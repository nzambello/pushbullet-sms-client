const { app, BrowserWindow } = require('electron')
let win

function createWindow() {
  win = new BrowserWindow({
    width: 1280,
    height: 720,
    title: 'Pushbullet SMS Client',
    webPreferences: {
      webSecurity: false,
      allowRunningInsecureContent: true,
      nodeIntegration: false,
    },
  })

  if (process.env.NODE_ENV === 'development') {
    win.loadURL('http://localhost:3000')
    win.webContents.openDevTools()
  } else {
    win.loadURL('https://nzambello.github.io/pushbullet-sms-client/build')
  }

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
