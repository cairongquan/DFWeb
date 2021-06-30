import { seachModuleJs } from "./seach.module";
import react from "react";
import "./home.scss";
import { Input, message } from "antd";
import CoverSpin from "../../components/coverSpin/coverSpin.jsx";
import ContentPage from "../../components/secondPage/secondPage.jsx";
import axios from "axios";

const clipboardy = window.require("clipboardy");
const shell = window.require("electron").shell;

export default class HomeCom extends react.Component {
  constructor() {
    super();
    for (let key in seachModuleJs) {
      this[`${key}`] = seachModuleJs[key];
    }
  }
  logo = require("./images/logo.png").default; // logo

  state = {
    isLoad: false,
    inputValue: "",
    activePage: 0, //当前激活的PageNum
    imageData: [], // 图片数据存储
  };

  componentDidMount() {
    this.requireOsInfo();
  }

  async requireOsInfo() {
    //请求信息
    const { data: res } = await axios.get(
      "http://localhost:9012/handle/osInfo"
    );
  }

  isUrl(string) {
    //匹配正则
    const reg =
      /^((http|https):\/\/)?(([A-Za-z0-9]+-[A-Za-z0-9]+|[A-Za-z0-9]+)\.)+([A-Za-z]+)[/\?\:]?.*$/;
    return reg.test(string);
  }

  focusInputHandle(e) {
    //聚焦事件
    const targetDom = e.target;
    targetDom.style.boxShadow = "2px 2px 15px 1px rgba(0,0,0,.1)";
  }

  cutFromHandle() {
    //剪切板按钮点击事件
    let readVal = null;
    try {
      readVal = clipboardy.readSync();
    } catch (e) {
      console.log(e);
    }
    if (this.isUrl(readVal)) {
      //正则验证通过
      this.setState(() => ({
        inputValue: readVal,
      }));
      message.success({ content: "粘贴成功!", duration: 1 });
    } else {
      message.error({ content: "网址格式错误,粘贴失败!", duration: 1 });
    }
  }

  inputChangeHandle(e) {
    this.setState(() => ({
      inputValue: e.target.value,
    }));
  }

  jumpToMyGitHub() {
    //打开我的gitHub
    shell.openExternal("https://github.com/cairongquan");
  }

  // 返回按钮点击事件
  backHome() {
    this.setState(() => ({
      imageData: [],
      activePage: 0,
    }));
  }

  render() {
    return (
      // 外层盒子
      <div className="main-out-box">
        <CoverSpin state={this.state.isLoad}></CoverSpin>
        {/* 滑动页面盒子 */}
        <div
          className="out-scroll-box"
          style={{ transform: `translateX(${this.state.activePage})` }}
        >
          {/* 下载 */}
          {/* 搜索框主界面 */}
          <div className="first-main-page">
            <div className="seach-main-box">
              <div className="input-name-box">
                <span>输入资源网址 :</span>
              </div>
              <Input
                onChange={this.inputChangeHandle.bind(this)}
                value={this.state.inputValue}
                spellCheck="false"
                placeholder="请输入网址:http://www.xxxx.com"
              />
              <div className="input-btn-group">
                <div
                  className="input-btn-fromCut"
                  onClick={this.cutFromHandle.bind(this)}
                >
                  <span>粘贴自剪切板</span>
                  <i className="iconfont icon-fuzhi1"></i>
                </div>
                <div
                  onClick={this.clickSeachHandle.bind(this)}
                  className="input-btn-fromCut beginBtn"
                  style={{
                    backgroundColor: this.state.inputValue ? "#1890ff" : "",
                  }}
                >
                  <span>开始搜索资源</span>
                  <i className="iconfont icon-sousuo"></i>
                </div>
              </div>
            </div>

            <div className="bottom-beta-info">
              <span>@DownloadFromWeb</span>
              <span>v0.01</span>
              <div className="bottom-author">
                <span onClick={this.jumpToMyGitHub}>
                  <i
                    className="iconfont icon-github"
                    style={{ margin: "0px 5px" }}
                  ></i>
                  design by cairongquan
                </span>
              </div>
            </div>
          </div>

          {/* 下载页面 */}
          <div className="second-page-box">
            {/* 头部 */}
            <header className="second-page-box-header">
              <div className="back-btn" onClick={this.backHome.bind(this)}>
                <i className="iconfont icon-jiantou1"></i>
                <span>返回</span>
              </div>
            </header>
            <ContentPage data={this.state.imageData}></ContentPage>
          </div>
        </div>
      </div>
    );
  }
}
