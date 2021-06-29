import { Component } from "react";
import "./secondPage.scss";

export default class ContentPage extends Component {
  state = {
    isCheckAll: false
  }

  componentDidMount() {
    console.log(this.props);
  }

  imageOnErrorHandle(e) { //使用默认图像
    e.target.src = require("./default.png").default
  }

  checkAll() {
    this.props.data.forEach(item => {
      return item.isCheck = !this.state.isCheckAll;
    });
    this.setState(() => ({ isCheckAll: !this.state.isCheckAll }))
  }

  createPageData() {
    //创建图片资源dom
    return this.props.data.map((item, index) => {
      return (
        <div className="image-show-box">
          {/* 资源图片预览 */}
          <img onError={this.imageOnErrorHandle.bind(this)} src={item.path} alt="图片资源" key={index} />
          {/* 资源图片名称 */}
          <div className="image-name">
            {item.name}
          </div>

          {/* checkBox */}
          <div className="check-box-image" style={{ borderColor: item.isCheck ? '#1890ff' : '', borderWidth: item.isCheck ? '6px' : '' }}></div>
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
            <div className="check-box-image-all" onClick={this.checkAll.bind(this)} style={{ borderColor: this.state.isCheckAll ? '#1890ff' : '', borderWidth: this.state.isCheckAll ? '8px' : '' }}></div>
          </div>
        </div>
        <div className="show-box">{this.createPageData()}</div>
      </div>
    );
  };
}
