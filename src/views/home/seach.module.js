import { message } from "antd";
import Item from "antd/lib/list/Item";
import axios from "axios";
export const seachModuleJs = {
    clickSeachHandle: async function () { //搜索按钮点击事件
        if (!this.state.inputValue) {
            return message.warn({ content: "请输入网址!", duration: 1 })
        }
        if (!this.isUrl(this.state.inputValue)) {
            return message.error("网址格式错误!");
        }
        this.setState(() => ({
            isLoad: true
        }))
        // 请求解析url
        const { data: res } = await axios.get("http://localhost:9012/handle/", {
            params: {
                url: this.state.inputValue
            }
        });

        // 关闭加载组件
        setTimeout(() => {
            this.setState(() => ({
                isLoad: false
            }));
        }, 420)

        // 500(250ms) => 1000(250ms)

        // 跳转next page
        setTimeout(() => {
            if (res.code !== 0) {
                return message.error({ content: "很抱歉,无法解析目标网站资源或者该网站无资源", duration: 3 });
            }
            this.setState(() => ({
                activePage: `-50%`,
                imageData: res.data.map((item) => ({ name: item.name, path: item.path, isCheck: false }))
            }));
            console.log(this.state.imageData);
            message.success({ content: "资源获取成功", duration: 1 });
        }, 1300);
    }
}