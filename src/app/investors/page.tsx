import { getInvestorsData } from '@/lib/data.tsx';
import { DashboardClientPage } from '@/components/dashboard-client-page';

export default function InvestorsPage() {
  const investorsData = getInvestorsData();
  return (
    <DashboardClientPage
      title="Investors"
      description="View summaries and detailed information for all investors."
      data={investorsData}
      searchable={true}
      dataType="investors"
    />
  );
}
