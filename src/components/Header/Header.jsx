import react from "react";
import renderJS from "./headerRender.js";

const {ipcRenderer} = window.require("electron");

export default class HeaderCom extends react.Component {
    state = {
        headLogo: require("./images/Untitled.png").default,
        iconfontMaxIcon: "iconfont icon-yk_fangkuai",
    }


    minHandle() { //窗口缩小事件
        ipcRenderer.send("min-window");
    }

    closeHandle() { //关闭窗口事件
        ipcRenderer.send("close-window");
    }

    maxWindow() { //方法/缩小 窗口
        if (this.state.iconfontMaxIcon === "iconfont icon-yk_fangkuai") {
            this.setState(() => {
                return {
                    iconfontMaxIcon: "iconfont icon-huifuxi"
                }
            })
        } else {
            this.setState(() => {
                return {
                    iconfontMaxIcon: "iconfont icon-yk_fangkuai"
                }
            })
        }
        ipcRenderer.send("max");
    }

    render() {
        return renderJS.call(this);
    }
}
