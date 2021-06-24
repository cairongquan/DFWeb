import react from "react";
import renderJS from "./headerRender.js";


export default class HeaderCom extends react.Component {
    state = {
        headLogo: require("./images/Untitled.png").default,
    }

    render() {
        return renderJS(this);
    }
}