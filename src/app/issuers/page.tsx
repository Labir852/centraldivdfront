import { getIssuersData } from '@/lib/data.tsx';
import { DashboardClientPage } from '@/components/dashboard-client-page';

export default function IssuersPage() {
  const issuersData = getIssuersData();
  return (
    <DashboardClientPage
      title="Issuers"
      description="Monitor key metrics and investor details for issuers."
      data={issuersData}
      searchable={true}
      dataType="issuers"
    />
  );
}
