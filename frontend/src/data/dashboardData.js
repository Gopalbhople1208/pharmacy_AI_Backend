export const kpiData = [
{
  id: 'sales',
  title: 'Total Sales',
  value: '₹12,48,230',
  change: '+12%',
  isPositive: true,
  subtitle: 'vs last week',
  iconType: 'sales',
  color: 'green'
},
{
  id: 'customers',
  title: 'Total Customers',
  value: '1,482',
  change: '+8%',
  isPositive: true,
  subtitle: 'vs last week',
  iconType: 'customers',
  color: 'blue'
},
{
  id: 'products',
  title: 'Active Products',
  value: '320',
  change: '+5%',
  isPositive: true,
  subtitle: 'vs last week',
  iconType: 'products',
  color: 'purple'
},
{
  id: 'automations',
  title: 'Automations Run',
  value: '892',
  change: '+18%',
  isPositive: true,
  subtitle: 'vs last week',
  iconType: 'automations',
  color: 'orange'
}];


export const salesTrendData = [
{ date: 'Sep 8', sales: 50000 },
{ date: 'Sep 9', sales: 90000 },
{ date: 'Sep 10', sales: 70000 },
{ date: 'Sep 11', sales: 110000 },
{ date: 'Sep 12', sales: 90000 },
{ date: 'Sep 13', sales: 120000 },
{ date: 'Sep 14', sales: 180000 }];


export const systemUsageData = [
{ name: 'Data Sync', value: 42, color: '#3b82f6' }, // blue
{ name: 'AI Queries', value: 28, color: '#10b981' }, // green
{ name: 'Automations', value: 20, color: '#8b5cf6' }, // purple
{ name: 'Other', value: 10, color: '#cbd5e1' } // gray
];

export const recentActivityData = [
{
  id: 1,
  title: 'AI agent answered a query',
  description: '"Show me last month\'s sales"',
  time: '2 minutes ago',
  type: 'ai'
},
{
  id: 2,
  title: 'Data synced from Shopify',
  description: 'Products updated (24 items)',
  time: '15 minutes ago',
  type: 'sync'
},
{
  id: 3,
  title: 'Automation completed',
  description: 'Low stock alert sent',
  time: '1 hour ago',
  type: 'automation'
},
{
  id: 4,
  title: 'New customer added',
  description: 'ravi.k@company.com',
  time: '2 hours ago',
  type: 'customer'
}];


export const quickActionsData = [
{
  id: 1,
  title: 'Ask AI Agent',
  description: 'Get instant insights',
  iconType: 'ai'
},
{
  id: 2,
  title: 'Connect a System',
  description: 'Integrate your tools',
  iconType: 'connect'
},
{
  id: 3,
  title: 'Generate Report',
  description: 'Create custom reports',
  iconType: 'report'
},
{
  id: 4,
  title: 'Create Automation',
  description: 'Set up a workflow',
  iconType: 'automation'
}];