import { getRegulatorsData } from '@/lib/data.tsx';
import { DashboardClientPage } from '@/components/dashboard-client-page';

export default function RegulatorsPage() {
  const regulatorsData = getRegulatorsData();
  return (
    <DashboardClientPage
      title="Regulators"
      description="Access metrics and detailed information for regulatory bodies."
      data={regulatorsData}
      searchable={false}
      dataType="regulators"
    />
  );
}
