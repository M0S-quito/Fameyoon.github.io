import NotionCard from '../components/cards/NotionCard';
import MedalCard from '../components/cards/MedalCard';
import CompletedModal from '../components/modals/CompletedModal';
import { useState } from 'react';

export default function Dashboard() {
  const [showCompleted, setShowCompleted] = useState(false);

  return (
    <div>
      <h1 className="section-title">튜브랩 대시보드</h1>
      <div className="dashboard-grid">
        <NotionCard />
        <MedalCard />
      </div>
      <button className="completed-channels-button" onClick={() => setShowCompleted(true)}>
        학습 완료된 채널
      </button>
      <CompletedModal open={showCompleted} onClose={() => setShowCompleted(false)} />
    </div>
  );
}
