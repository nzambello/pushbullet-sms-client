const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')

let win

function createWindow() {
  win = new BrowserWindow({
    width: 1280,
    height: 720,
    title: 'Pushbullet SMS Client',
  })

  if (process.env.NODE_ENV === 'development' || true) {
    win.loadURL('http://localhost:3000')
    win.webContents.openDevTools()
  } else {
    win.loadURL(
      url.format({
        pathname: path.join(__dirname, '/build/index.html'),
        protocol: 'file:',
        slashes: true,
      }),
    )
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
