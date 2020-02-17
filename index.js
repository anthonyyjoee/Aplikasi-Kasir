const {app, BrowserWindow} = require('electron')

function createWindow() {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  // remove electron menu
  // win.setMenu(null)
  // and load the index.html of the app.
  win.loadFile('view/login.html')
}

app.on('ready', createWindow)