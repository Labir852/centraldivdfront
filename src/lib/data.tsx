

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
  { id: 'totalInvestors', title: 'Total Entities', value: investors.toLocaleString(),  icon: 'Users' },
  { id: 'avgHolding', title: 'Net Dividend', value: formatCurrency((total - totalTds)),  icon: 'Landmark' },
  { id: 'taxAmount', title: 'Total Tax (TDS)', value: formatCurrency(totalTds), change: '-15%', icon: 'FileText' },
  ];

const baseTableColumns = [
    { header: 'SL', accessor: 'sl' },
    {header: 'TIN', accessor:'tin'},
    { header: 'BOID', accessor: 'id' },
    { header: 'DP', accessor: 'dp' },
    { header: 'Trade Code', accessor: 'tradecode' },
    { header: 'Issuer Name', accessor: 'name' },
    { header: 'Record Date', accessor: 'recorddate' },
    { header: 'Dividend', accessor: 'amount' },
    { header: 'TDS', accessor: 'tds' },
    { header: 'Net Dividend', accessor:'netdividend'},
    { header: 'Status', accessor: 'status' },
];

const getFinancialYear = (dateString: string) => {
  const year = parseInt(dateString.split(' ')[2], 10);
  if (year === 2024) return '2024-2025';
  if (year === 2025) return '2025-2026';
  return 'N/A';
};

const cmsfTableData = [
  { sl:1, id: '1201430058147387',  dp: 'Trust Bank Limited',tin:'127905441477', tradecode:'BATBC', name: 'British American Tobacco Bangladesh Company Ltd. ', recorddate:"June 30, 2025", amount: 13333.33, tds: 2000, status: 'Paid' },
  { sl:2, id: '1205590058147387',  dp: 'UCB Stock Brokerage Limited', tin:'727863441477', tradecode:'GP', name: 'Grameenphone Ltd.', recorddate:"March 30, 2025", amount: 300, tds: 45, status: 'Pending' },
  { sl:3, id: '1201730058147387',  dp: 'Kazi Equities Ltd.', tin:'823405441477', tradecode:'AIBL1STIMF', name: 'AIBL 1st Islamic Mutual Fund', recorddate:"December 30, 2024", amount: 500, tds: 75, status: 'Paid' },
  { sl:4, id: '1205590058147387',  dp: 'UCB Stock Brokerage Limited',tin:'527905491277', tradecode:'BATBC', name: 'British American Tobacco Bangladesh Company Ltd. ', recorddate:"January 30, 2024", amount: 15000, tds: 2000, status: 'Paid' },
  { sl:5, id: '1206600058147387',  dp: 'KDS Shares and Securities Limited', tin:'353905481477', tradecode:'AIBL1STIMF', name: 'AIBL 1st Islamic Mutual Fund', recorddate:"December 30, 2024", amount: 500, tds: 75, status: 'Paid' },
  { sl:6, id: '1204030058147387',  dp: 'Lanka Bangla Securities Limited Banani', tin:'59305441577', tradecode:'GP', name: 'Grameenphone Ltd.', recorddate:"February 30, 2025", amount: 300, tds: 45, status: 'Paid' },
  { sl:7, id: '1205590058147387',  dp: 'UCB Stock Brokerage Limited',tin:'895902441477', tradecode:'BATBC', name: 'British American Tobacco Bangladesh Company Ltd. ', recorddate:"October 01, 2024", amount: 5655, tds: 2000, status: 'Paid' },
  { sl:8, id: '1204580058147387',  dp: 'Investment Corporation Of Bangladesh', tin:'888505441477', tradecode:'AIBL1STIMF', name: 'AIBL 1st Islamic Mutual Fund', recorddate:"September 30, 2024", amount: 3845, tds: 75, status: 'Paid' },
  { sl:9, id: '1205590058147387',  dp: 'UCB Stock Brokerage Limited',tin:'321906441477', tradecode:'BATBC', name: 'British American Tobacco Bangladesh Company Ltd. ', recorddate:"June 30, 2025", amount: 87963, tds: 2000, status: 'Paid' },
  { sl:10, id: '1205590058147387', dp: 'UCB Stock Brokerage Limited', tin:'127907441477', tradecode:'GP', name: 'Grameenphone Ltd.', recorddate:"March 31, 2024", amount: 345, tds: 45, status: 'Paid' },
].map(item => ({ ...item, financialYear: getFinancialYear(item.recorddate) }));


const issuerTableData  = [
  { sl:1, id: '1201430058147387', dp: 'Trust Bank Limited', tin:'127905441477', tradecode:'GP', name: 'Grameenphone Ltd.', recorddate:"March 30, 2025", amount: 300, tds: 45, status: 'Pending' },
  { sl:2, id: '1205590058147387',  dp: 'UCB Stock Brokerage Limited', tin:'127905441577', tradecode:'GP', name: 'Grameenphone Ltd.', recorddate:"February 30, 2025", amount: 300, tds: 45, status: 'Paid' },
  { sl:3, id: '1205590058147387',  dp: 'UCB Stock Brokerage Limited', tin:'127907441477', tradecode:'GP', name: 'Grameenphone Ltd.', recorddate:"March 31, 2024", amount: 345, tds: 45, status: 'Paid' },
].map(item => ({ ...item, financialYear: getFinancialYear(item.recorddate) }));

