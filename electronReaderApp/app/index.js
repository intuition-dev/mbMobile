const { app, BrowserWindow, protocol } = require('electron')
const path = require('path')

let mainWindow
function createWindow() {
   mainWindow = new BrowserWindow({ width: 800, height: 600 })
   mainWindow.setMenu(null)
   mainWindow.setTitle('On hi')

   mainWindow.loadFile('./www/index.html')

   //mainWindow.webContents.openDevTools()
   mainWindow.on('closed', function () {
      mainWindow = null
   })
}
app.on('ready', createWindow)
app.on('activate', function () {
   // On OS X it's common to re-create a window in the app when the
   // dock icon is clicked and there are no other windows open.
   if (mainWindow === null) {
      createWindow()
   }
})

app.on('ready', () => {
   protocol.interceptStreamProtocol('file',
      (request, callback) => {
         console.log('intercept', request.url)
         const isWeb = request.url.indexOf('unpkg.com');

         if (isWeb > -1) {
            var url = request.url.split('file://').pop();
            console.log(url);
            callback({ path: path.normalize(`https://${url}`) })
         } else {
            callback({path: path.normalize(request.url)})
         }
      }, (error) => {
         console.log('------------------------------------------>error', error)
      }
   )
})

app.on('window-all-closed', function () {
   app.quit()
})
