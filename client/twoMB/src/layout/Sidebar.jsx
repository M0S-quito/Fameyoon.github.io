export default function Sidebar() {
  return (
    <div className="tubelab-sidebar" id="sidebar">
      <div className="sidebar-logo">
        <div className="logo-box" style={{ backgroundColor: '#FF0033' }} />
        <div className="logo-text">튜브랩</div>
      </div>
      <div className="sidebar-menu">
        <div className="menu-section"><div>대시보드</div></div>
        <div className="menu-section"><div>영상 업로드 캘린더</div></div>
        <div className="menu-section"><div>나의 미션</div></div>
      </div>
    </div>
  );
}
