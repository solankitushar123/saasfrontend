import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle, X, ArrowRight } from 'lucide-react'

const plans = [
  {
    name: 'Starter', monthlyPrice: 4999, yearlyPrice: 3999, color: '#6366f1', highlight: false,
    desc: 'Perfect for MVPs and early-stage startups validating an idea.',
    features: [
      { text: 'Up to 3 core features', included: true },
      { text: 'Mobile-responsive design', included: true },
      { text: 'Basic API integration', included: true },
      { text: 'QA & automated testing', included: true },
      { text: '2 weeks post-launch support', included: true },
      { text: 'Source code handoff', included: true },
      { text: 'Admin dashboard', included: false },
      { text: 'AI/ML integration', included: false },
      { text: 'Payment integration', included: false },
      { text: 'Custom 3D UI elements', included: false },
    ],
  },
  {
    name: 'Professional', monthlyPrice: 14999, yearlyPrice: 11999, color: '#8b5cf6', highlight: true,
    desc: 'Ideal for funded startups and growing businesses ready to scale.',
    features: [
      { text: 'Unlimited features', included: true },
      { text: 'Mobile-responsive design', included: true },
      { text: 'Full API integration', included: true },
      { text: 'QA & automated testing', included: true },
      { text: '60-day post-launch support', included: true },
      { text: 'Source code handoff', included: true },
      { text: 'Admin dashboard', included: true },
      { text: 'AI/ML integration', included: true },
      { text: 'Payment integration', included: true },
      { text: 'Custom 3D UI elements', included: true },
    ],
  },
  {
    name: 'Enterprise', monthlyPrice: null, yearlyPrice: null, color: '#06b6d4', highlight: false,
    desc: 'For large-scale enterprise SaaS systems with complex requirements.',
    features: [
      { text: 'Custom architecture design', included: true },
      { text: 'Dedicated engineering team', included: true },
      { text: 'Multi-tenant system', included: true },
      { text: 'Advanced security audit', included: true },
      { text: 'Lifetime support SLA', included: true },
      { text: 'White-label solution', included: true },
      { text: 'On-premise deployment', included: true },
      { text: 'Custom AI model training', included: true },
      { text: 'Priority 24/7 support', included: true },
      { text: 'Compliance (HIPAA/SOC2)', included: true },
    ],
  },
]

const addons = [
  { name: 'UI/UX Design Sprint', price: '$2,499', desc: 'Figma wireframes + interactive prototype for your core flows' },
  { name: 'SEO & Analytics Setup', price: '$999', desc: 'GA4, Search Console, sitemap, and technical SEO audit' },
  { name: 'Extra Support Month', price: '$1,499/mo', desc: 'Extended maintenance and feature request support' },
  { name: 'Performance Audit', price: '$1,299', desc: 'Core Web Vitals, Lighthouse, and load testing report' },
]

const faqs = [
  { q: 'Do you work with startups at idea stage?', a: 'Absolutely. We love working with early-stage founders. Book a free discovery call and we will help you scope the right MVP.' },
  { q: 'How long does a typical project take?', a: 'Starter projects take 4–6 weeks, Professional projects 8–14 weeks, and Enterprise timelines are scoped during discovery.' },
  { q: 'Do you offer ongoing maintenance?', a: 'Yes. All plans include post-launch support. We also offer monthly retainers for ongoing development and maintenance.' },
  { q: 'What happens after the project is delivered?', a: 'You get full source code ownership, documentation, and deployment guides. We are available for follow-up projects or retainer support.' },
  { q: 'Can I upgrade my plan mid-project?', a: 'Yes! We can scope out the additional work and provide a revised timeline and quote at any point during development.' },
]

