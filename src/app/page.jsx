'use client'
import { useState, useEffect } from 'react'
import Cursor from '../components/Cursor'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
// import PropertyCarousel from '../components/PropertyCarousel'
// import MarqueeTicker from '../components/MarqueeTicker'
import StatsRow from '../components/StatsRow'
import HowItWorks from '../components/HowItWorks'
import TrustBadges from '../components/TrustBadges'
import BatchSection from '../components/BatchSection'
import FAQ from '../components/FAQ'
import { StickyCTA } from '../components/UIExtras'
import { ToastContainer, useToast } from '../components/Toast'

export default function Home() {
  const [activeIdx, setActiveIdx] = useState(3)
  const { toasts, addToast } = useToast()

  useEffect(() => {
    const t = setTimeout(() => addToast('🏠', 'Batch 4 is Live!', '78% sold — secure your tokens before they run out.'), 1100)
    return () => clearTimeout(t)
  }, [])

  const handleInvest = () => addToast('🚀', 'Get Started!', 'Creating your investor account…')
  const handleSignUp = () => addToast('👋', 'Welcome!', 'Create your free account to start investing.')

  return (
    <>
      <Cursor />
      <Navbar onSignUp={handleSignUp} />
      <HeroSection onCTA={handleInvest} />
      {/* <PropertyCarousel onCTA={handleInvest} /> */}
      {/* <MarqueeTicker /> */}
      <StatsRow />
      <HowItWorks />
      <TrustBadges />
      <BatchSection activeIdx={activeIdx} setActiveIdx={setActiveIdx} showToast={addToast} />
      <FAQ />
      <StickyCTA onInvest={handleInvest} />
      <ToastContainer toasts={toasts} />
    </>
  )
}
