import React, { useEffect } from "react";

const Sidebar = () => {
  useEffect(() => {
    const sidebar = document.getElementById("sidebar");
    const header = document.getElementById("header");
    const closeSidebarBtn = document.getElementById("closeMobileSidebarBtn");
    const toggleSidebar = document.getElementById("toggleSidebar");
    const toggleIcon = document.getElementById("sidebarToggleIcon");

    if (toggleSidebar && sidebar) {
      toggleSidebar.addEventListener("click", () => {
        sidebar.classList.toggle("collapsed");
        const isCollapsed = sidebar.classList.contains("collapsed");
        if (toggleIcon) toggleIcon.classList.toggle("collapsed", isCollapsed);
        if (header) header.classList.toggle("sidebar-open", !isCollapsed);

        if (typeof window.updateLayoutForSidebar === "function") {
          window.updateLayoutForSidebar(isCollapsed);
        }
      });
    }

    if (closeSidebarBtn && sidebar) {
      closeSidebarBtn.addEventListener("click", () => {
        sidebar.classList.remove("active");
      });
    }
  }, []);

  return (
    <div className="tubelab-sidebar" id="sidebar">
      <div className="sidebar-logo">
        <div className="logo-box" style={{ backgroundColor: "#FF0033" }}></div>
        <div className="logo-text">튜브랩</div>
        <button
          aria-label="사이드바 닫기"
          className="sidebar-close-button"
          id="closeMobileSidebarBtn"
        >
          <i className="far fa-times-circle"></i>
        </button>
      </div>
      <div className="sidebar-menu">
        <div className="menu-section">
          <div>
            <i className="fas fa-home"></i>
            대시보드
          </div>
        </div>
        <div className="menu-section">
          <div>
            <i className="fas fa-calendar"></i>
            영상 업로드 캘린더
          </div>
        </div>
        <div className="menu-section">
          <div className="menu-title has-submenu" data-menu-id="group_missions">
            <div>
              <i className="fas fa-tasks"></i>
              나의 미션
            </div>
            <i className="arrow fas fa-chevron-right"></i>
          </div>
          미션관리
        </div>
        <div className="menu-section">
          <div className="menu-title has-submenu" data-menu-id="group_learning">
            <div>
              <i className="fas fa-pen-alt"></i>
              콘텐츠 학습
            </div>
            <i className="arrow fas fa-chevron-right"></i>
          </div>
          채널 분석기
          채널 목록
          카테고리 관리
        </div>
        <div className="menu-section">
          <div>
            <i className="fas fa-book-open"></i>
            학습자료 게시판
          </div>
        </div>
        <div className="menu-section">
          <div className="menu-title has-submenu" data-menu-id="group_workshop">
            <div>
              <i className="fas fa-tools"></i>
              콘텐츠 작업실
            </div>
            <i className="arrow fas fa-chevron-right"></i>
          </div>
          원고작성
          화자 변환기
          커뮤니티 검색 도구
          SRT 분리 도구
        </div>
        <div className="menu-section">
          <div className="menu-title has-submenu" data-menu-id="group_community">
            <div>
              <i className="fas fa-users"></i>
              커뮤니티
            </div>
            <i className="arrow fas fa-chevron-right"></i>
          </div>
          공지사항
          실습자료
          교육자료
          유튜브문의
          프로그램문의
        </div>
        <div className="menu-section">
          <div className="menu-title has-submenu" data-menu-id="group_guidebook">
            <div>
              <i className="fas fa-briefcase"></i>
              미큐 가이드북
            </div>
            <i className="arrow fas fa-chevron-right"></i>
          </div>
          미큐 칼럼
          실전 노하우
        </div>
        <div className="menu-section">
          <div>
            <i className="fas fa-seedling"></i>
            우리의 성장 기록실
          </div>
          <span className="notification-badge">N</span>
        </div>
        <div className="menu-section">
          <div>
            <i className="fas fa-trophy"></i>
            트로피룸
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
