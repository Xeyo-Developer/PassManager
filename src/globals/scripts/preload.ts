import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
    minimizeWindow: (): void => ipcRenderer.send("minimizeWindow"),
    maximizeWindow: (): void => ipcRenderer.send("maximizeWindow"),
    closeWindow: (): void => ipcRenderer.send("closeWindow"),

    fetchPasswords: (): Promise<any[]> => ipcRenderer.invoke("fetchPasswords"),
    
    addPassword: (options: {
        password: string,
        username: string,
        type: number
    }): void => ipcRenderer.send("addPassword", options),

    updatePassword: (id: number, options: {
        password: string,
        username: string,
        type: number
    }): void => ipcRenderer.send("updatePassword", id, options),

    deletePassword: (id: number): void => ipcRenderer.send("deletePassword", id),
    deleteAllPasswords: (): void => ipcRenderer.send("deleteAllPasswords"),

    makeDraggable: (element: HTMLElement): void => {
        (element.style as any).webkitAppRegion = 'drag';
    },
    makeUndraggable: (element: HTMLElement): void => {
        (element.style as any).webkitAppRegion = 'no-drag';
    }
});