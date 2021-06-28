import { message } from "antd";
import axios from "axios";
export const seachModuleJs = {
    clickSeachHandle: async function () { //搜索按钮点击事件
        if (!this.state.inputValue) {
            return message.warn("请输入网址!")
        }
        if (!this.isUrl(this.state.inputValue)) {
            return message.error("网址格式错误!");
        }
        this.setState(() => ({
            isLoad: true
        }))
        const { data: res } = await axios.get("http://localhost:9012/handle/", {
            params: {
                url: this.state.inputValue
            }
        });
        console.log(res);
        this.setState(() => ({
            isLoad: false
        }))

    }
}