import { message } from "antd";
const electron = window.require("electron");
export default async function uploadEvent() { //上传事件
    const checkData = this.props.data.filter(item => item.isCheck);
    if (!checkData.length || !this.state.putAddressVal) {
        return message.error({ content: "请选择至少一个资源或填写存放地址", duration: 4 });
    }
    this.startLoad();
    let { data: resolve } = await this.$axios.post("http://localhost:9012/handle/putFile", {
        data: checkData,
        address: this.state.putAddressVal,
        urlCode: this.state.urlCode
    });
    setTimeout(() => {
        this.clearLoad();
    }, 2020)
    setTimeout(() => {
        if (resolve.code != 200) {
            message.error({ content: "失败或部分文件无法下载", duration: 4 });
        } else {
            message.success({ content: "文件下载成功", duration: 4 })
        }
        electron.shell.showItemInFolder(this.state.putAddressVal + "\\");
    }, 2300)
}