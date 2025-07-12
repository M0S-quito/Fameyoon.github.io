import React, { useEffect, useState } from "react";

const Header = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    const handleClickOutside = () => {
      setShowProfileMenu(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const toggleProfileMenu = (e) => {
    e.stopPropagation();
    setShowProfileMenu((prev) => !prev);
  };

  const handleNotificationClick = (e) => {
    e.stopPropagation();
    if (typeof window.openHeaderNotificationModal === "function") {
      window.openHeaderNotificationModal();
    }
  };

  const handleMyPostsClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof window.openHeaderMyPostsModal === "function") {
      window.openHeaderMyPostsModal();
    }
    setShowProfileMenu(false);
  };

  return (
    <header className="tubelab-header sidebar-open" id="header">
      <div className="header-left">
        <div className="menu-toggle" id="mobileMenuToggle">
          <svg height="24" width="24" viewBox="0 0 24 24">
            <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2" />
            <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2" />
            <line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
        <div className="sidebar-toggle" id="toggleSidebar">
          <div className="sidebar-toggle-icon" id="sidebarToggleIcon">
            <div className="sidebar-icon">{/* 펼침 아이콘 */}</div>
            <div className="close-icon">{/* 접기 아이콘 */}</div>
          </div>
        </div>
      </div>
      <div className="header-right">
        <div className="notification-button" id="notificationButton" onClick={handleNotificationClick}>
          <svg height="24" width="24" viewBox="0 0 24 24">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
        </div>
        <div className="profile-container" id="profileContainer" onClick={toggleProfileMenu}>
          <div className="profile-avatar">M0S_quito</div>
          <div className="profile-info">
            <div className="profile-nickname">M0S_quito</div>
            <div className="profile-name">M0S_quito</div>
            <div className="profile-id">M0S_quito</div>
          </div>
          <div className="profile-dropdown">
            <svg height="16" width="16" viewBox="0 0 24 24">
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
          </div>
          {showProfileMenu && (
            <div className="profile-menu" id="profileMenu">
              <div className="profile-menu-section">정보 변경</div>
              <div className="profile-menu-divider"></div>
              <div className="profile-menu-section" id="myPostsBtn" onClick={handleMyPostsClick}>내가 쓴 글</div>
              <div className="profile-menu-divider"></div>
              <div className="profile-menu-section logout-item">로그아웃</div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
