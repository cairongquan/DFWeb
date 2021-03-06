// const serve = require("./app/app");
const { app, BrowserWindow } = require('electron');
const ipc = require('electron').ipcMain;
const path = require("path");
var win;

// 启动node服务器 9012端口
// try {
//     serve.listen(9012, () => {
//         console.log("👌run successful!");
//     })
// } catch (e) {
//     console.log(e);
// }

function createWindow() {
    // 创建浏览器窗口。
    win = new BrowserWindow({ //
        minHeight: 600,
        useContentSize: true,
        minWidth: 800,//宽
        frame: false,//无边框
        resizable: true,//用户可拖拽大小尺寸
        transparent: false, //背景是否透明
        thickFrame: true,
        webPreferences: {
            // preload: path.join(__dirname + '/preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
        }
    })

    // 然后加载应用的 index.html。  url 及本地文件形式
    win.loadURL('http://localhost:3000')
    // win.loadFile('public/index.html')
    //如果想要让electron加载本地打包好的React文件的build文件下的内容是这样子的：(这个问题困扰我很久，解决了。分享下2019-4-29添加)
    // win.loadURL(`file://${path.join(__dirname, '../../build/index.html')}`)

    // 打开开发者工具
    win.webContents.openDevTools()

    // 当 window 被关闭，这个事件会被触发。
    win.on('closed', () => {
        // 取消引用 window 对象，如果你的应用支持多窗口的话，
        // 通常会把多个 window 对象存放在一个数组里面，
        // 与此同时，你应该删除相应的元素。
        win = null
    })
}

// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分 API 在 ready 事件触发后才能使用。
app.on('ready', createWindow)

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
    // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
    // 否则绝大部分应用及其菜单栏会保持激活。
    if (process.platform !== 'darwin') {
        app.quit()
    }
})


//ipc监听进程
// console.log(ipc);
ipc.on("min-window", () => { //缩小窗口
    win.minimize();
})

ipc.on('close-window', () => { //关闭窗口
    win.close();
})

ipc.on('max', () => { //方法/恢复窗口
    if (win.isMaximized()) {
        return win.restore();
    } else {
        win.maximize();
    }
})

app.on('activate', () => {
    // 在macOS上，当单击dock图标并且没有其他窗口打开时，
    // 通常在应用程序中重新创建一个窗口。
    if (win === null) {
        createWindow()
    }
})


// 在这个文件中，你可以续写应用剩下主进程代码。
// 也可以拆分成几个文件，然后用 require 导入
