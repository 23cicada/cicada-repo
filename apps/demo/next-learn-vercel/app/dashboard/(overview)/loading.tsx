import DashboardSkeleton from '@/app/ui/skeletons';

// Route group: The loading.tsx file will only apply to your dashboard → overview page
// loadint.tsx 基于 React Suspense 构建
export default function Loading() {
  return <DashboardSkeleton />;
}