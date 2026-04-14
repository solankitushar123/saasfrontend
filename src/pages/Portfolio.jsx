import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { X, ExternalLink, ArrowRight } from 'lucide-react'

const projects = [
  { id: 1, title: 'The Alpha School', category: 'SaaS', image: 'https://scontent-bom5-1.xx.fbcdn.net/v/t39.30808-6/469981655_122111077196627507_7187180421328268391_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=2a1932&_nc_ohc=QrELANDxi1sQ7kNvwH8ePYB&_nc_oc=Adrb2i4J_-nxfu_BcT494LXQO2V5BNzqQ85tAuXH1gpjMo6bsrtJe7Eb2ttPDkVTKUaR0-sQ7WLO2YKZO_ZsDWlC&_nc_zt=23&_nc_ht=scontent-bom5-1.xx&_nc_gid=asc6bEp-OFv_e4QqMJY8xw&_nc_ss=7a389&oh=00_Af0H91q2FzrlmyMMwKTrPiKc_250sYD8f_IC_5qq_W3U_g&oe=69E3EAC0', desc: 'A comprehensive financial management platform built for SMBs. Features include invoicing, expense tracking, payroll, and real-time reporting. Serves 500+ businesses globally.', tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redis', 'AWS'], url: 'https://thealphaSchool-demo.com', client: 'FinTech Solutions Inc.', color: '#6366f1' },
  {
    id: 2, title: 'Zinger - The Grocery App',category: 'Web App',image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80',desc: 'A smart grocery delivery platform enabling seamless ordering, real-time tracking, and efficient management for customers, stores, and delivery partners.',
    tech: ['React.js', 'Node.js', 'MongoDB', 'Express', 'Socket.io'],url: 'https://zinger-demo.com',client: 'Zinger',color: '#22c55e'},
   { id: 3, title: 'EduSpark Learning Platform', category: 'SaaS', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80', desc: 'A next-generation LMS with AI-powered adaptive learning paths, live virtual classrooms, gamification, and progress analytics.', tech: ['React', 'Node.js', 'OpenAI', 'WebRTC', 'MongoDB', 'AWS'], url: 'https://eduspark-demo.com', client: 'EduTech Ventures', color: '#8b5cf6' },
  { id: 4, title: 'ShopSphere E-commerce', category: 'E-commerce', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80', desc: 'A high-performance headless commerce platform with omnichannel capabilities, AI-powered recommendations, and real-time inventory management.', tech: ['Next.js', 'GraphQL', 'Prisma', 'Stripe', 'Elasticsearch'], url: 'https://shopsphere-demo.com', client: 'RetailPro Ltd', color: '#f59e0b' },
  { id: 5, title: 'DataSense AI Analytics', category: 'AI/ML', image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&q=80', desc: 'An AI-powered business intelligence platform that transforms raw data into actionable insights with predictive analytics and custom dashboards.', tech: ['Python', 'React', 'TensorFlow', 'ClickHouse', 'FastAPI', 'Grafana'], url: 'https://datasense-demo.com', client: 'Analytics Corp', color: '#10b981' },
  { id: 6, title: 'TaskFlow Project Manager', category: 'SaaS', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80', desc: 'A modern project management tool with real-time collaboration, AI task prioritization, time tracking, and comprehensive reporting for agile teams.', tech: ['React', 'Node.js', 'Socket.io', 'PostgreSQL', 'Redis', 'Docker'], url: 'https://taskflow-demo.com', client: 'ProductivityHQ', color: '#ef4444' },
]

const categories = ['All', 'SaaS', 'Web App', 'E-commerce', 'AI/ML']

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)

  const filtered = activeCategory === 'All' ? projects : projects.filter((p) => p.category === activeCategory)

  return (
    <div style={{ background: '#030712' }}>
      {/* Hero */}
      <section className="relative pt-36 pb-20 overflow-hidden" style={{ background: 'radial-gradient(ellipse at top, #1a1040 0%, #030712 60%)' }}>
        <div className="absolute inset-0 opacity-25" style={{ backgroundImage: 'linear-gradient(rgba(99,102,241,0.07) 1px, transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.07) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-medium mb-4" style={{ color: '#6366f1' }}>OUR WORK</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display font-extrabold text-5xl md:text-6xl text-white mb-6">
            Products We've{' '}
            <span style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Built</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-gray-400 text-lg">
            50+ products shipped. Each one crafted with obsessive attention to detail, scalability, and user experience.
          </motion.p>
        </div>
      </section>

      {/* Filter */}
      <section className="py-10" style={{ background: '#0a0f1e', borderBottom: '1px solid rgba(99,102,241,0.1)' }}>
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
              style={activeCategory === cat
                ? { background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: 'white' }
                : { background: 'rgba(255,255,255,0.04)', color: '#9ca3af', border: '1px solid rgba(255,255,255,0.08)' }}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div key={activeCategory} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project, i) => (
                <motion.div key={project.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -8 }}
                  onClick={() => setSelectedProject(project)}
                  className="group cursor-pointer rounded-2xl overflow-hidden"
                  style={{ background: '#0a0f1e', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="relative overflow-hidden h-52">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center" style={{ background: 'rgba(99,102,241,0.85)' }}>
                      <span className="text-white font-semibold text-sm flex items-center gap-2">View Details <ArrowRight size={16} /></span>
                    </div>
                    <div className="absolute top-3 left-3">
                      <span className="text-xs font-medium px-3 py-1 rounded-full" style={{ background: `${project.color}25`, color: project.color, border: `1px solid ${project.color}40` }}>
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display font-semibold text-lg text-white mb-2 group-hover:text-primary-400 transition-colors">{project.title}</h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.slice(0, 4).map((t) => (
                        <span key={t} className="text-xs px-2 py-0.5 rounded text-gray-400" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>{t}</span>
                      ))}
                      {project.tech.length > 4 && <span className="text-xs px-2 py-0.5 rounded text-gray-500">+{project.tech.length - 4}</span>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(3,7,18,0.9)', backdropFilter: 'blur(10px)' }}
            onClick={() => setSelectedProject(null)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl w-full rounded-3xl overflow-hidden"
              style={{ background: '#0a0f1e', border: '1px solid rgba(99,102,241,0.25)', maxHeight: '90vh', overflowY: 'auto' }}>
              <div className="relative h-56">
                <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0a0f1e, transparent)' }} />
                <button onClick={() => setSelectedProject(null)} className="absolute top-4 right-4 w-9 h-9 rounded-xl flex items-center justify-center text-white transition-colors" style={{ background: 'rgba(0,0,0,0.6)' }}>
                  <X size={18} />
                </button>
              </div>
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full mb-2 inline-block" style={{ background: `${selectedProject.color}20`, color: selectedProject.color }}>{selectedProject.category}</span>
                    <h2 className="font-display font-bold text-2xl text-white">{selectedProject.title}</h2>
                    <p className="text-sm text-gray-500 mt-1">Client: {selectedProject.client}</p>
                  </div>
                  <a href={selectedProject.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-xl transition-all"
                    style={{ background: `${selectedProject.color}20`, color: selectedProject.color, border: `1px solid ${selectedProject.color}30` }}>
                    <ExternalLink size={14} /> Live Demo
                  </a>
                </div>
                <p className="text-gray-400 leading-relaxed mb-6">{selectedProject.desc}</p>
                <div>
                  <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((t) => (
                      <span key={t} className="text-sm px-3 py-1 rounded-lg text-gray-300" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>{t}</span>
                    ))}
                  </div>
                </div>
                <div className="mt-8">
                  <Link to="/contact" onClick={() => setSelectedProject(null)}
                    className="inline-flex items-center gap-2 font-semibold text-white px-6 py-3 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
                    style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
                    Build Something Like This <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <section className="py-20" style={{ background: '#0a0f1e', borderTop: '1px solid rgba(99,102,241,0.1)' }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display font-extrabold text-4xl text-white mb-5">Have a Project in Mind?</h2>
          <p className="text-gray-400 mb-8">Let's build something great together. Tell us about your idea and we'll respond within 24 hours.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 font-semibold text-white px-10 py-4 rounded-xl transition-all duration-300 hover:-translate-y-1" style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', boxShadow: '0 0 40px rgba(99,102,241,0.35)' }}>
            Start a Project <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  )
}
