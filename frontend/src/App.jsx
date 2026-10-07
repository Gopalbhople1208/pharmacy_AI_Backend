import { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopHeader from './components/TopHeader';
import AIAgent from './pages/AIAgent';
import MyData from './pages/MyData';
import Settings from './pages/Settings';
import './App.css';

function App() {
  const [activePage, setActivePage] = useState('agent');

  return (
    <div className="app-container">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <div className="main-content">
        <TopHeader />
        {activePage === 'agent' && <AIAgent />}
        {activePage === 'data' && <MyData />}
        {activePage === 'settings' && <Settings />}
      </div>
    </div>);

}

export default App;