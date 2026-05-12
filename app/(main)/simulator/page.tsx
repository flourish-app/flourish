import type { Metadata } from 'next'
import Link            from 'next/link'
import SimPageHero        from '@/components/Marketing/SimPageHero'
import SimPageFeatures    from '@/components/Marketing/SimPageFeatures'
import SimPageSteps       from '@/components/Marketing/SimPageSteps'
import SimPageLeaderboard from '@/components/Marketing/SimPageLeaderboard'
import CtaBanner          from '@/components/Marketing/CtaBanner'

export const metadata: Metadata = {
  title: 'Portfolio Simulator - Flourish',
  description: 'Practice investing with £10,000 of virtual money. Real stocks, real prices, zero risk. The investing simulator built for UK students.',
}

export default function SimulatorPage() {
  return (
    <div className="simpage">
      <SimPageHero />
      <SimPageFeatures />
      <SimPageSteps />
      <SimPageLeaderboard />
      <CtaBanner
        headline="Start practising before it counts"
        sub="Create a free account and start investing with £10,000 of virtual cash today."
      >
        <Link href="/start-learning" className="btn btn--white btn--lg">Start trading free</Link>
        <Link href="/courses" className="btn btn--ghost-white btn--lg">Browse courses</Link>
      </CtaBanner>
    </div>
  )
}
