import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Target, Eye, Heart, Rocket } from 'lucide-react'

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }

const team = [
  {
    name: 'Tejasvi Solanki',
    role: 'CEO & Co-founder',
    bio: '3+ years building SaaS products for Indian startups. Led multiple successful product launches across fintech and edtech.',
    avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
    color: '#6366f1'
  },
  {
    name: 'Sourabh Singh Rajput',
    role: 'CTO & Co-founder',
    bio: 'Backend systems architect. Scaled cloud infrastructure handling lakhs of users with high availability.',
    avatar: 'https://randomuser.me/api/portraits/women/21.jpg',
    color: '#8b5cf6'
  },
  {
    name: 'Kunal Sharma',
    role: 'Head of Design',
    bio: 'UX specialist focused on modern SaaS interfaces. Designs clean, conversion-focused user experiences.',
    avatar: 'https://randomuser.me/api/portraits/men/31.jpg',
    color: '#06b6d4'
  },
  {
    name: 'Ravi Patel',
    role: 'Lead Engineer',
    bio: 'Full-stack developer with strong expertise in MERN stack. Builds scalable and optimized applications.',
    avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
    color: '#f59e0b'
  },
  {
    name: 'Sneha Iyer',
    role: 'AI/ML Lead',
    bio: 'AI engineer working on smart automation and recommendation systems for SaaS platforms.',
    avatar: 'https://randomuser.me/api/portraits/women/51.jpg',
    color: '#10b981'
  },
  {
    name: 'Vikram Singh',
    role: 'DevOps Lead',
    bio: 'Cloud and DevOps expert managing deployments, CI/CD pipelines, and system reliability.',
    avatar: 'https://randomuser.me/api/portraits/men/61.jpg',
    color: '#ef4444'
  },
]

const values = [
  { icon: Target, title: 'Client-First', desc: 'Your success is our success. We measure outcomes, not hours.', color: '#6366f1' },
  { icon: Eye, title: 'Radical Transparency', desc: 'Daily updates, open communication, no hidden surprises.', color: '#06b6d4' },
  { icon: Heart, title: 'Craftsmanship', desc: 'We take pride in every line of code and pixel of design.', color: '#8b5cf6' },
  { icon: Rocket, title: 'Move Fast', desc: 'Agile sprints, rapid iteration, and ship-ready builds.', color: '#f59e0b' },
]

const timeline = [
  { year: '2024', event: 'Founded in San Francisco with 2 engineers and a bold vision.' },
  { year: '2024', event: 'Launched first enterprise SaaS platform serving 10,000+ users.' },
  { year: '2025', event: 'Expanded to AI/ML services. Grew team to 25 specialists.' },
  { year: '2025', event: 'Reached $10M ARR milestone. Opened offices in London and Singapore.' },
  { year: '2026', event: '5+ products launched globally. Named Top SaaS Agency by Forbes.' },
]

export default function About() {
  const teamRef = useRef(null)
  const teamInView = useInView(teamRef, { once: true, margin: '-100px' })

  return (
    <div style={{ background: '#030712' }}>
      {/* Hero */}
      <section className="relative pt-36 pb-24 overflow-hidden" style={{ background: 'radial-gradient(ellipse at top, #1a1040 0%, #030712 60%)' }}>
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(rgba(99,102,241,0.07) 1px, transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.07) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-medium mb-4" style={{ color: '#6366f1' }}>ABOUT NEXAFORGE</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display font-extrabold text-5xl md:text-6xl text-white mb-6">
            We're a Team of{' '}
            <span style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Builders
            </span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-gray-400 text-xl max-w-2xl mx-auto">
            Since 2023, we've been the engineering partner behind some of the world's fastest-growing SaaS companies.
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24" style={{ background: '#0a0f1e' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className="text-sm font-medium mb-3" style={{ color: '#6366f1' }}>OUR STORY</p>
            <h2 className="font-display font-extrabold text-4xl text-white mb-6">Built by Engineers, for Founders</h2>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>NexaForge was founded by two engineers who were tired of seeing great ideas fail because of poor technical execution. We set out to build the agency we wished existed when we were founders ourselves.</p>
              <p>Today we're a 40+ person team of engineers, designers, and product thinkers united by one goal: building software products that genuinely move the needle for our clients.</p>
              <p>We don't just write code — we become your technical co-founders, your architects, and your partners in building something lasting.</p>
            </div>
            <Link to="/contact" className="inline-flex items-center gap-2 mt-8 font-semibold text-white px-8 py-4 rounded-xl transition-all duration-300 hover:-translate-y-1" style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
              Work With Us <ArrowRight size={16} />
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="grid grid-cols-2 gap-4">
            {[{ label: 'Mission', icon: '🎯', text: 'Empower every founder to build world-class software, regardless of their technical background.' },
              { label: 'Vision', icon: '🔭', text: 'A world where every great idea gets the technical execution it deserves.' }].map(({ label, icon, text }) => (
              <div key={label} className="p-6 rounded-2xl col-span-2 md:col-span-1" style={{ background: '#030712', border: '1px solid rgba(99,102,241,0.2)' }}>
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="font-display font-bold text-white mb-2">{label}</h3>
                <p className="text-gray-400 text-sm">{text}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24" style={{ background: '#030712' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-medium mb-3" style={{ color: '#6366f1' }}>WHAT DRIVES US</p>
            <h2 className="font-display font-extrabold text-4xl text-white">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl text-center" style={{ background: '#0a0f1e', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="inline-flex w-12 h-12 rounded-xl items-center justify-center mb-4" style={{ background: `${v.color}20`, border: `1px solid ${v.color}40` }}>
                  <v.icon size={22} style={{ color: v.color }} />
                </div>
                <h3 className="font-display font-semibold text-white mb-2">{v.title}</h3>
                <p className="text-gray-400 text-sm">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24" style={{ background: '#0a0f1e' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-medium mb-3" style={{ color: '#6366f1' }}>OUR JOURNEY</p>
            <h2 className="font-display font-extrabold text-4xl text-white">2 Years of Building</h2>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(to bottom, #6366f1, transparent)' }} />
            <div className="space-y-8">
              {timeline.map((item, i) => (
                <motion.div key={item.year} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                  className="flex items-start gap-6 pl-16 relative">
                  <div className="absolute left-0 w-16 flex items-center">
                    <div className="w-4 h-4 rounded-full flex-shrink-0 ml-6 z-10" style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', boxShadow: '0 0 12px rgba(99,102,241,0.5)' }} />
                  </div>
                  <div className="p-5 rounded-xl flex-1" style={{ background: '#030712', border: '1px solid rgba(99,102,241,0.15)' }}>
                    <span className="text-xs font-bold text-primary-400 mb-1 block">{item.year}</span>
                    <p className="text-gray-300 text-sm">{item.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24" style={{ background: '#030712' }} ref={teamRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-medium mb-3" style={{ color: '#6366f1' }}>THE TEAM</p>
            <h2 className="font-display font-extrabold text-4xl text-white">Meet Our Experts</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <motion.div key={member.name} initial={{ opacity: 0, y: 40 }} animate={teamInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }} className="p-6 rounded-2xl group" style={{ background: '#0a0f1e', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="relative mb-5">
                  <img src={member.avatar} alt={member.name} className="w-16 h-16 rounded-2xl object-cover" />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2" style={{ background: member.color, borderColor: '#0a0f1e' }} />
                </div>
                <h3 className="font-display font-semibold text-lg text-white mb-1">{member.name}</h3>
                <p className="text-xs font-medium mb-3" style={{ color: member.color }}>{member.role}</p>
                <p className="text-gray-400 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
