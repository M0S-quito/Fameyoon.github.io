import { useState } from 'react';
import NotificationModal from '../components/modals/NotificationModal';
import MyPostsModal from '../components/modals/MyPostsModal';

export default function Header() {
  const [showNotif, setShowNotif] = useState(false);
  const [showPosts, setShowPosts] = useState(false);

  return (
    <header className="tubelab-header sidebar-open">
      <div className="header-left">
        <div className="menu-toggle" onClick={() => document.body.classList.toggle('sidebar-open')}>☰</div>
      </div>
      <div className="header-right">
        <div className="notification-button" onClick={() => setShowNotif(true)}>🔔</div>
        <div className="profile-container" onClick={() => setShowPosts(true)}>
          <div className="profile-avatar">U</div>
        </div>
      </div>
      <NotificationModal open={showNotif} onClose={() => setShowNotif(false)} />
      <MyPostsModal open={showPosts} onClose={() => setShowPosts(false)} />
    </header>
  );
}