const issuerTableDataForIssuer= [...issuerTableData].map(d => ({ ...d, id: d.id.replace('INV', 'INVR'), amount: d.amount , tds: (d.amount * 0.15).toFixed(2),netdividend:(d.amount * 0.85).toFixed(2)})).sort((a,b) => a.sl > b.sl ? 1 : -1);
const totalTdsFromIssuerData = parseFloat(issuerTableDataForIssuer.reduce((sum, item) => item.status === 'Paid' ? sum + parseFloat(item.tds) : sum+0 , 0).toFixed(2));
const totalDividendFromIssuers = parseFloat(issuerTableDataForIssuer.reduce((sum, item) => item.status === 'Paid' ? sum + item.amount : sum+0, 0).toFixed(2));



const investorsTableData = [
  { sl:1, id: '1201430058147387',  dp: 'Trust Bank Limited',tin:'127905441477', tradecode:'BATBC', name: 'British American Tobacco Bangladesh Company Ltd. ', recorddate:"June 30, 2025", amount: 13333.33, tds: 2000, status: 'Paid' },
  { sl:2, id: '1205590058147387',dp: 'UCB Stock Brokerage Limited', tin:'127905441477', tradecode:'GP', name: 'Grameenphone Ltd.', recorddate:"February 30, 2025", amount: 300, tds: 45, status: 'Pending' },
  { sl:3, id: '1205590058147387', dp: 'UCB Stock Brokerage Limited', tin:'127905441477', tradecode:'AIBL1STIMF', name: 'AIBL 1st Islamic Mutual Fund', recorddate:"December 30, 2024", amount: 500, tds: 75, status: 'Paid' },
].map(item => ({ ...item, financialYear: getFinancialYear(item.recorddate) }));

const investorTableDataForInvestor = [...investorsTableData].map(d => ({ ...d, id: d.id.replace('INV', 'INVR'), amount: d.amount , tds: (d.amount * 0.15).toFixed(2),netdividend:(d.amount * 0.85).toFixed(2)})).sort((a,b) => a.sl > b.sl ? 1 : -1);
const totalTdsFromInvestorData = parseFloat(investorTableDataForInvestor.reduce((sum, item) => item.status === 'Paid' ? sum + parseFloat(item.tds) : sum+0 , 0).toFixed(2));
const totalDividendFromInvestors = parseFloat(investorTableDataForInvestor.reduce((sum, item) => item.status === 'Paid' ? sum + item.amount : sum+0, 0).toFixed(2));



const cmsfTableDataForCMSF = [...cmsfTableData].map(d => ({ ...d, id: d.id.replace('INV', 'INVR'), amount: d.amount , tds: (d.amount * 0.15).toFixed(2),netdividend:(d.amount * 0.85).toFixed(2)})).sort((a,b) => a.sl > b.sl ? 1 : -1);
const totalTdsFromIssuersData = parseFloat(cmsfTableDataForCMSF.reduce((sum, item) => item.status === 'Paid' ? sum + parseFloat(item.tds) : sum+0 , 0).toFixed(2));
const totalDividendFromInvestorsCMSF = parseFloat(cmsfTableDataForCMSF.reduce((sum, item) => item.status === 'Paid' ? sum + item.amount : sum+0, 0).toFixed(2));


export const getIssuersData = () => ({
  metrics: [
    { id: 'totalAmount', title: 'Total Dividend Amount', value: formatCurrency(totalDividendFromIssuers), change: '+3.5%', icon: 'Wallet' },
    { id: 'totalInvestors', title: 'Total Investors', value: 3, change: '0', icon: 'Landmark' },
    { id: 'avgHolding', title: 'Net Dividend', value: formatCurrency(totalDividendFromIssuers-totalTdsFromIssuerData), change: '-1.2%', icon: 'Users' },
    { id: 'taxAmount', title: 'Total Tax(TDS)', value: formatCurrency(totalTdsFromIssuerData), change: '+25', icon: 'Users' },
  ],
  chartData: baseChartData,
  chartConfig: chartConfigBase,
  tableData: issuerTableDataForIssuer,
  tableColumns: baseTableColumns
});


export const getInvestorsData = () => ({
  metrics: [
    { id: 'totalAmount', title: 'Total Dividend Amount', value: formatCurrency(totalDividendFromInvestors), icon: 'Wallet' },
    { id: 'totalInvestors', title: 'Total Issuers', value: 3,  icon: 'Users' },
    { id: 'avgHolding', title: 'Net Dividend', value: formatCurrency((totalDividendFromInvestors - totalTdsFromInvestorData)),  icon: 'Landmark' },
    { id: 'taxAmount', title: 'Total Tax (TDS)', value: formatCurrency(totalTdsFromInvestorData), change: '-15%', icon: 'FileText' },
    ],
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
    { id: 'REG-01', name: 'Securities Board', region: 'National', active_cases: 5, status: 'Active', financialYear: '2025-2026' },
    { id: 'REG-02', name: 'Financial Conduct Group', region: 'Western', active_cases: 2, status: 'Active', financialYear: '2025-2026' },
    { id: 'REG-03', name: 'Market Oversight Panel', region: 'Eastern', active_cases: 8, status: 'Active', financialYear: '2024-2025' },
    { id: 'REG-04', name: 'Investment Protection Agy', region: 'National', active_cases: 0, status: 'Inactive', financialYear: '2024-2025' },
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
