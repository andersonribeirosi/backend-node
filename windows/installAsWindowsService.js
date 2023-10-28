// > npm i -g node-windows
// on dist dir> npm link node-windows
// on dist dir (the installAsWindowsService.js file must be contained in the directory)> node installAsWindowsService

const Service = require('node-windows').Service
const path = require('path')

// Create a new service object
const svc = new Service({
  name: 'SL7 Tecnologia - Rifa Api',
  description: 'rifa.app.server.express.ts',
  script: path.resolve(__dirname, 'index.js')
})

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install', function () {
  svc.start()
})

svc.install()

// TO DELETE SERVICE
// sc stop sl7tecnologiarifaapi.exe
// sc delete sl7tecnologiarifaapi.exe
