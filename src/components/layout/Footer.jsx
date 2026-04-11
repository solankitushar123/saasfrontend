import { Link } from 'react-router-dom'
import { Zap, Github, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'

const footerLinks = {
  Company: [
    { label: 'About Us', to: '/about' },
    { label: 'Services', to: '/services' },
    { label: 'Portfolio', to: '/portfolio' },
    { label: 'Blog', to: '/blog' },
    { label: 'Careers', to: '/contact' },
  ],
  Services: [
    { label: 'SaaS Development', to: '/services' },
    { label: 'Web App Development', to: '/services' },
    { label: 'AI Integration', to: '/services' },
    { label: 'UI/UX Design', to: '/services' },
    { label: 'Cloud Solutions', to: '/services' },
  ],
  Legal: [
    { label: 'Privacy Policy', to: '/' },
    { label: 'Terms of Service', to: '/' },
    { label: 'Cookie Policy', to: '/' },
  ],
}

const socials = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
]

export default function Footer() {
  return (
    <footer className="relative border-t" style={{ borderColor: 'rgba(99,102,241,0.15)', background: '#030712' }}>
      {/* Top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px" style={{ background: 'linear-gradient(90deg,transparent,#6366f1,transparent)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
                <Zap size={18} className="text-white" fill="white" />
              </div>
              <span className="font-display font-bold text-xl text-white">Nexa<span style={{ color: '#6366f1' }}>Forge</span></span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-6">
              We build future-ready SaaS products that scale. From MVP to enterprise — your technology partner for the long run.
            </p>
            <div className="flex flex-col gap-3 text-sm text-gray-400">
              <a href="mailto:hello@nexaforge.com" className="flex items-center gap-2 hover:text-primary-400 transition-colors">
                <Mail size={14} /><span>hello@nexaforge.com</span>
              </a>
              <a href="tel:+1234567890" className="flex items-center gap-2 hover:text-primary-400 transition-colors">
                <Phone size={14} /><span>+1 (234) 567-890</span>
              </a>
              <span className="flex items-center gap-2">
                <MapPin size={14} /><span>San Francisco, CA 94102</span>
              </span>
            </div>
            <div className="flex items-center gap-3 mt-6">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  whileHover={{ y: -3, scale: 1.1 }}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                  style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)' }}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-display font-semibold text-white mb-5">{section}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm text-gray-400 hover:text-primary-400 transition-colors duration-200">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="text-xs text-gray-500">© {new Date().getFullYear()} NexaForge Agency. All rights reserved.</p>
          <p className="text-xs text-gray-600">Built with ❤️ using MERN Stack + React Three Fiber</p>
        </div>
      </div>
    </footer>
  )
}
