import React, { useEffect } from "react";

const ModalMyPosts = () => {
  useEffect(() => {
    const modal = document.getElementById("headerMyPostsModal");
    const closeBtn = document.getElementById("closeHeaderMyPostsModal");
    const filterPosts = document.getElementById("filterPosts");
    const filterComments = document.getElementById("filterComments");

    const closeModal = () => {
      modal.classList.remove("show");
      setTimeout(() => {
        modal.style.display = "none";
      }, 300);
    };

    if (closeBtn) {
      closeBtn.addEventListener("click", closeModal);
    }
    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          closeModal();
        }
      });
    }

    return () => {
      if (closeBtn) closeBtn.removeEventListener("click", closeModal);
    };
  }, []);

  return (
    <div className="header-modal-overlay" id="headerMyPostsModal" style={{ display: "none" }}>
      <div className="header-modal-container">
        <div className="header-modal-header">
          <h3 className="header-modal-title">내가 쓴 글</h3>
          <button className="header-modal-close" id="closeHeaderMyPostsModal">
            <svg
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
            >
              <line x1="18" x2="6" y1="6" y2="18" />
              <line x1="6" x2="18" y1="6" y2="18" />
            </svg>
          </button>
        </div>
        <div className="header-modal-body">
          <div className="filter-section">
            <label className="checkbox-container">
              <input type="checkbox" id="filterPosts" defaultChecked />
              <span className="checkbox-custom"></span>
              <span className="checkbox-label">게시글</span>
            </label>
            <label className="checkbox-container">
              <input type="checkbox" id="filterComments" defaultChecked />
              <span className="checkbox-custom"></span>
              <span className="checkbox-label">댓글</span>
            </label>
          </div>
          <div className="filter-info" id="filterInfo" style={{ display: "none" }}>
            <span>
              총 <span className="filter-count" id="filterCount">0</span>개의 결과
            </span>
          </div>
          <div className="content-list" id="myContentList">
            <div className="loading-container" id="contentLoading" style={{ display: "none" }}>
              <div className="loading-spinner">
                <div className="spinner-ring"></div>
                <div className="spinner-ring"></div>
                <div className="spinner-ring"></div>
              </div>
              <p className="loading-text">불러오는 중...</p>
            </div>
          </div>
          <div className="pagination-container" id="paginationContainer" style={{ display: "none" }}></div>
          <div className="empty-state" id="emptyState" style={{ display: "none" }}>
            <svg
              fill="none"
              height="48"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              width="48"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            <p>작성한 글이 없습니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalMyPosts;
