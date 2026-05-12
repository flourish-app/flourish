import Link from 'next/link'
import ScrollAnimations   from '@/components/ScrollAnimations'
import { StartLearningCTA } from '@/components/StartLearningCTA'
import HomeHero           from '@/components/Marketing/HomeHero'
import HomeStats          from '@/components/Marketing/HomeStats'
import HomeHowItWorks     from '@/components/Marketing/HomeHowItWorks'
import HomeCoursesGrid    from '@/components/Marketing/HomeCoursesGrid'
import HomeToolsGrid      from '@/components/Marketing/HomeToolsGrid'
import HomeSimTeaser      from '@/components/Marketing/HomeSimTeaser'
import HomeTestimonials   from '@/components/Marketing/HomeTestimonials'
import CtaBanner          from '@/components/Marketing/CtaBanner'

export default function Home() {
  return (
    <>
      <ScrollAnimations />
      <HomeHero />
      <HomeStats />
      <HomeHowItWorks />
      <HomeCoursesGrid />
      <HomeToolsGrid />
      <HomeSimTeaser />
      <HomeTestimonials />
      <CtaBanner
        headline="Your future self will thank you for starting today"
        sub="Every year you wait costs you more than you think. It takes 20 minutes to learn something that could change your financial life."
      >
        <StartLearningCTA className="btn btn--white btn--lg" />
        <Link href="/courses" className="btn btn--ghost-white btn--lg">Browse courses</Link>
      </CtaBanner>
    </>
  )
}
