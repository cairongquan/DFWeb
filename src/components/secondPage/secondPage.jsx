import { Component } from "react";
import { Input } from "antd";
import "./secondPage.scss";

export default class ContentPage extends Component {
  state = {
    isCheckAll: false,
    index: null,
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
                borderColor: this.state.isCheckAll && this.props.data.length ? "#1890ff" : "",
                borderWidth: this.state.isCheckAll && this.props.data.length ? "8px" : "",
              }}
            ></div>
          </div>

          <div className="tool-box-main-item">
            <span>已选择 :</span>
            <div className="isCheck-num-box">
              {this.props.data.filter((item) => item.isCheck).length}
            </div>
          </div>

          <div className="tool-box-main-item">
            <span>存放地址 :</span>
            <Input className="input-address-put" placeholder="请输入存放目录"></Input>
          </div>

          {/* 确认下载按钮 */}
          <div className="enter-download-btn" >
            <i className="iconfont icon-xiazai2"></i>
            <span>确认下载</span>
          </div>
        </div>
        <div className="show-box">{this.createPageData()}</div>
      </div>
    );
  };
}
