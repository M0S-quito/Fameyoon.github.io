import { useState } from 'react';
import MedalDetails from '../MedalDetails';
import { medals } from '../../constants/medals';

export default function MedalCard() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="dashboard-card">
      <h2 className="dashboard-card-title">
        <i className="fas fa-award" /> 메달 컬렉션
      </h2>
      <div className="medal-collection">
        {medals.map(m => (
          <button key={m.id} className="medal-button" onClick={() => setSelected(m.id)}>
            <div className="medal-icon">{m.icon}</div>
            <div className="medal-name">{m.name}</div>
            <div className="medal-count">0개</div>
          </button>
        ))}
      </div>
      {selected && <MedalDetails medalId={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
