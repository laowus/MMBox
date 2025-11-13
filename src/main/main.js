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

  // //配置请求过滤
  // const filter = {
  //   urls: ["*://*.qq.com/*", "*://music.163.com/*", "*://*.126.net/*", "*://*.kuwo.cn/*", "*://*.kugou.com/*", "*://*.douban.com/*", "*://*.doubanio.com/*", "*://*.ridio.cn/*", "*://*.cnr.cn/*"]
  // };
  // const webSession = mainWindow.webContents.session;
  // webSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
  //   overrideRequest(details);
  //   callback({ requestHeaders: details.requestHeaders });
  // });

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

//覆盖(包装)请求
const overrideRequest = (details) => {
  let origin = null;
  let referer = null;
  let cookie = null;
  let userAgent = null;

  const url = details.url;
  if (url.includes("qq.com")) {
    origin = "https://y.qq.com/";
    referer = origin;
  } else if (url.includes("music.163.com") || url.includes("126.net")) {
    origin = "https://music.163.com/";
    referer = origin;
    //if(url.includes("/dj/program/listen")) referer = null
  } else if (url.includes("kuwo")) {
    const CSRF = randomTextWithinAlphabetNums(11).toUpperCase();
    origin = "https://www.kuwo.cn/";
    referer = origin;
    cookie = "kw_token=" + CSRF;
    details.requestHeaders["CSRF"] = CSRF;
  } else if (url.includes("kugou")) {
    origin = "https://www.kugou.com/";
    referer = origin;
    if (url.includes("mac.kugou.com")) userAgent = USER_AGENT_APPLE;
  } else if (url.includes("douban")) {
    const bid = randomTextWithinAlphabetNums(11);
    origin = "https://fm.douban.com/";
    referer = origin;
    cookie = "bid=" + bid;
    //cookie = 'bid=' + bid + '; __utma=30149280.1685369897.1647928743.1648005141.1648614477.3; __utmz=30149280.1648005141.2.2.utmcsr=cn.bing.com|utmccn=(referral)|utmcmd=referral|utmcct=/; _pk_ref.100001.f71f=%5B%22%22%2C%22%22%2C1650723346%2C%22https%3A%2F%2Fmusic.douban.com%2Ftag%2F%22%5D; _pk_id.100001.f71f=5c371c0960a75aeb.1647928769.4.1650723346.1648618102.; ll="118306"; _ga=GA1.2.1685369897.1647928743; douban-fav-remind=1; viewed="2995812"; ap_v=0,6.0'
  } else if (url.includes("radio.cn") || url.includes("cnr.cn")) {
    origin = "http://www.radio.cn/";
    referer = origin;
  } else if (url.includes("qingting")) {
    origin = "https://www.qingting.fm/";
    referer = origin;
  } else if (url.includes("ximalaya")) {
    origin = " https://www.ximalaya.com";
    referer = origin;
  }

  /*
  details.requestHeaders['Access-Control-Allow-Headers'] = "Origin, X-Requested-With, Content-Type, Accept"
  details.requestHeaders['Access-Control-Allow-Origin'] = "*"
  */

  //if(origin) details.requestHeaders['Origin'] = origin
  if (userAgent) details.requestHeaders["UserAgent"] = userAgent;
  if (referer) details.requestHeaders["Referer"] = referer;
  if (cookie) details.requestHeaders["Cookie"] = cookie;
};

//启动应用
startup();
