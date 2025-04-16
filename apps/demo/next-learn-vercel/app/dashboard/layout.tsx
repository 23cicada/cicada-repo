import SideNav from '@/app/ui/dashboard/sidenav';

// layout.tsx: 文件夹层次结构中的 payout.tsx 是嵌套的 (在多个页面之间共享 UI，dashboard 内所有页面都会嵌套在 Layout 中)
// partial rendering(部分渲染): 导航时，只会更新页面组件，不会重渲染 layout (并在页面切换时保留 React 状态)
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
