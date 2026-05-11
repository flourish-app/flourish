import type { Metadata } from 'next'
import DashboardSidebar from '@/components/DashboardSidebar'

export const metadata: Metadata = {
  title: 'Dashboard — Flourish',
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dashboard-shell">
      <DashboardSidebar />
      <main className="dashboard-main">
        {children}
      </main>
    </div>
  )
}
