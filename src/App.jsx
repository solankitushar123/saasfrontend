import { useEffect, lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { getMe } from './store/authSlice'
import Layout from './components/layout/Layout'
import ProtectedRoute from './components/ui/ProtectedRoute'
import PageLoader from './components/ui/PageLoader'
import ScrollProgress from './components/ui/ScrollProgress'
import CustomCursor from './components/ui/CustomCursor'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const Portfolio = lazy(() => import('./pages/Portfolio'))
const Pricing = lazy(() => import('./pages/Pricing'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const Contact = lazy(() => import('./pages/Contact'))


const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
}

export default function App() {
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) dispatch(getMe())
  }, [dispatch])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <AnimatePresence mode="wait">
        <Suspense fallback={<PageLoader />}>
          <Routes location={location} key={location.pathname}>
            {/* Public Routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<motion.div {...pageVariants}><Home /></motion.div>} />
              <Route path="about" element={<motion.div {...pageVariants}><About /></motion.div>} />
              <Route path="services" element={<motion.div {...pageVariants}><Services /></motion.div>} />
              <Route path="portfolio" element={<motion.div {...pageVariants}><Portfolio /></motion.div>} />
              <Route path="pricing" element={<motion.div {...pageVariants}><Pricing /></motion.div>} />
              <Route path="blog" element={<motion.div {...pageVariants}><Blog /></motion.div>} />
              <Route path="blog/:slug" element={<motion.div {...pageVariants}><BlogPost /></motion.div>} />
              <Route path="contact" element={<motion.div {...pageVariants}><Contact /></motion.div>} />
            </Route>

            
          </Routes>
        </Suspense>
      </AnimatePresence>
    </>
  )
}
