import { ChevronDown } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { salesTrendData } from '../data/dashboardData';

export default function SalesTrendChart() {
  const formatYAxis = (value) => {
    if (value === 0) return '₹0';
    return `₹${(value / 100000).toFixed(1)}L`;
  };

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h3 className="card-title">Sales Trend</h3>
          <p className="card-subtitle">Total sales over the last 7 days</p>
        </div>
        <button className="card-action">
          Last 7 days <ChevronDown size={14} />
        </button>
      </div>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={salesTrendData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#64748b' }}
              dy={10} />
            
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#64748b' }}
              tickFormatter={formatYAxis}
              domain={[0, 200000]}
              ticks={[0, 50000, 100000, 150000, 200000]} />
            
            <Tooltip
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              formatter={(value) => [`₹${Number(value).toLocaleString()}`, 'Sales']} />
            
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#3b82f6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorSales)"
              activeDot={{ r: 6, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }} />
            
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>);

}