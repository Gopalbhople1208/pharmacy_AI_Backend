import { Settings as SettingsIcon, SlidersHorizontal, User, Users, Shield, Bell, Database } from 'lucide-react';
import SettingsCard from '../components/SettingsCard';

const settingsOptions = [
{
  id: 'account',
  title: 'Account Settings',
  description: 'Manage your profile and account preferences',
  icon: User,
  bgColorClass: 'bg-light-blue',
  iconColorClass: 'text-blue'
},
{
  id: 'users',
  title: 'User Management',
  description: 'Add and manage team members',
  icon: Users,
  bgColorClass: 'bg-light-purple',
  iconColorClass: 'text-purple'
},
{
  id: 'security',
  title: 'Security',
  description: 'Password, two-factor authentication and more',
  icon: Shield,
  bgColorClass: 'bg-light-green',
  iconColorClass: 'text-green'
},
{
  id: 'notifications',
  title: 'Notifications',
  description: 'Configure alerts and notification preferences',
  icon: Bell,
  bgColorClass: 'bg-light-orange',
  iconColorClass: 'text-orange'
},
{
  id: 'preferences',
  title: 'System Preferences',
  description: 'Set region, language and system defaults',
  icon: SettingsIcon,
  bgColorClass: 'bg-light-blue',
  iconColorClass: 'text-blue'
},
{
  id: 'privacy',
  title: 'Data & Privacy',
  description: 'Manage your data and privacy settings',
  icon: Database,
  bgColorClass: 'bg-light-purple',
  iconColorClass: 'text-purple'
}];


export default function Settings() {
  return (
    <div className="page-content">
      <div className="page-header" style={{ marginBottom: '0' }}>
        <div>
          <h1 className="page-title">Settings</h1>
          <p className="page-subtitle">Manage your account, preferences and system configurations.</p>
        </div>
      </div>

      <div className="settings-workspace">
        <div className="settings-hero">
          <div className="settings-hero-bg">
            <SettingsIcon className="hero-icon-main" size={48} />
            <div className="hero-icon-secondary-wrapper">
              <SlidersHorizontal className="hero-icon-secondary" size={20} />
            </div>
          </div>
          <h2 className="settings-heading">Customize your experience</h2>
          <p className="settings-hero-subtitle">
            Configure your preferences, manage users, and keep<br />your business secure.
          </p>
        </div>

        <div className="settings-cards-grid">
          {settingsOptions.map((option) =>
          <SettingsCard
            key={option.id}
            title={option.title}
            description={option.description}
            icon={option.icon}
            bgColorClass={option.bgColorClass}
            iconColorClass={option.iconColorClass} />

          )}
        </div>
      </div>
    </div>);

}