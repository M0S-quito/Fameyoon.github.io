import React, { useEffect } from "react";

const MedalModal = () => {
  useEffect(() => {
    const modal = document.getElementById("completed-channels-modal");
    const btn = document.getElementById("completed-channels-btn");
    const closeBtn = document.querySelector(".close-modal");

    if (btn) {
      btn.addEventListener("click", () => {
        modal.style.display = "block";
      });
    }
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
      });
    }
    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });

    return () => {
      btn?.removeEventListener("click", () => {});
      closeBtn?.removeEventListener("click", () => {});
    };
  }, []);

  return (
    <div className="modal" id="completed-channels-modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3>학습 완료된 채널</h3>
          <span className="close-modal">×</span>
        </div>
        <div className="modal-body">
          <div className="empty-message">
            <p>아직 학습 완료된 채널이 없습니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedalModal;
