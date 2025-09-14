import { getCmsfData } from '@/lib/data.tsx';
import { DashboardClientPage } from '@/components/dashboard-client-page';

export default function CmsfPage() {
  const cmsfData = getCmsfData();
  return (
    <DashboardClientPage
      title="Capital Market Stabilization Fund (CMSF)"
      description="Track the performance and specifics of the stabilization fund."
      data={cmsfData}
      searchable={true}
      dataType="cmsf"
    />
  );
}
