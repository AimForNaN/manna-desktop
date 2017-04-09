function escapePath (path) {
	return path.replace(/\\/g, '\\\\');
}

const {app, BrowserWindow, session} = require('electron');
const path = require('path');
const url = require('url');

const AppPath      = app.getAppPath();
const AppResources = process.resourcesPath;
const NodeModules  = escapePath(path.resolve(AppPath, 'node_modules'));

require('electron-context-menu')({
	showInspectElement: true
});

// Disable cache!
app.commandLine.appendSwitch('disable-http-cache');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow () {
	// Disable cache!
	session.fromPartition('', { cache: false });

	// Create the browser window.
	win = new BrowserWindow({width: 800, height: 600});

	// Remove menu!
	// win.setMenu(null);

	// and load the index.html of the app.
	win.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file:',
		slashes: true
	}));

	// Open the DevTools.
	// win.webContents.openDevTools()

	win.webContents.on('dom-ready', () => {
		win.webContents.executeJavaScript(`
			module.paths.push('${NodeModules}');
		`);

		win.maximize();
	});

	win.on('closed', () => {
		win = null;
	});
}

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
})

app.on('activate', () => {
	if (win === null) {
		createWindow();
	}
})
