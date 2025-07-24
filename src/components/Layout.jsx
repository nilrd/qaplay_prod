import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import AdBannerTop from './ads/AdBannerTop'
import AdBannerSidebar from './ads/AdBannerSidebar'

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <AdBannerTop />
      <Header />
      
      <div className="flex-1 flex">
        <main className="flex-1 container mx-auto px-4 py-8">
          <Outlet />
        </main>
        <AdBannerSidebar />
      </div>
      
      <Footer />
    </div>
  )
}

export default Layout

