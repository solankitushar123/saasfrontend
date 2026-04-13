import { Suspense, lazy, useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Play, CheckCircle, Star, TrendingUp, Users, Award, Globe, ChevronRight, Zap } from 'lucide-react'
import CountUp from 'react-countup'
import { useInView as useIOInView } from 'react-intersection-observer'

const HeroScene = lazy(() => import('../components/3d/HeroScene'))

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
}

// ─── HERO ──────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: 'radial-gradient(ellipse at top, #1a1040 0%, #030712 60%)' }}>
      {/* Grid bg */}
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(rgba(99,102,241,0.07) 1px, transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.07) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      {/* 3D Scene */}
      <div className="absolute right-0 top-0 w-full lg:w-1/2 h-full opacity-80">
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-sm font-medium"
            style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.3)', color: '#a5b4fc' }}
          >
            <Zap size={14} fill="currentColor" />
            <span>Trusted by 50+ Global SaaS Companies</span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-display font-extrabold text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] mb-6"
          >
            We Build{' '}
            <span style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Future‑Ready
            </span>
            <br />
            SaaS Products
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 mb-10 max-w-xl leading-relaxed"
          >
            From zero to launch — we design and build scalable SaaS applications, web platforms, and AI-powered products that your users will love.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 font-semibold text-white px-8 py-4 rounded-xl transition-all duration-300 hover:-translate-y-1"
              style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', boxShadow: '0 0 40px rgba(99,102,241,0.4)' }}
            >
              Start Your Project <ArrowRight size={18} />
            </Link>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 font-semibold text-gray-300 hover:text-white px-8 py-4 rounded-xl transition-all duration-300 hover:-translate-y-1"
              style={{ border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)' }}
            >
              <Play size={16} className="text-primary-400" /> View Our Work
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-12 flex flex-wrap items-center gap-6"
          >
            {['Stripe-level Quality', 'On-time Delivery', '24/7 Support'].map((badge) => (
              <div key={badge} className="flex items-center gap-2 text-sm text-gray-400">
                <CheckCircle size={15} className="text-green-400" />
                {badge}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: 'linear-gradient(to top, #030712, transparent)' }} />
    </section>
  )
}

