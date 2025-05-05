import { BrowserWindow } from "electron";
import { join } from "path";

class DesktopWindow {
    public static instance: BrowserWindow | null = null;

    public static async createWindow(): Promise<void> {
        const window: BrowserWindow = new BrowserWindow({
            width: 800,
            height: 600,
            minWidth: 800,
            minHeight: 600,
            center: true,
            webPreferences: {
                preload: join(__dirname, "scripts", "preload.js"),
                nodeIntegration: false,
                contextIsolation: true,
            },
            icon: join(process.cwd(), "resources/assets/imgs/logo.png"),
            autoHideMenuBar: true,
            title: "Window",
            titleBarStyle: "hidden",
        });

        await window.loadFile(join(process.cwd(), "./resources/views/index.html"));
        this.instance = window;
    }
}

export { DesktopWindow };
