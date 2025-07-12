export default function NotionCard() {
  return (
    <div className="dashboard-card notion-card">
      <a className="notion-link" href="#" target="_blank" rel="noreferrer">
        <div className="notion-content">
          <div className="notion-icon"><span style={{ fontSize: 60 }}>📝</span></div>
          <div className="notion-text">
            <h3>1기 수강생<br /> 학습 자료</h3>
            <p>노션 보러가기</p>
            <span className="notion-cta">바로가기 <i className="fas fa-external-link-alt" /></span>
          </div>
        </div>
      </a>
    </div>
  );
}
