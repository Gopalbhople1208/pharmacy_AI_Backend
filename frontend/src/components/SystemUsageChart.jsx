import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { systemUsageData } from '../data/dashboardData';

export default function SystemUsageChart() {
  const totalActions = 892;

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h3 className="card-title">System Usage</h3>
          <p className="card-subtitle">Activity across your connected systems</p>
        </div>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', height: '250px' }}>
        <div style={{ flex: 1, height: '100%', position: 'relative' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={systemUsageData}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={85}
                paddingAngle={2}
                dataKey="value"
                stroke="none">
                
                {systemUsageData.map((entry, index) =>
                <Cell key={`cell-${index}`} fill={entry.color} />
                )}
              </Pie>
              <Tooltip
                formatter={(value) => [`${value}%`, 'Usage']}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              
            </PieChart>
          </ResponsiveContainer>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a' }}>{totalActions}</div>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Total Actions</div>
          </div>
        </div>
        
        <div style={{ flex: 1, paddingLeft: '1rem' }}>
          <div className="donut-legend">
            {systemUsageData.map((item, index) =>
            <div key={index} className="legend-item">
                <div className="legend-label">
                  <div className="legend-dot" style={{ backgroundColor: item.color }}></div>
                  {item.name}
                </div>
                <div className="legend-value">{item.value}%</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>);

}