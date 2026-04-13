import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react'
import { contactAPI } from '../api'
import toast from 'react-hot-toast'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', phone: '', budget: '', service: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Valid email required'
    if (!form.message.trim()) e.message = 'Message is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      await contactAPI.submit(form)
      setSent(true)
      toast.success('Message sent! We\'ll reply within 24 hours.')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const InputField = ({ name, label, type = 'text', placeholder, required }) => (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1.5">{label}{required && <span className="text-red-400 ml-1">*</span>}</label>
      <input
        type={type}
        value={form[name]}
        onChange={(e) => setForm({ ...form, [name]: e.target.value })}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-600 text-sm transition-all duration-200 focus:outline-none"
        style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${errors[name] ? '#ef4444' : 'rgba(255,255,255,0.1)'}` }}
      />
      {errors[name] && <p className="text-red-400 text-xs mt-1">{errors[name]}</p>}
    </div>
  )

  return (
    <div style={{ background: '#030712' }}>
      {/* Hero */}
      <section className="relative pt-36 pb-20 overflow-hidden" style={{ background: 'radial-gradient(ellipse at top, #1a1040 0%, #030712 60%)' }}>
        <div className="absolute inset-0 opacity-25" style={{ backgroundImage: 'linear-gradient(rgba(99,102,241,0.07) 1px, transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.07) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-medium mb-4" style={{ color: '#6366f1' }}>CONTACT</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display font-extrabold text-5xl md:text-6xl text-white mb-6">
            Let's Build{' '}
            <span style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Together</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-gray-400 text-lg">
            Tell us about your project. We'll get back to you within 24 hours with a plan.
          </motion.p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Info */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="font-display font-bold text-2xl text-white mb-4">Get in Touch</h2>
              <p className="text-gray-400 leading-relaxed">Whether you have a detailed spec or just a napkin sketch — we want to hear about it. No project is too big or too small.</p>
            </div>
            {[
              { icon: Mail, label: 'Email', value: 'hello@saasagency.com', href: 'mailto:hello@saasagency.com' },
              { icon: Phone, label: 'Phone', value: '+91 97133 18696', href: 'tel:+919713318696' },
              { icon: MapPin, label: 'Office', value: 'vijay nagar indore 453221', href: '#' },
            ].map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-4 p-5 rounded-2xl" style={{ background: '#0a0f1e', border: '1px solid rgba(99,102,241,0.15)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.25)' }}>
                  <Icon size={18} style={{ color: '#6366f1' }} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">{label}</p>
                  <a href={href} className="text-sm text-gray-200 hover:text-primary-400 transition-colors">{value}</a>
                </div>
              </div>
            ))}

            <div className="p-5 rounded-2xl" style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)' }}>
              <h4 className="font-semibold text-white mb-2 text-sm">Response time</h4>
              <p className="text-gray-400 text-sm">We typically respond within <strong className="text-primary-400">4 business hours</strong>. For urgent inquiries, call us directly.</p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-3">
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center p-8 rounded-3xl" style={{ background: '#0a0f1e', border: '1px solid rgba(99,102,241,0.2)' }}>
                <div className="w-20 h-20 rounded-full flex items-center justify-center mb-5" style={{ background: 'rgba(99,102,241,0.15)' }}>
                  <CheckCircle size={40} style={{ color: '#6366f1' }} />
                </div>
                <h3 className="font-display font-bold text-2xl text-white mb-3">Message Sent!</h3>
                <p className="text-gray-400 max-w-sm">Thanks for reaching out. Our team will review your project and get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 rounded-3xl space-y-5" style={{ background: '#0a0f1e', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <InputField name="name" label="Full Name" placeholder="Dipesh Tiwari" required />
                  <InputField name="email" label="Work Email" type="email" placeholder="dipesh@company.com" required />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <InputField name="company" label="Company Name" placeholder="Acme Inc." />
                  <InputField name="phone" label="Phone" placeholder="+91 (000) 000-000" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Budget Range</label>
                    <select value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm text-gray-300 focus:outline-none"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <option value="" style={{ background: '#0a0f1e' }}>Select budget</option>
                      {['< 5k', '5k - 15k', '15k - 50k', '50k - 100k', '100k+', 'Not sure'].map((b) => (
                        <option key={b} value={b} style={{ background: '#0a0f1e' }}>{b}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Service Needed</label>
                    <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm text-gray-300 focus:outline-none"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <option value="" style={{ background: '#0a0f1e' }}>Select service</option>
                      {['SaaS Development', 'Web App Development', 'AI Integration', 'UI/UX Design', 'API Development', 'Cloud Solutions', 'Not sure'].map((s) => (
                        <option key={s} value={s} style={{ background: '#0a0f1e' }}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Tell us about your project <span className="text-red-400">*</span></label>
                  <textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Describe your idea, goals, and any specific requirements..."
                    className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none resize-none"
                    style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${errors.message ? '#ef4444' : 'rgba(255,255,255,0.1)'}` }}
                  />
                  {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                </div>
                <button type="submit" disabled={loading}
                  className="w-full flex items-center justify-center gap-2 font-semibold text-white py-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', boxShadow: '0 0 30px rgba(99,102,241,0.3)' }}>
                  {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Send size={16} /> Send Message</>}
                </button>
                <p className="text-center text-xs text-gray-600">By submitting, you agree to our Privacy Policy. We never share your information.</p>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
