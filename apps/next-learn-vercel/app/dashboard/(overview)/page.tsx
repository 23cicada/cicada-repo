
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import CardWrapper from '@/app/ui/dashboard/cards';
import { lusitana } from '@/app/ui/fonts';
import { LatestInvoicesSkeleton, RevenueChartSkeleton, CardsSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';

/**
 * React Server Components
 * 使用 async/await 来获取数据，无需再使用 useEffect，useState
 * 在服务器端运行
 * 直接查询数据库，无需额外 API
 */
export default async function Page() {
  /**
   * Next.js 默认使用Static Rendering(静态渲染)来提升性能，这意味着当数据更新时，仪表盘不会自动反映最新变化
   *
   * Static Rendering: 数据获取和渲染在服务端上构建/部署时进行 (应用程序不会反映最新的数据更改)
   * Dynamic Rendering: 在用户请求时（访问页面时）在服务器上进行渲染
   */

  // 数据请求互相阻塞，形成了"请求瀑布"
  // 使用 Suspense 进行同时请求
  // 通常，最好将数据获取逻辑下移到实际需要这些数据的组件中，然后用 Suspense 组件将它们包裹起来

  // const revenue = await fetchRevenue()
  // const latestInvoices = await fetchLatestInvoices()
  // const {
  //   numberOfInvoices,
  //   numberOfCustomers,
  //   totalPaidInvoices,
  //   totalPendingInvoices,
  // } = await fetchCardData();
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        /> */}
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {/*
          You have to fetch everything before you can show anything
          在数据获取过程中，整个页面的用户界面都被阻塞，访问者无法看到任何内容。
          使用 loading.tsx 或 Suspense 进行流式传输
        */}
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart  />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
}
