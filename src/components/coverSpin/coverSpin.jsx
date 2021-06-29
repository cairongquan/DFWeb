import { Component } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "./coverSpin.scss";
// 遮罩层 加载
export default class CoverSpin extends Component {
  componentDidMount() {
    //组件挂载钩子函数
  }

  antIcon = (
    <LoadingOutlined style={{ fontSize: 160, fontWeight: 100 }} spin />
  );

  render() {
    return (
      <div
        className="main-mask-box"
        style={{
          zIndex: this.props.state ? 1 : -1,
          opacity: this.props.state ? 1 : 0,
          backdropFilter: this.props.state ? "blur(25px)" : "",
        }}
      >
        {/* 加载组件 */}
        <Spin className="wrap-load-com" indicator={this.antIcon}></Spin>
      </div>
    );
  }
}
