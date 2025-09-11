import { ChartConfig } from '@/components/ui/chart';
import React from 'react';

const formatCurrency = (value: number) => {
    if (value >= 1e9) {
        return `৳${(value / 1e9).toFixed(1)}B`;
    }
    if (value >= 1e6) {
        return `৳${(value / 1e6).toFixed(1)}M`;
    }
    if (value >= 1e3) {
        return `৳${(value / 1e3).toFixed(1)}K`;
    }
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'BDT' }).format(value);
}

const chartConfigBase = {
  amount: {
    label: 'Amount',
  },
} satisfies ChartConfig;

const baseMetrics = (total: number, investors: number) => [
  { id: 'totalAmount', title: 'Total Amount Held', value: formatCurrency(total), change: '+2.1%', icon: 'DollarSign' },
  { id: 'totalInvestors', title: 'Total Investors', value: investors.toLocaleString(), change: '+10', icon: 'Users' },
  { id: 'taxAmount', title: 'Total Tax (TDS)', value: formatCurrency(total * 0.1), change: '+1.5%', icon: 'FileText' },
  { id: 'avgHolding', title: 'Average Holding', value: formatCurrency(total / investors), change: '-0.5%', icon: 'Landmark' },
];

const baseChartData = [
  { name: 'Jan', amount: 2500000 },
  { name: 'Feb', amount: 3050000 },
  { name: 'Mar', amount: 2370000 },
  { name: 'Apr', amount: 4890000 },
  { name: 'May', amount: 3490000 },
  { name: 'Jun', amount: 5100000 },
];

const baseTableColumns = [
    { header: 'Investor ID', accessor: 'id' },
    { header: 'Name', accessor: 'name' },
    { header: 'Amount', accessor: 'amount' },
    { header: 'TDS', accessor: 'tds' },
    { header: 'Status', accessor: 'status' },
];

const investorsTableData = [
  { id: 'INV-001', name: 'Liam Johnson', amount: 1250000, tds: 125000, status: 'Paid' },
  { id: 'INV-002', name: 'Olivia Smith', amount: 850000, tds: 85000, status: 'Pending' },
  { id: 'INV-003', name: 'Noah Williams', amount: 2300000, tds: 230000, status: 'Paid' },
  { id: 'INV-004', name: 'Emma Brown', amount: 450000, tds: 45000, status: 'Paid' },
  { id: 'INV-005', name: 'Oliver Jones', amount: 1750000, tds: 175000, status: 'Pending' },
  { id: 'INV-006', name: 'Ava Garcia', amount: 620000, tds: 62000, status: 'Paid' },
  { id: 'INV-007', name: 'Elijah Miller', amount: 3100000, tds: 310000, status: 'Paid' },
  { id: 'INV-008', name: 'Charlotte Davis', amount: 940000, tds: 94000, status: 'Pending' },
];

export const getIssuersData = () => ({
  metrics: baseMetrics(125500000, 3450),
  chartData: baseChartData,
  chartConfig: chartConfigBase,
  tableData: investorsTableData,
  tableColumns: baseTableColumns
});

export const getInvestorsData = () => ({
  metrics: baseMetrics(89750000, 5820),
  chartData: [...baseChartData].reverse().map(d => ({ ...d, amount: d.amount * 0.8 })),
  chartConfig: chartConfigBase,
  tableData: [...investorsTableData].map(d => ({ ...d, id: d.id.replace('INV', 'INVR'), amount: d.amount * 0.75, tds: d.amount * 0.75 * 0.1})).sort((a,b) => a.id > b.id ? 1 : -1),
  tableColumns: baseTableColumns,
});

export const getRegulatorsData = () => ({
  metrics: [
    { id: 'totalIssuers', title: 'Monitored Issuers', value: '1,240', change: '+5%', icon: 'Landmark' },
    { id: 'complianceRate', title: 'Compliance Rate', value: '98.7%', change: '+0.2%', icon: 'ArrowUp' },
    { id: 'openCases', title: 'Open Investigations', value: '15', change: '-2', icon: 'FileText' },
    { id: 'totalFines', title: 'Total Fines Collected', value: formatCurrency(1250000), change: '+12%', icon: 'DollarSign' },
  ],
  chartData: baseChartData.map(d => ({ ...d, name: d.name, amount: d.amount / 5000 })),
  chartConfig: {
    amount: {
      label: 'Compliance Checks',
    }
  } satisfies ChartConfig,
  tableData: [
    { id: 'REG-01', name: 'Securities Board', region: 'National', active_cases: 5, status: 'Active' },
    { id: 'REG-02', name: 'Financial Conduct Group', region: 'Western', active_cases: 2, status: 'Active' },
    { id: 'REG-03', name: 'Market Oversight Panel', region: 'Eastern', active_cases: 8, status: 'Active' },
    { id: 'REG-04', name: 'Investment Protection Agy', region: 'National', active_cases: 0, status: 'Inactive' },
  ],
  tableColumns: [
    { header: 'Regulator ID', accessor: 'id' },
    { header: 'Name', accessor: 'name' },
    { header: 'Region', accessor: 'region' },
    { header: 'Active Cases', accessor: 'active_cases' },
    { header: 'Status', accessor: 'status' },
  ],
});

export const getCmsfData = () => ({
  metrics: [
    { id: 'fundValue', title: 'Total Fund Value', value: formatCurrency(1.2 * 1e9), change: '+3.5%', icon: 'DollarSign' },
    { id: 'ytdGrowth', title: 'YTD Growth', value: '7.8%', change: '', icon: 'ArrowUp' },
    { id: 'unclaimedDividends', title: 'Unclaimed Dividends', value: formatCurrency(45.2 * 1e6), change: '-1.2%', icon: 'ArrowDown' },
    { id: 'participatingIssuers', title: 'Participating Issuers', value: '850', change: '+25', icon: 'Landmark' },
  ],
  chartData: baseChartData.map(d => ({ ...d, amount: d.amount * 50 })),
  chartConfig: chartConfigBase,
  tableData: [
    { id: 'CMSF-T-001', type: 'Equity Investment', amount: 500 * 1e6, yield: '9.2%', risk: 'Medium' },
    { id: 'CMSF-T-002', type: 'Government Bonds', amount: 300 * 1e6, yield: '4.5%', risk: 'Low' },
    { id: 'CMSF-T-003', type: 'Corporate Bonds', amount: 250 * 1e6, yield: '6.8%', risk: 'Medium' },
    { id: 'CMSF-T-004', type: 'Unclaimed Dividends', amount: 150 * 1e6, yield: 'N/A', risk: 'N/A' },
  ],
  tableColumns: [
    { header: 'Transaction ID', accessor: 'id' },
    { header: 'Investment Type', accessor: 'type' },
    { header: 'Amount', accessor: 'amount' },
    { header: 'Yield', accessor: 'yield' },
    { header: 'Risk Profile', accessor: 'risk' },
  ]
});
