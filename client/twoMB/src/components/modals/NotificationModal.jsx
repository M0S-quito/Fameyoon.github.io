export default function NotificationModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>알림</h3>
          <button className="close-modal" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <p>새로운 알림이 없습니다.</p>
        </div>
      </div>
    </div>
  );
}
