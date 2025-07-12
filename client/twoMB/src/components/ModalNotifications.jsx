import React, { useEffect } from "react";

const ModalNotifications = () => {
  useEffect(() => {
    const modal = document.getElementById("headerNotificationModal");
    const closeBtn = document.getElementById("closeHeaderNotificationModal");

    const closeModal = () => {
      modal.classList.remove("show");
      setTimeout(() => {
        modal.style.display = "none";
      }, 300);
    };

    if (closeBtn) closeBtn.addEventListener("click", closeModal);
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
    <div className="header-modal-overlay" id="headerNotificationModal" style={{ display: "none" }}>
      <div className="header-modal-container">
        <div className="header-modal-header">
          <h3 className="header-modal-title">알림</h3>
          <button className="header-modal-close" id="closeHeaderNotificationModal">
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
          <div className="notification-list" id="notificationList">
            <div className="loading-container" id="notificationLoading" style={{ display: "none" }}>
              <div className="loading-spinner">
                <div className="spinner-ring"></div>
                <div className="spinner-ring"></div>
                <div className="spinner-ring"></div>
              </div>
              <p className="loading-text">알림을 불러오는 중...</p>
            </div>
          </div>
          <div className="empty-state" id="notificationEmptyState" style={{ display: "none" }}>
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
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <p>새로운 알림이 없습니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalNotifications;