export default function Pricing() {
  const [yearly, setYearly] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div style={{ background: '#030712' }}>
      {/* Hero */}
      <section className="relative pt-36 pb-20 overflow-hidden" style={{ background: 'radial-gradient(ellipse at top, #1a1040 0%, #030712 60%)' }}>
        <div className="absolute inset-0 opacity-25" style={{ backgroundImage: 'linear-gradient(rgba(99,102,241,0.07) 1px, transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.07) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-medium mb-4" style={{ color: '#6366f1' }}>PRICING</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display font-extrabold text-5xl md:text-6xl text-white mb-6">
            Simple,{' '}
            <span style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Transparent</span>{' '}
            Pricing
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-gray-400 text-lg mb-8">
            No hidden fees. No surprise invoices. Just exceptional work at a fair price.
          </motion.p>
          {/* Toggle */}
          <div className="inline-flex items-center gap-4 p-1 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <button onClick={() => setYearly(false)} className="px-5 py-2 rounded-lg text-sm font-medium transition-all" style={!yearly ? { background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: 'white' } : { color: '#9ca3af' }}>Monthly</button>
            <button onClick={() => setYearly(true)} className="px-5 py-2 rounded-lg text-sm font-medium transition-all" style={yearly ? { background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: 'white' } : { color: '#9ca3af' }}>
              Yearly <span className="ml-1 text-xs font-bold" style={{ color: '#10b981' }}>Save 20%</span>
            </button>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <motion.div key={plan.name} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                className={`p-8 rounded-3xl relative flex flex-col`}
                style={{ background: plan.highlight ? 'rgba(99,102,241,0.07)' : '#0a0f1e', border: `1px solid ${plan.highlight ? 'rgba(99,102,241,0.4)' : 'rgba(255,255,255,0.06)'}`, boxShadow: plan.highlight ? '0 0 50px rgba(99,102,241,0.15)' : 'none' }}>
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full text-xs font-bold text-white" style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
                    ⭐ Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="font-display font-bold text-2xl text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 text-sm mb-5">{plan.desc}</p>
                  <div className="flex items-end gap-1 mb-1">
                    <span className="font-display font-extrabold text-5xl text-white">
                      {plan.monthlyPrice ? `$${(yearly ? plan.yearlyPrice : plan.monthlyPrice).toLocaleString()}` : 'Custom'}
                    </span>
                    {plan.monthlyPrice && <span className="text-gray-400 mb-2">/project</span>}
                  </div>
                  {yearly && plan.monthlyPrice && (
                    <p className="text-xs text-green-400">Save ${(plan.monthlyPrice - plan.yearlyPrice).toLocaleString()} vs monthly billing</p>
                  )}
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f.text} className="flex items-start gap-3 text-sm">
                      {f.included
                        ? <CheckCircle size={15} className="mt-0.5 flex-shrink-0" style={{ color: plan.color }} />
                        : <X size={15} className="mt-0.5 flex-shrink-0 text-gray-600" />}
                      <span className={f.included ? 'text-gray-300' : 'text-gray-600'}>{f.text}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/contact"
                  className="block text-center font-semibold py-3.5 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
                  style={plan.highlight
                    ? { background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: 'white' }
                    : { border: `1px solid ${plan.color}50`, color: plan.color, background: `${plan.color}08` }}>
                  {plan.monthlyPrice ? 'Get Started' : 'Contact Sales'}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-20" style={{ background: '#0a0f1e' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-medium mb-3" style={{ color: '#6366f1' }}>ADD-ONS</p>
            <h2 className="font-display font-extrabold text-4xl text-white">Enhance Your Package</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {addons.map((addon, i) => (
              <motion.div key={addon.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl" style={{ background: '#030712', border: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-base font-semibold text-white mb-1">{addon.name}</p>
                <p className="text-gray-400 text-sm mb-4">{addon.desc}</p>
                <p className="font-display font-bold text-xl" style={{ color: '#6366f1' }}>{addon.price}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20" style={{ background: '#030712' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display font-extrabold text-4xl text-white">Frequently Asked</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(99,102,241,0.2)' }}>
                <button className="w-full flex items-center justify-between px-6 py-5 text-left" style={{ background: '#0a0f1e' }} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="font-medium text-white text-sm">{faq.q}</span>
                  <span className="text-primary-400 ml-4 flex-shrink-0">{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} className="px-6 pb-5" style={{ background: '#0a0f1e', borderTop: '1px solid rgba(99,102,241,0.1)' }}>
                    <p className="text-gray-400 text-sm pt-4 leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ background: '#0a0f1e', borderTop: '1px solid rgba(99,102,241,0.1)' }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display font-extrabold text-4xl text-white mb-5">Ready to Get a Custom Quote?</h2>
          <p className="text-gray-400 mb-8">Tell us about your project and we'll send a detailed proposal within 24 hours.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 font-semibold text-white px-10 py-4 rounded-xl transition-all duration-300 hover:-translate-y-1" style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', boxShadow: '0 0 40px rgba(99,102,241,0.35)' }}>
            Get a Free Quote <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  )
}
