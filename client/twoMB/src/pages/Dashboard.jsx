import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ModalMyPosts from "../components/ModalMyPosts";
import ModalNotifications from "../components/ModalNotifications";
import MedalModal from "../components/MedalModal";

const Dashboard = () => {
  return (
    <div className="app-container">
      <Header />
      <ModalMyPosts />
      <ModalNotifications />
      <div className="main-container">
        <div className="mobile-menu-overlay" id="mobileMenuOverlay" />
        <Sidebar />
        <div className="main-content">
          <div className="content">
            <div className="container">
              <h1 className="section-title">튜브랩 대시보드</h1>
              <div className="dashboard-grid">
                {/* 노션 카드 예시 */}
                <div className="dashboard-card notion-card">
                  <div className="notion-content">
                    <div className="notion-icon">
                      <span style={{ fontSize: "60px" }}>📝</span>
                    </div>
                    <div className="notion-text">
                      <h3>
                        1기 수강생
                        <br /> 학습 자료
                      </h3>
                      <p>노션 보러가기</p>
                      <span className="notion-cta">
                        바로가기 <i className="fas fa-external-link-alt" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* 메달 컬렉션 */}
                <div className="dashboard-card">
                  <h2 className="dashboard-card-title">
                    <i className="fas fa-award" /> 메달 컬렉션
                  </h2>
                  <div className="medal-collection">
                    {[
                      ["completion", "🏆", "트로피"],
                      ["gold", "🥇", "금메달"],
                      ["silver", "🥈", "은메달"],
                      ["bronze", "🥉", "동메달"],
                      ["copper", "💮", "뱃지"],
                    ].map(([key, icon, name]) => (
                      <button key={key} className="medal-button" data-medal={key}>
                        <div className="medal-icon">{icon}</div>
                        <div className="medal-name">{name}</div>
                        <div className="medal-count">0개</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 채널별 진행 상황 */}
                <div className="dashboard-card">
                  <h2 className="dashboard-card-title">
                    <i className="fas fa-chart-line" /> 채널별 진행 상황
                    <p className="progress-guide">
                      <br />　각 채널에서 10개, 20개, 30개, 50개 영상을 학습하면 메달을 획득할 수 있어요!
                    </p>
                    <button
                      className="completed-channels-button"
                      id="completed-channels-btn"
                    >
                      학습 완료된 채널 <i className="fas fa-external-link-alt" />
                    </button>
                  </h2>
                  <div className="empty-message">
                    <p>아직 학습 중인 채널이 없습니다.</p>
                    <p>
                      채널 분석기를 통해 채널을 추가해보세요.
                      <br />
                      <br />
                    </p>
                    새 채널 분석하기
                  </div>
                  <MedalModal />
                </div>

                {/* 최근 활동 내역 */}
                <div className="dashboard-card">
                  <h2 className="dashboard-card-title">
                    <i className="fas fa-history" /> 최근 활동 내역
                  </h2>
                  <div className="empty-message">
                    <p>아직 활동 내역이 없습니다.</p>
                    <p>채널 분석을 시작해보세요.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="tubelab-footer">
        <div className="footer-content">
          <div className="footer-copyright">
            Copyright © 2025. All rights reserved to 튜브랩
          </div>
          <div className="footer-links">
            개인정보처리방침 서비스이용약관 사업자정보
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
