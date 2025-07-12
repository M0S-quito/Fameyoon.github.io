import Header from './Header';
import Sidebar from './Sidebar';
import useBodyClass from '../hooks/useBodyClass';

export default function AppLayout({ children }) {
  useBodyClass('has-sidebar');
  return (
    <div className="app-container">
      <Header />
      <Sidebar />
      <main className="main-content">
        <div className="content">
          <div className="container">{children}</div>
        </div>
      </main>
    </div>
  );
}
