import { MessageSquare, RefreshCw, Settings2, User } from 'lucide-react';
import { recentActivityData } from '../data/dashboardData';

export default function RecentActivity() {
  const getIcon = (type) => {
    switch (type) {
      case 'ai':return <MessageSquare size={16} />;
      case 'sync':return <RefreshCw size={16} />;
      case 'automation':return <Settings2 size={16} />;
      case 'customer':return <User size={16} />;
      default:return <MessageSquare size={16} />;
    }
  };

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="card-header">
        <h3 className="card-title" style={{ marginBottom: 0 }}>Recent Activity</h3>
        <span className="link-action">View All</span>
      </div>
      
      <div className="activity-list">
        {recentActivityData.map((activity) =>
        <div key={activity.id} className="activity-item">
            <div className={`activity-icon ${activity.type}`}>
              {getIcon(activity.type)}
            </div>
            <div className="activity-content">
              <div className="activity-title">{activity.title}</div>
              <div className="activity-desc">{activity.description}</div>
            </div>
            <div className="activity-time">{activity.time}</div>
          </div>
        )}
      </div>
    </div>);

}