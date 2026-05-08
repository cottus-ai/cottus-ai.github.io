import AkernlSubNav from './AkernlSubNav'
import AkernlHero from './sections/AkernlHero'
import WhatIsAkernl from './sections/WhatIsAkernl'
import WhyAkernl from './sections/WhyAkernl'
import Architecture from './sections/Architecture'
import FeaturesGrid from './sections/FeaturesGrid'
import ProjectStatus from './sections/ProjectStatus'
import DocsPreview from './sections/DocsPreview'
import Vision from './sections/Vision'

export default function AkernlPage() {
  return (
    <div className="pt-[3.5rem]">
      <AkernlHero />
      <AkernlSubNav />
      <WhatIsAkernl />
      <WhyAkernl />
      <Architecture />
      <FeaturesGrid />
      <ProjectStatus />
      <DocsPreview />
      <Vision />
    </div>
  )
}
