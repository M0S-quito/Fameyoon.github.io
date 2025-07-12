import AppLayout from './layout/AppLayout';
import Dashboard from './pages/Dashboard';
import './styles/legacy.css';

export default function App() {
  return (
    <AppLayout>
      <Dashboard />
    </AppLayout>
  );
}
