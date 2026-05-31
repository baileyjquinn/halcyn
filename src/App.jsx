import Header from './components/layout/Header'
import Hero from './components/features/Hero'
import FeaturesSection from './components/features/FeaturesSection'
import LeadCapture from './components/features/LeadCapture'
import CTASection from './components/features/CTASection'
import Footer from './components/layout/Footer'

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <FeaturesSection />
        <CTASection />
        <LeadCapture />
      </main>
      <Footer />
    </div>
  )
}