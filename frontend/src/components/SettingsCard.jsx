
import { ArrowRight } from 'lucide-react';









export default function SettingsCard({ title, description, icon: Icon, bgColorClass, iconColorClass }) {
  return (
    <div className="settings-card">
      <div className={`card-icon-wrapper ${bgColorClass} ${iconColorClass}`}>
        <Icon size={24} />
      </div>
      <div className="settings-card-content">
        <h3 className="settings-card-title">{title}</h3>
        <p className="settings-card-desc">{description}</p>
      </div>
      <div className="settings-card-arrow">
        <ArrowRight size={20} />
      </div>
    </div>);

}