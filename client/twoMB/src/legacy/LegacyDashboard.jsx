import { useState, useEffect } from 'react'
import './legacy.css'

export default function LegacyDashboard() {
  const [showNotification, setShowNotification] = useState(false)
  const [showMyPosts, setShowMyPosts] = useState(false)
  const [showCompleted, setShowCompleted] = useState(false)
  const [selectedMedal, setSelectedMedal] = useState(null)
  const toggleMedal = (medal) => {
    if (selectedMedal === medal) {
      setSelectedMedal(null)
    } else {
      setSelectedMedal(medal)
    }
  }

  useEffect(() => {
    document.body.classList.add('has-sidebar')
    return () => {
      document.body.classList.remove('has-sidebar')
    }
  }, [])

  return (
    <div className="app-container">
      <header className="tubelab-header sidebar-open" id="header">
        <div className="header-left">
          <div className="menu-toggle" id="mobileMenuToggle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </div>
          <div className="sidebar-toggle" id="toggleSidebar">
            <div className="sidebar-toggle-icon" id="sidebarToggleIcon">
              <div className="close-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="header-right">
          <div
            className="notification-button"
            id="notificationButton"
            onClick={() => setShowNotification(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </div>
          <div className="profile-container" id="profileContainer">
            <div className="profile-avatar">M0S_quito</div>
            <div className="profile-info">
              <div className="profile-nickname">M0S_quito</div>
            </div>
          </div>
        </div>
      </header>

      <div className="main-container">
        <aside className="tubelab-sidebar" id="sidebar">
          <div className="sidebar-logo">
            <div className="logo-box" style={{ backgroundColor: '#FF0033' }} />
            <div className="logo-text">튜브랩</div>
          </div>
        </aside>
        <div className="main-content">
          <div className="content">
            <div className="container">
              <h1 className="section-title">튜브랩 대시보드</h1>
              <div className="dashboard-grid">
                <div className="dashboard-card notion-card">
                  <div className="notion-content">
                    <div className="notion-icon">
                      <span style={{ fontSize: '60px' }}>📝</span>
                    </div>
                    <div className="notion-text">
                      <h3>1기 수강생<br /> 학습 자료</h3>
                      <p>노션 보러가기</p>
                      <span className="notion-cta">
                        바로가기 <i className="fas fa-external-link-alt" />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="dashboard-card">
                  <h2 className="dashboard-card-title">
                    <i className="fas fa-award" /> 메달 컬렉션
                  </h2>
                  <div className="medal-collection">
                    {['completion', 'gold', 'silver', 'bronze', 'copper'].map((m) => (
                      <button
                        key={m}
                        className="medal-button"
                        data-medal={m}
                        onClick={() => toggleMedal(m)}
                      >
                        <div className="medal-icon">
                          {m === 'completion' && '🏆'}
                          {m === 'gold' && '🥇'}
                          {m === 'silver' && '🥈'}
                          {m === 'bronze' && '🥉'}
                          {m === 'copper' && '💮'}
                        </div>
                        <div className="medal-name">
                          {m === 'completion' && '트로피'}
                          {m === 'gold' && '금메달'}
                          {m === 'silver' && '은메달'}
                          {m === 'bronze' && '동메달'}
                          {m === 'copper' && '뱃지'}
                        </div>
                        <div className="medal-count">0개</div>
                      </button>
                    ))}
                  </div>
                  <div className="medal-details-container">
                    {['completion', 'gold', 'silver', 'bronze', 'copper'].map((m) => (
                      <div
                        key={m}
                        className="medal-details"
                        style={{ display: selectedMedal === m ? 'block' : 'none' }}
                      >
                        <div className="medal-details-header">
                          <span className="medal-details-title">
                            {m === 'completion' && '🏆 학습 완료 채널'}
                            {m === 'gold' && '🥇 금메달 획득 채널'}
                            {m === 'silver' && '🥈 은메달 획득 채널'}
                            {m === 'bronze' && '🥉 동메달 획득 채널'}
                            {m === 'copper' && '💮 최근 뱃지 획득 내역'}
                          </span>
                          <button className="close-details" onClick={() => setSelectedMedal(null)}>
                            ×
                          </button>
                        </div>
                        <p className="empty-medal-message">아직 획득한 정보가 없습니다.</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="dashboard-card">
                  <h2 className="dashboard-card-title">
                    <i className="fas fa-chart-line" /> 채널별 진행 상황
                    <button
                      className="completed-channels-button"
                      id="completed-channels-btn"
                      onClick={() => setShowCompleted(true)}
                    >
                      학습 완료된 채널 <i className="fas fa-external-link-alt" />
                    </button>
                  </h2>
                  <div className="empty-message">
                    <p>아직 학습 중인 채널이 없습니다.</p>
                    <p>채널 분석기를 통해 채널을 추가해보세요.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showNotification && (
        <div className="header-modal-overlay show" id="headerNotificationModal">
          <div className="header-modal-container">
            <div className="header-modal-header">
              <h3 className="header-modal-title">알림</h3>
              <button className="header-modal-close" onClick={() => setShowNotification(false)}>
                ×
              </button>
            </div>
            <div className="header-modal-body">
              <div className="notification-list">
                <div className="empty-state">
                  <p>새로운 알림이 없습니다.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showMyPosts && (
        <div className="header-modal-overlay show" id="headerMyPostsModal">
          <div className="header-modal-container">
            <div className="header-modal-header">
              <h3 className="header-modal-title">내가 쓴 글</h3>
              <button className="header-modal-close" onClick={() => setShowMyPosts(false)}>
                ×
              </button>
            </div>
            <div className="header-modal-body">
              <div className="content-list">
                <div className="empty-state">
                  <p>작성한 글이 없습니다.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCompleted && (
        <div className="modal" id="completed-channels-modal" style={{ display: 'block' }}>
          <div className="modal-content">
            <div className="modal-header">
              <h3>학습 완료된 채널</h3>
              <span className="close-modal" onClick={() => setShowCompleted(false)}>
                ×
              </span>
            </div>
            <div className="modal-body">
              <div className="empty-message">
                <p>아직 학습 완료된 채널이 없습니다.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
