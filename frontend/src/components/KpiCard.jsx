import { BarChart2, Users, Package, Zap, ArrowUpRight } from 'lucide-react';










export default function KpiCard({ title, value, change, subtitle, iconType, color }) {
  const getIcon = () => {
    switch (iconType) {
      case 'sales':return <BarChart2 size={24} />;
      case 'customers':return <Users size={24} />;
      case 'products':return <Package size={24} />;
      case 'automations':return <Zap size={24} />;
      default:return <BarChart2 size={24} />;
    }
  };

  return (
    <div className="kpi-card">
      <div className={`kpi-icon-wrapper ${color}`}>
        {getIcon()}
      </div>
      <div className="kpi-content">
        <div className="kpi-title">{title}</div>
        <div className="kpi-value">{value}</div>
        <div className="kpi-trend">
          <span className="trend-positive">
            <ArrowUpRight size={14} />
            {change}
          </span>
          <span className="trend-subtitle">{subtitle}</span>
        </div>
      </div>
    </div>);

}