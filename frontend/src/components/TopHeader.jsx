import { Search, Database, Bell, ChevronDown } from 'lucide-react';

export default function TopHeader() {
  return (
    <header className="top-header">
      <div className="search-container">
        <Search className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Search anything... (e.g., customers, sales, inventory, reports)" />
        
      </div>

      <div className="header-actions">
        <button className="btn-systems">
          <Database className="icon" />
          Connected Systems
        </button>

        <button className="notification-btn">
          <Bell size={20} />
          <span className="notification-badge"></span>
        </button>

        <div className="header-user">
          <div className="header-avatar">A</div>
          <span className="header-username">Admin</span>
          <ChevronDown className="header-user-icon" />
        </div>
      </div>
    </header>);

}