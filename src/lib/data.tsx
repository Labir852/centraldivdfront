
import { ChartConfig } from '@/components/ui/chart';
import React from 'react';

const formatCurrency = (value: number) => {
    return `৳${value.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
  }

const chartConfigBase = {
  amount: {
    label: 'Amount',
  },
} satisfies ChartConfig;

const baseChartData = [
  { name: 'Jan', amount: 6200000 },
  { name: 'Feb', amount: 7800000 },
  { name: 'Mar', amount: 5500000 },
  { name: 'Apr', amount: 8900000 },
  { name: 'May', amount: 7100000 },
  { name: 'Jun', amount: 9400000 },
];

const baseMetrics = (total: number, investors: number, totalTds: number) => [
  { id: 'totalAmount', title: 'Total Dividend Amount', value: formatCurrency(total), icon: 'Wallet' },
  { id: 'totalInvestors', title: 'Total Participants', value: investors.toLocaleString(),  icon: 'Users' },
  { id: 'avgHolding', title: 'Net Dividend', value: formatCurrency((total - totalTds)),  icon: 'Landmark' },
  { id: 'taxAmount', title: 'Total Tax (TDS)', value: formatCurrency(totalTds), change: '-15%', icon: 'FileText' },
  ];

const baseTableColumns = [
    { header: 'SL', accessor: 'sl' },
    { header: 'BOID', accessor: 'id' },
    { header: 'TIN', accessor: 'tin' },
    { header: 'Trade Code', accessor: 'tradecode' },
    { header: 'Issuer Name', accessor: 'name' },
    { header: 'Record Date', accessor: 'recorddate' },
    { header: 'Dividend', accessor: 'amount' },
    { header: 'TDS', accessor: 'tds' },
    { header: 'Net Dividend', accessor:'netdividend'},
    { header: 'Status', accessor: 'status' },
];

const cmsfTableData = [
  { sl:1, id: '1205590058147387',tin:'127905441477', tradecode:'BATBC', name: 'British American Tobacco Bangladesh Company Ltd. ', recorddate:"June 30, 2025", amount: 13333.33, tds: 2000, status: 'Paid' },
  { sl:2, id: '1205590058147387', tin:'127905441477', tradecode:'GP', name: 'Grameenphone Ltd.', recorddate:"June 30, 2025", amount: 300, tds: 45, status: 'Pending' },
  { sl:3, id: '1205590058147387', tin:'127905441477', tradecode:'AIBL1STIMF', name: 'AIBL 1st Islamic Mutual Fund', recorddate:"June 30, 2025", amount: 500, tds: 75, status: 'Paid' },
  { sl:4, id: '1205590058147387',tin:'127905491477', tradecode:'BATBC', name: 'British American Tobacco Bangladesh Company Ltd. ', recorddate:"December 30, 2024", amount: 15000, tds: 2000, status: 'Paid' },
  { sl:5, id: '1205590058147387', tin:'127905481477', tradecode:'AIBL1STIMF', name: 'AIBL 1st Islamic Mutual Fund', recorddate:"January 30, 2025", amount: 500, tds: 75, status: 'Paid' },
  { sl:6, id: '1205590058147387', tin:'127905441577', tradecode:'GP', name: 'Grameenphone Ltd.', recorddate:"February 30, 2025", amount: 300, tds: 45, status: 'Paid' },
  { sl:7, id: '1205590058147387',tin:'127902441477', tradecode:'BATBC', name: 'British American Tobacco Bangladesh Company Ltd. ', recorddate:"October 01, 2024", amount: 5655, tds: 2000, status: 'Paid' },
  { sl:8, id: '1205590058147387', tin:'127505441477', tradecode:'AIBL1STIMF', name: 'AIBL 1st Islamic Mutual Fund', recorddate:"June 30, 2024", amount: 3845, tds: 75, status: 'Pending' },
  { sl:9, id: '1205590058147387',tin:'127906441477', tradecode:'BATBC', name: 'British American Tobacco Bangladesh Company Ltd. ', recorddate:"June 30, 2025", amount: 87963, tds: 2000, status: 'Paid' },
  { sl:10, id: '1205590058147387', tin:'127907441477', tradecode:'GP', name: 'Grameenphone Ltd.', recorddate:"June 30, 2025", amount: 345, tds: 45, status: 'Pending' },
  
  // { id: 'INV-004', name: 'Emma Brown', amount: 450000, tds: 45000, status: 'Paid' },
  // { id: 'INV-005', name: 'Oliver Jones', amount: 1750000, tds: 175000, status: 'Pending' },
  // { id: 'INV-006', name: 'Ava Garcia', amount: 620000, tds: 62000, status: 'Paid' },
  // { id: 'INV-007', name: 'Elijah Miller', amount: 3100000, tds: 310000, status: 'Paid' },
  // { id: 'INV-008', name: 'Charlotte Davis', amount: 940000, tds: 94000, status: 'Pending' },
];

const issuerTableData  = [
  // { sl:1, id: '1205590058147387',tin:'127905441477', tradecode:'BATBC', name: 'British American Tobacco Bangladesh Company Ltd. ', recorddate:"June 30, 2025", amount: 13333.33, tds: 2000, status: 'Paid' },
  { sl:1, id: '1205590058147387', tin:'127905441477', tradecode:'GP', name: 'Grameenphone Ltd.', recorddate:"June 30, 2025", amount: 300, tds: 45, status: 'Pending' },
  // { sl:3, id: '1205590058147387', tin:'127905441477', tradecode:'AIBL1STIMF', name: 'AIBL 1st Islamic Mutual Fund', recorddate:"June 30, 2025", amount: 500, tds: 75, status: 'Paid' },
  // { sl:4, id: '1205590058147387',tin:'127905491477', tradecode:'BATBC', name: 'British American Tobacco Bangladesh Company Ltd. ', recorddate:"December 30, 2024", amount: 15000, tds: 2000, status: 'Paid' },
  // { sl:5, id: '1205590058147387', tin:'127905481477', tradecode:'AIBL1STIMF', name: 'AIBL 1st Islamic Mutual Fund', recorddate:"January 30, 2025", amount: 500, tds: 75, status: 'Paid' },
  { sl:2, id: '1205590058147387', tin:'127905441577', tradecode:'GP', name: 'Grameenphone Ltd.', recorddate:"February 30, 2025", amount: 300, tds: 45, status: 'Paid' },
  // { sl:7, id: '1205590058147387',tin:'127902441477', tradecode:'BATBC', name: 'British American Tobacco Bangladesh Company Ltd. ', recorddate:"October 01, 2024", amount: 5655, tds: 2000, status: 'Paid' },
  // { sl:8, id: '1205590058147387', tin:'127505441477', tradecode:'AIBL1STIMF', name: 'AIBL 1st Islamic Mutual Fund', recorddate:"June 30, 2024", amount: 3845, tds: 75, status: 'Pending' },
  // { sl:9, id: '1205590058147387',tin:'127906441477', tradecode:'BATBC', name: 'British American Tobacco Bangladesh Company Ltd. ', recorddate:"June 30, 2025", amount: 87963, tds: 2000, status: 'Paid' },
  { sl:3, id: '1205590058147387', tin:'127907441477', tradecode:'GP', name: 'Grameenphone Ltd.', recorddate:"June 30, 2025", amount: 345, tds: 45, status: 'Pending' },
  
  // { id: 'INV-004', name: 'Emma Brown', amount: 450000, tds: 45000, status: 'Paid' },
  // { id: 'INV-005', name: 'Oliver Jones', amount: 1750000, tds: 175000, status: 'Pending' },
  // { id: 'INV-006', name: 'Ava Garcia', amount: 620000, tds: 62000, status: 'Paid' },
  // { id: 'INV-007', name: 'Elijah Miller', amount: 3100000, tds: 310000, status: 'Paid' },
  // { id: 'INV-008', name: 'Charlotte Davis', amount: 940000, tds: 94000, status: 'Pending' },
];

const issuerTableDataForIssuer= [...issuerTableData].map(d => ({ ...d, id: d.id.replace('INV', 'INVR'), amount: d.amount , tds: (d.amount * 0.15).toFixed(2),netdividend:(d.amount * 0.85).toFixed(2)})).sort((a,b) => a.sl > b.sl ? 1 : -1);
const totalTdsFromIssuerData = parseFloat(issuerTableDataForIssuer.reduce((sum, item) => item.status === 'Paid' ? sum + parseFloat(item.tds) : sum+0 , 0).toFixed(2));
const totalDividendFromIssuers = parseFloat(issuerTableDataForIssuer.reduce((sum, item) => item.status === 'Paid' ? sum + item.amount : sum+0, 0).toFixed(2));



const investorsTableData = [
  { sl:1, id: '1205590058147387',tin:'127905441477', tradecode:'BATBC', name: 'British American Tobacco Bangladesh Company Ltd. ', recorddate:"June 30, 2025", amount: 13333.33, tds: 2000, status: 'Paid' },
  { sl:2, id: '1205590058147387', tin:'127905441477', tradecode:'GP', name: 'Grameenphone Ltd.', recorddate:"June 30, 2025", amount: 300, tds: 45, status: 'Pending' },
  { sl:3, id: '1205590058147387', tin:'127905441477', tradecode:'AIBL1STIMF', name: 'AIBL 1st Islamic Mutual Fund', recorddate:"June 30, 2025", amount: 500, tds: 75, status: 'Paid' },
  // { id: 'INV-004', name: 'Emma Brown', amount: 450000, tds: 45000, status: 'Paid' },
  // { id: 'INV-005', name: 'Oliver Jones', amount: 1750000, tds: 175000, status: 'Pending' },
  // { id: 'INV-006', name: 'Ava Garcia', amount: 620000, tds: 62000, status: 'Paid' },
  // { id: 'INV-007', name: 'Elijah Miller', amount: 3100000, tds: 310000, status: 'Paid' },
  // { id: 'INV-008', name: 'Charlotte Davis', amount: 940000, tds: 94000, status: 'Pending' },
];

const investorTableDataForInvestor = [...investorsTableData].map(d => ({ ...d, id: d.id.replace('INV', 'INVR'), amount: d.amount , tds: (d.amount * 0.15).toFixed(2),netdividend:(d.amount * 0.85).toFixed(2)})).sort((a,b) => a.sl > b.sl ? 1 : -1);
const totalTdsFromInvestorData = parseFloat(investorTableDataForInvestor.reduce((sum, item) => item.status === 'Paid' ? sum + parseFloat(item.tds) : sum+0 , 0).toFixed(2));
const totalDividendFromInvestors = parseFloat(investorTableDataForInvestor.reduce((sum, item) => item.status === 'Paid' ? sum + item.amount : sum+0, 0).toFixed(2));



const cmsfTableDataForCMSF = [...cmsfTableData].map(d => ({ ...d, id: d.id.replace('INV', 'INVR'), amount: d.amount , tds: (d.amount * 0.15).toFixed(2),netdividend:(d.amount * 0.85).toFixed(2)})).sort((a,b) => a.sl > b.sl ? 1 : -1);
const totalTdsFromIssuersData = parseFloat(cmsfTableDataForCMSF.reduce((sum, item) => item.status === 'Paid' ? sum + parseFloat(item.tds) : sum+0 , 0).toFixed(2));
const totalDividendFromInvestorsCMSF = parseFloat(cmsfTableDataForCMSF.reduce((sum, item) => item.status === 'Paid' ? sum + item.amount : sum+0, 0).toFixed(2));


export const getIssuersData = () => ({
  metrics: [
    { id: 'totalAmount', title: 'Total Dividend Amount', value: formatCurrency(totalDividendFromIssuers), change: '+3.5%', icon: 'Wallet' },
    { id: 'totalInvestors', title: 'Total Investor', value: 3, change: '0', icon: 'Landmark' },
    { id: 'avgHolding', title: 'Net Dividend', value: formatCurrency(totalDividendFromIssuers-totalTdsFromIssuerData), change: '-1.2%', icon: 'Users' },
    { id: 'taxAmount', title: 'Total Tax(TDS)', value: formatCurrency(totalTdsFromIssuerData), change: '+25', icon: 'Users' },
  ],
  chartData: baseChartData,
  chartConfig: chartConfigBase,
  tableData: issuerTableDataForIssuer,
  tableColumns: baseTableColumns
});


export const getInvestorsData = () => ({
  metrics: baseMetrics(totalDividendFromInvestors, 3, totalTdsFromInvestorData),
  chartData: [...baseChartData].reverse().map(d => ({ ...d, amount: d.amount * 0.8 })),
  chartConfig: chartConfigBase,
  tableData: investorTableDataForInvestor,
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
    { id: 'fundValue', title: 'Total Dividend', value: formatCurrency(totalDividendFromInvestorsCMSF), change: '+3.5%', icon: 'Wallet' },
    { id: 'ytdGrowth', title: 'Total TDS', value: formatCurrency(totalTdsFromIssuersData), change: '', icon: 'Landmark' },
    { id: 'unclaimedDividends', title: 'Total Issuers', value: 3, change: '-1.2%', icon: 'Users' },
    { id: 'participatingIssuers', title: 'Total Investors', value: 10, change: '+25', icon: 'Users' },
  ],
  chartData: baseChartData.map(d => ({ ...d, amount: d.amount * 50 })),
  chartConfig: chartConfigBase,
  tableData: cmsfTableData,
  tableColumns: baseTableColumns
});
