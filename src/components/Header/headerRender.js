import "./Header.scss"

export default function renderJs() {
    return (
        <div className="main-header-box">
            <div className="header-logo-box">
                <img src={this.state.headLogo} alt="logo_picturs" />
                <span>DfWeb</span>
            </div>


            {/* 操作栏 */}
            <div className="tool-area-box">
                <div className="tool-item" onClick={this.minHandle.bind(this)}>
                    <i className="iconfont icon-hr"></i>
                </div>
                <div className="tool-item" onClick={this.maxWindow.bind(this)}>
                    <i className={this.state.iconfontMaxIcon}></i>
                </div>
                <div className="tool-item close-btn" onClick={this.closeHandle.bind(this)}>
                    <i className="iconfont icon-quxiao"></i>
                </div>
            </div>
        </div>
    )
}
