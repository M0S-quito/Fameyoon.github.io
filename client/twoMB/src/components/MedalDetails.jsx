import { medals } from '../constants/medals';

export default function MedalDetails({ medalId, onClose }) {
  const medal = medals.find(m => m.id === medalId);
  if (!medal) return null;

  return (
    <div className="medal-details-container">
      <div className="medal-details show" id={`${medal.id}-details`}>
        <div className="medal-details-header">
          <span className="medal-details-title">{medal.icon} {medal.name} 상세 정보</span>
          <button className="close-details" onClick={onClose}>×</button>
        </div>
        <p className="empty-medal-message">아직 {medal.name}을 수령한 채널이 없습니다.</p>
      </div>
    </div>
  );
}
