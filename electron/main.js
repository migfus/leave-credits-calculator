import { app, BrowserWindow, protocol } from "electron"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

protocol.registerSchemesAsPrivileged([
	{
		scheme: "app",
		privileges: {
			standard: true,
			secure: true,
			supportFetchAPI: true,
			corsEnabled: true
		}
	}
])

// Ensure Electron can always write its caches/user data.
app.setPath(
	"userData",
	path.join(app.getPath("appData"), "leave-balance-calculator-electron")
)

app.commandLine.appendSwitch(
	"disk-cache-dir",
	path.join(app.getPath("userData"), "Cache")
)

app.setName("Leave Balance Calculator")

function createWindow() {
	const zoomFactor = Number.parseFloat(process.env.ELECTRON_ZOOM ?? "0.8")
	const safeZoomFactor = Number.isFinite(zoomFactor)
		? Math.min(2, Math.max(0.25, zoomFactor))
		: 0.8

	const win = new BrowserWindow({
		title: "Leave Balance Calculator",
		width: 450,
		height: 850,
		autoHideMenuBar: true,
		icon: path.join(__dirname, "..", "assets", "images", "icon.png"),
		webPreferences: {
			contextIsolation: true
		}
	})

	// On Windows/Linux, this removes the top menu (File/Edit/View...).
	// (macOS uses the global application menu; this doesn't affect it.)
	win.setMenuBarVisibility(false)

	win.webContents.on("did-finish-load", () => {
		win.webContents.setZoomFactor(safeZoomFactor)
	})

	// Use the app root so Expo Router starts at '/' (not '/index.html').
	win.loadURL("app://./")
}

app.whenReady().then(() => {
	protocol.registerFileProtocol("app", (request, callback) => {
		try {
			const url = request.url.replace(/^app:\/\//, "")
			const decodedUrl = decodeURI(url)
			const relativePath = decodedUrl.replace(/^\.?\//, "")
			const resolvedPath = path.join(
				__dirname,
				"dist",
				relativePath.length ? relativePath : "index.html"
			)

			callback({ path: resolvedPath })
		} catch {
			callback({ path: path.join(__dirname, "dist", "index.html") })
		}
	})

	createWindow()
})
