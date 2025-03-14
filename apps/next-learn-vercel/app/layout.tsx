import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';

// Root layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* antialiased: 使文字边缘更加平滑，减少锯齿状的显示效果 */}
      <body suppressHydrationWarning className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
