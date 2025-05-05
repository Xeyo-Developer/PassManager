const minimizeWindow = document.getElementById("minimizeWindow");
const maximizeWindow = document.getElementById("maximizeWindow");
const closeWindow = document.getElementById("closeWindow");

if (!window.electron) window.electron = {};

if (window.electron) {
    minimizeWindow?.addEventListener("click", () => {
        if (typeof window.electron.minimizeWindow === "function") {
            window.electron.minimizeWindow();
        }
    });

    maximizeWindow?.addEventListener("click", () => {
        if (typeof window.electron.maximizeWindow === "function") {
            window.electron.maximizeWindow();
        }
    });

    closeWindow?.addEventListener("click", () => {
        if (typeof window.electron.closeWindow === "function") {
            window.electron.closeWindow();
        }
    });
}