const { app, BrowserWindow, ipcMain, Menu, dialog, powerMonitor, shell, powerSaveBlocker, Tray, globalShortcut, session } = require("electron");
const { isMacOS, isWinOS, useCustomTrafficLight, isDevEnv, USER_AGENTS, AUDIO_EXTS, IMAGE_EXTS, APP_ICON } = require("./env");
const path = require("path");
let mainWin = null,
  powerSaveBlockerId = -1,
  appTray = null;
const appWidth = 1080,
  appHeight = 720,
  maxAppSize = 102400;

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: appWidth,
    height: appHeight,
    minWidth: appWidth,
    minHeight: appHeight,
    titleBarStyle: "hidden",
    transparent: true,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      webSecurity: false //TODO 有风险，暂时保留此方案，留待后期调整
    }
  });

  if (isDevEnv) {
    mainWindow.loadURL("http://localhost:4000/");
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
  } else {
    // Load the index.html of the app.
    mainWindow.loadFile("dist/index.html");
  }

  return mainWindow;
};

const init = () => {
  app.whenReady().then(() => {
    mainWin = createWindow();
  });
};

/* 自定义函数 */
const startup = () => {
  init();
};

//启动应用
startup();
