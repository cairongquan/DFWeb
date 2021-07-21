import { Component } from "react";
import { Input, Tooltip } from "antd";
import uplaodImageUrlEvent from "./uplaodImageUrlEvent";
import axios from "axios";
import { InfoCircleOutlined } from "@ant-design/icons";
import "./secondPage.scss";

export default class ContentPage extends Component {
  $axios = null;
  constructor(props) {
    super(props);
    this.$axios = axios;
  }
  state = {
    isCheckAll: false,
    index: null,
    putAddressVal: "", //本地存放地址
    urlCode: "",
  };

  componentDidMount() {
    console.log(this.props);
  }

  imageOnErrorHandle(e) {
    //使用默认图像
    e.target.src = require("./default.png").default;
  }

  checkAll() {
    //全选事件
    this.props.data.forEach((item) => {
      item.isCheck = !this.state.isCheckAll;
    });
    this.setState(() => ({ isCheckAll: !this.state.isCheckAll }));
  }

  clickItemHandle(index) {
    //点击图片item选择事件
    this.props.data[index].isCheck = !this.props.data[index].isCheck;
    if (this.props.data.findIndex((item) => !item.isCheck) === -1) {
      return this.setState(() => ({ isCheckAll: true }));
    }
    this.setState(() => ({ index: index, isCheckAll: false }));
  }

  inputChangeHandle(e) {
    //输入框输入事件
    this.setState(() => ({ putAddressVal: e.target.value }));
  }

  inputChangeHandleCode(e) {
    //网站补码输入事件
    this.setState(() => ({ urlCode: e.target.value }));
  }

  // startLoad
  startLoad = () => {
    this.props.startLoad();
  };
  // clearLoad
  clearLoad = () => {
    this.props.clearLoad();
  };

  createPageData() {
    //创建图片资源dom
    return this.props.data.map((item, index) => {
      return (
        <div
          className="image-show-box"
          onClick={this.clickItemHandle.bind(this, index)}
        >
          {/* 资源图片预览 */}
          <img
            onError={this.imageOnErrorHandle.bind(this)}
            src={item.path}
            alt="图片资源"
            key={index}
          />
          {/* 资源图片名称 */}
          <div className="image-name">{item.name}</div>

          {/* checkBox */}
          <div
            className="check-box-image"
            style={{
              borderColor: item.isCheck ? "#1890ff" : "",
              borderWidth: item.isCheck ? "6px" : "",
            }}
          ></div>
        </div>
      );
    });
  }

  render = function () {
    return (
      <div className="main-out-box-secondPage">
        <div className="tool-box-main">
          <div className="tool-box-main-item">
            <span>全选 :</span>
            <div
              className="check-box-image-all"
              onClick={this.checkAll.bind(this)}
              style={{
                borderColor:
                  this.state.isCheckAll && this.props.data.length
                    ? "#1890ff"
                    : "",
                borderWidth:
                  this.state.isCheckAll && this.props.data.length ? "8px" : "",
              }}
            ></div>
          </div>

          <div className="tool-box-main-item">
            <span>已选择 :</span>
            <div
              className="isCheck-num-box"
              style={{ minWidth: "20px", textAlign: "center" }}
            >
              {this.props.data.filter((item) => item.isCheck).length}
            </div>
          </div>

          <div className="tool-box-main-item">
            <span className="tip-box" style={{ width: "10px" }}>
              *
            </span>
            <span>存放地址 :</span>
            <Input
              onChange={this.inputChangeHandle.bind(this)}
              value={this.state.putAddressVal}
              className="input-address-put"
              placeholder="请输入存放目录"
            ></Input>
          </div>

          <div className="tool-box-main-item">
            <span style={{ width: "65px" }}>补码 :</span>
            <Input
              onChange={this.inputChangeHandleCode.bind(this)}
              value={this.state.urlCode}
              className="input-address-put"
              placeholder="请输入网站资源头部补码(选填)"
            ></Input>
            <Tooltip
              placement="topLeft"
              title={`
              补码用于当前图片资源网站的资源服务器url地址，例如:
              https://pic.netbian.com/+"图片资源",https://pic.netbian.com/就是补码,不是必填项,当资源获取不到时可以作为解决办法之一
            `}
            >
              <InfoCircleOutlined
                style={{ width: "20px", marginLeft: "5px", color: "#9ca3ab" }}
              />
            </Tooltip>
          </div>

          {/* 确认下载按钮 */}
          <div
            onClick={uplaodImageUrlEvent.bind(this)}
            className="enter-download-btn"
            style={{
              backgroundColor:
                this.state.putAddressVal &&
                  this.props.data.filter((item) => item.isCheck).length
                  ? "#1890ff"
                  : "",
            }}
          >
            <i className="iconfont icon-xiazai2"></i>
            <span>确认下载</span>
          </div>
        </div>
        <div className="show-box">{this.createPageData()}</div>
      </div>
    );
  };
}
