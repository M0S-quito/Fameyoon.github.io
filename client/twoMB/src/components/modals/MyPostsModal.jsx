export default function MyPostsModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>내가 쓴 글</h3>
          <button className="close-modal" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <p>작성한 글이 없습니다.</p>
        </div>
      </div>
    </div>
  );
}
