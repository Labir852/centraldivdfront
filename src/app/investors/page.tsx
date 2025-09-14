'use client';
import { useState, useEffect } from 'react';
import { getInvestorsData } from '@/lib/data.tsx';
import { DashboardClientPage } from '@/components/dashboard-client-page';

export default function InvestorsPage() {
  const investorsData = getInvestorsData();
  const [userName, setUserName] = useState<string | undefined>(undefined);

  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (userString) {
      try {
        const user = JSON.parse(userString);
        setUserName(user.username);
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
      }
    }
  }, []);

  return (
    <DashboardClientPage
      title={userName || "Investor"}
      description="View summaries and detailed information for all investors."
      data={investorsData}
      searchable={true}
      dataType="investors"
    />
  );
}
