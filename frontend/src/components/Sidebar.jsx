import {
  Bot,
  Database,
  Settings } from
'lucide-react';

const navItems = [
{ id: 'agent', label: 'AI Agent', icon: Bot },
{ id: 'data', label: 'My Data', icon: Database },
{ id: 'settings', label: 'Settings', icon: Settings }];


export default function Sidebar({ activePage = 'agent', onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo-container">
          <div className="logo-icon-bg">
            <div className="logo-icon-inner"></div>
          </div>
          <div className="logo-text-wrapper">
            <div className="logo-text">DREAMZ <span className="logo-ai">AI</span></div>
            <div className="logo-subtext">One agent. Every business system.</div>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) =>
        <div
          key={item.id}
          className={`nav-item ${item.id === activePage ? 'active' : ''}`}
          onClick={() => onNavigate && onNavigate(item.id)}>
          
            <item.icon className="nav-icon" />
            <span>{item.label}</span>
          </div>
        )}
      </nav>

      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="avatar">A</div>
          <div className="user-info">
            <span className="user-name">Admin</span>
            <span className="user-company">Dreamz Technologies</span>
            <span className="status-text">
              <span className="status-online"></span>
              Online
            </span>
          </div>
        </div>
      </div>
    </aside>);

}