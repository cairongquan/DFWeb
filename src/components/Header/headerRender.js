import "./Header.scss"
export default function renderJs(react) {
    // console.log(this);
    return (
        <div className="main-header-box">
            <div className="header-logo-box">
                <img src={react.state.headLogo} alt="logo_picturs" />
                <span>DfWeb</span>
            </div>

            {/* 操作栏 */}
            <div className="tool-area-box">
                <div className="tool-item">
                    <i className="iconfont icon-hr"></i>
                </div>
            </div>
        </div>
    )
}