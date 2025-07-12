export default function CompletedModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>학습 완료된 채널</h3>
          <span className="close-modal" onClick={onClose}>×</span>
        </div>
        <div className="modal-body">
          <div className="empty-message">
            <p>아직 학습 완료된 채널이 없습니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
