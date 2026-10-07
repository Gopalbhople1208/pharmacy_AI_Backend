import { MessageSquare, Link, FileText, Settings2, ArrowRight } from 'lucide-react';
import { quickActionsData } from '../data/dashboardData';

export default function QuickActions() {
  const getIcon = (type) => {
    switch (type) {
      case 'ai':return <MessageSquare size={20} />;
      case 'connect':return <Link size={20} />;
      case 'report':return <FileText size={20} />;
      case 'automation':return <Settings2 size={20} />;
      default:return <MessageSquare size={20} />;
    }
  };

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'transparent', border: 'none', boxShadow: 'none', padding: 0 }}>
      <div className="card-header" style={{ marginBottom: '1rem' }}>
        <div>
          <h3 className="card-title">Quick Actions</h3>
          <p className="card-subtitle">Get things done faster</p>
        </div>
      </div>
      
      <div className="quick-actions-grid">
        {quickActionsData.map((action) =>
        <div key={action.id} className="action-card">
            <div className="action-info">
              <div className="action-icon">
                {getIcon(action.iconType)}
              </div>
              <div className="action-text">
                <div className="action-title">{action.title}</div>
                <div className="action-desc">{action.description}</div>
              </div>
            </div>
            <ArrowRight size={18} className="action-arrow" />
          </div>
        )}
      </div>
    </div>);

}