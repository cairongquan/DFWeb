import { Component } from "react";
import "./secondPage.scss";

export default class ContentPage extends Component {
  componentDidMount() {
    console.log(this.props);
  }

  createPageData() {
    //创建图片资源dom
    return this.props.data.map((item, index) => {
      return <img src={`https://images.weserv.nl/?url=`+item.path} alt="图片资源" key={index} />;
    });
  }

  render = function () {
    return (
      <div className="main-out-box-secondPage">
        <div className="show-box">{this.createPageData()}</div>
      </div>
    );
  };
}
