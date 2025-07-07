import { BrowserWindow, shell, app } from "electron";
import { join } from "path";
import dotenv from "dotenv";

dotenv.config();

const APP_ICON_PATH = join(
    process.cwd(),
    "./resources/assets/imgs/logo.ico"
);

class DesktopWindow {
    public static instance: BrowserWindow | null = null;
    public static DESKTOP_APP_MODE: boolean = process.env.DESKTOP_APP_MODE === 'development';

    public static async createWindow(): Promise<void> {
        if (this.instance) {
            this.instance.focus();
            return;
        }

        const window: BrowserWindow = new BrowserWindow({
            width: 900,
            height: 600,
            minWidth: 600,
            minHeight: 400,
            center: true,
            webPreferences: {
                preload: join(__dirname, "scripts", "preload.js"),
                nodeIntegration: false,
                contextIsolation: true,
                sandbox: true,
            },
            icon: APP_ICON_PATH,
            autoHideMenuBar: true,
            title: "Window",
            titleBarStyle: "hidden",
            frame: false,
            show: false,
        });

        if (process.platform === 'win32') {
            app.setAppUserModelId("com.xeyo.passmanager");
        }

        if (this.DESKTOP_APP_MODE && process.platform === 'darwin') {
            try {
                if (app.dock && typeof app.dock.setIcon === 'function') {
                    app.dock.setIcon(APP_ICON_PATH);
                }
            } catch (e) {
                console.error('Failed to set dock icon:', e);
            }
        }

        try {
            await window.loadFile(join(process.cwd(), "./resources/views/index.html"));
            window.show();
        } catch (error) {
            console.error('Failed to load window content:', error);
            window.destroy();
            return;
        }

        window.webContents.setWindowOpenHandler(({ url }) => {
            if (url.startsWith('https:')) {
                shell.openExternal(url);
            }
            return { action: 'deny' };
        });

        window.on('closed', () => {
            this.instance = null;
        });

        this.instance = window;
    }

    public static closeWindow(): void {
        if (this.instance) {
            this.instance.close();
            this.instance = null;
        }
    }
}

export { DesktopWindow };