// ─── STATS ──────────────────────────────────────────────────────────
function StatsSection() {
  const { ref, inView } = useIOInView({ triggerOnce: true, threshold: 0.3 })
  const stats = [
    { icon: TrendingUp, value: 5, suffix: '+', label: 'Products Launched', color: '#6366f1' },
    { icon: Users, value: 99, suffix: '%', label: 'Client Satisfaction', color: '#06b6d4' },
    { icon: Award, value: 2, suffix: '+', label: 'Years of Excellence', color: '#8b5cf6' },
    { icon: Globe, value: 1, suffix: '+', label: 'Countries Served', color: '#f59e0b' },
  ]
  return (
    <section ref={ref} className="py-20 relative" style={{ background: '#0a0f1e', borderTop: '1px solid rgba(99,102,241,0.1)', borderBottom: '1px solid rgba(99,102,241,0.1)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map(({ icon: Icon, value, suffix, label, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="text-center"
            >
              <div className="inline-flex w-12 h-12 rounded-2xl items-center justify-center mb-4" style={{ background: `${color}20`, border: `1px solid ${color}40` }}>
                <Icon size={22} style={{ color }} />
              </div>
              <div className="font-display font-extrabold text-4xl text-white mb-1">
                {inView ? <CountUp end={value} duration={2.5} suffix={suffix} /> : `0${suffix}`}
              </div>
              <p className="text-sm text-gray-400">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── SERVICES ──────────────────────────────────────────────────────────
const services = [
  { icon: '☁️', title: 'SaaS Development', desc: 'End-to-end SaaS platforms with multi-tenancy, subscription billing, and enterprise scalability.', color: '#6366f1', delay: 0 },
  { icon: '🌐', title: 'Web App Development', desc: 'High-performance progressive web applications that delight users across every device.', color: '#06b6d4', delay: 0.1 },
  { icon: '🧠', title: 'AI Integration', desc: 'Supercharge your product with LLM integration, computer vision, and ML-powered automation.', color: '#8b5cf6', delay: 0.2 },
  { icon: '🎨', title: 'UI/UX Design', desc: 'Award-worthy design systems and interfaces crafted for maximum conversion and user delight.', color: '#f59e0b', delay: 0.3 },
  { icon: '🔌', title: 'API Development', desc: 'Scalable REST and GraphQL APIs built for speed, security, and developer experience.', color: '#10b981', delay: 0.4 },
  { icon: '☁️', title: 'Cloud Solutions', desc: 'AWS, GCP, and Azure infrastructure design with Kubernetes orchestration and CI/CD pipelines.', color: '#ef4444', delay: 0.5 },
]

function ServicesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  return (
    <section className="py-28 relative" style={{ background: '#030712' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="text-sm font-medium mb-3" style={{ color: '#6366f1' }}>WHAT WE DO</motion.p>
          <motion.h2 variants={fadeUp} className="font-display font-extrabold text-4xl md:text-5xl text-white mb-5">
            Services Built for Scale
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-400 text-lg max-w-2xl mx-auto">
            We combine world-class engineering with stunning design to build products that stand out in any market.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: svc.delay, duration: 0.6 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="p-8 rounded-2xl group cursor-default"
              style={{ background: '#0a0f1e', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="text-4xl mb-5">{svc.icon}</div>
              <h3 className="font-display font-semibold text-xl text-white mb-3 group-hover:text-primary-400 transition-colors">{svc.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-5">{svc.desc}</p>
              <Link to="/services" className="inline-flex items-center gap-1 text-sm font-medium transition-colors" style={{ color: svc.color }}>
                Learn more <ChevronRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/services" className="inline-flex items-center gap-2 font-semibold text-white px-8 py-4 rounded-xl transition-all duration-300 hover:-translate-y-1" style={{ border: '1px solid rgba(99,102,241,0.4)', background: 'rgba(99,102,241,0.08)' }}>
            Explore All Services <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─── PROCESS ──────────────────────────────────────────────────────────
const steps = [
  { num: '01', title: 'Discovery & Research', desc: 'Deep dive into your business goals, market, and technical requirements to define the perfect strategy.' },
  { num: '02', title: 'Design & Prototyping', desc: 'We craft pixel-perfect wireframes and interactive prototypes validated with real user feedback.' },
  { num: '03', title: 'Development', desc: 'Agile sprints with daily updates. Clean, documented code built on scalable modern architecture.' },
  { num: '04', title: 'Testing & QA', desc: 'Rigorous automated and manual testing ensuring zero-defect delivery and performance at scale.' },
  { num: '05', title: 'Deployment', desc: 'CI/CD-powered launch with monitoring, analytics, and 30-day post-launch support included.' },
]

function ProcessSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  return (
    <section className="py-28" style={{ background: '#0a0f1e' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16" ref={ref}>
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="text-sm font-medium mb-3" style={{ color: '#6366f1' }}>HOW WE WORK</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} className="font-display font-extrabold text-4xl md:text-5xl text-white mb-5">
            Our Process
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} className="text-gray-400 text-lg max-w-xl mx-auto">
            A battle-tested 5-step process that takes your idea from concept to a product your users love.
          </motion.p>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-10 left-1/2 -translate-x-1/2 w-px h-[calc(100%-40px)]" style={{ background: 'linear-gradient(to bottom, #6366f1, transparent)' }} />

          <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-1 lg:gap-0">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className={`relative flex items-start gap-6 lg:w-[45%] ${i % 2 === 0 ? 'lg:ml-0' : 'lg:ml-auto'} mb-8 p-6 rounded-2xl`}
                style={{ background: 'rgba(10,15,30,0.8)', border: '1px solid rgba(99,102,241,0.15)' }}
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-display font-bold text-sm" style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: 'white' }}>
                  {step.num}
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── TESTIMONIALS ──────────────────────────────────────────────────────────
const testimonials = [
  {
    name: 'Rahul Mehta',
    role: 'CTO, FinEdge India',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    text: 'NexaForge delivered our SaaS platform on time with outstanding performance. 500+ Indian businesses rely on it daily — seamless and scalable.',
    rating: 5
  },
  {
    name: 'Ananya Gupta',
    role: 'CEO, HealthCare Plus',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    text: 'They handled complex healthcare requirements and built a secure, compliant platform that works perfectly for both doctors and patients.',
    rating: 5
  },
  {
    name: 'Rohit Verma',
    role: 'Product Lead, EduGrow',
    avatar: 'https://randomuser.me/api/portraits/men/76.jpg',
    text: 'Our AI-based learning platform saw a 40% drop in student churn. The UI/UX and backend quality exceeded expectations.',
    rating: 5
  }
]

function TestimonialsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  return (
    <section className="py-28" style={{ background: '#030712' }} ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="text-sm font-medium mb-3" style={{ color: '#6366f1' }}>TESTIMONIALS</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} className="font-display font-extrabold text-4xl md:text-5xl text-white">
            Loved by Founders
          </motion.h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15 }}
              className="p-8 rounded-2xl"
              style={{ background: '#0a0f1e', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="flex mb-4">
                {Array.from({ length: t.rating }).map((_, j) => <Star key={j} size={14} className="text-yellow-400" fill="#facc15" />)}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full" />
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── PRICING PREVIEW ──────────────────────────────────────────────────────────
function PricingPreviewSection() {
  const plans = [
    { name: 'Starter', price: '$4,999', desc: 'Perfect for MVPs and early-stage startups.', features: ['Up to 3 core features', 'Mobile responsive design', 'Basic API integration', 'QA & testing', '2 weeks post-launch support'], color: '#6366f1', highlight: false },
    { name: 'Professional', price: '$14,999', desc: 'Ideal for growing products that need scale.', features: ['Unlimited features', '3D UI & animations', 'AI integration', 'Admin dashboard', 'Payment integration', '60-day support'], color: '#8b5cf6', highlight: true },
    { name: 'Enterprise', price: 'Custom', desc: 'Full-scale enterprise SaaS solutions.', features: ['Custom architecture', 'Dedicated team', 'Multi-tenant system', 'Advanced security', 'SLA guarantee', 'Lifetime support'], color: '#06b6d4', highlight: false },
  ]

  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-28" style={{ background: '#0a0f1e' }} ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="text-sm font-medium mb-3" style={{ color: '#6366f1' }}>PRICING</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} className="font-display font-extrabold text-4xl md:text-5xl text-white">
            Transparent Pricing
          </motion.h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15 }}
              className={`p-8 rounded-2xl relative ${plan.highlight ? 'ring-1 ring-primary-500/50' : ''}`}
              style={{ background: plan.highlight ? 'rgba(99,102,241,0.08)' : '#030712', border: `1px solid ${plan.highlight ? 'rgba(99,102,241,0.4)' : 'rgba(255,255,255,0.06)'}` }}
            >
              {plan.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold text-white" style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
                  Most Popular
                </div>
              )}
              <h3 className="font-display font-bold text-xl text-white mb-1">{plan.name}</h3>
              <p className="text-gray-400 text-sm mb-5">{plan.desc}</p>
              <div className="font-display font-extrabold text-4xl text-white mb-6">{plan.price}</div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                    <CheckCircle size={15} className="mt-0.5 flex-shrink-0" style={{ color: plan.color }} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/pricing" className="block text-center font-semibold py-3 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
                style={plan.highlight ? { background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: 'white' } : { border: `1px solid ${plan.color}40`, color: plan.color }}>
                Get Started
              </Link>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-gray-500 text-sm mt-8">
          <Link to="/pricing" className="text-primary-400 hover:text-primary-300 transition-colors">View full pricing & feature comparison →</Link>
        </p>
      </div>
    </section>
  )
}

// ─── CTA ──────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section className="py-28 relative overflow-hidden" style={{ background: '#030712' }}>
      <div className="absolute inset-0 opacity-40" style={{ background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.2) 0%, transparent 70%)' }} />
      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <h2 className="font-display font-extrabold text-4xl md:text-6xl text-white mb-6 leading-tight">
            Ready to Build Your{' '}
            <span style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Dream Product?
            </span>
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
            Join 50+ companies that trusted NexaForge to build their core product. Let's talk about yours.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="inline-flex items-center gap-2 font-semibold text-white px-10 py-4 rounded-xl transition-all duration-300 hover:-translate-y-1" style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', boxShadow: '0 0 50px rgba(99,102,241,0.4)' }}>
              Start Your Project <ArrowRight size={18} />
            </Link>
            <Link to="/portfolio" className="inline-flex items-center gap-2 font-semibold text-gray-300 hover:text-white px-10 py-4 rounded-xl transition-all duration-300" style={{ border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.03)' }}>
              See Our Work
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── HOME PAGE ──────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <ProcessSection />
      <TestimonialsSection />
      <PricingPreviewSection />
      <CTASection />
    </div>
  )
}
