import { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/authSlice'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, FolderOpen, FileText, Briefcase,
  MessageSquare, Star, LogOut, Menu, X, Zap, ExternalLink
} from 'lucide-react'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', to: '/admin' },
  { icon: Briefcase, label: 'Projects', to: '/admin/projects' },
  { icon: FileText, label: 'Blog Posts', to: '/admin/blog' },
  { icon: FolderOpen, label: 'Services', to: '/admin/services' },
  { icon: MessageSquare, label: 'Contacts', to: '/admin/contacts' },
  { icon: Star, label: 'Testimonials', to: '/admin/testimonials' },
]

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((s) => s.auth)

  const handleLogout = () => { dispatch(logout()); navigate('/admin/login') }

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#030712' }}>
      {/* Sidebar */}
      <AnimatePresence initial={false}>
        {sidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 260, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex-shrink-0 flex flex-col h-full overflow-hidden"
            style={{ background: '#0a0f1e', borderRight: '1px solid rgba(99,102,241,0.15)' }}
          >
            {/* Logo */}
            <div className="flex items-center gap-2 px-6 py-5 border-b" style={{ borderColor: 'rgba(99,102,241,0.15)' }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
                <Zap size={16} className="text-white" fill="white" />
              </div>
              <span className="font-display font-bold text-white whitespace-nowrap">Nexa<span style={{ color: '#6366f1' }}>Forge</span></span>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider px-3 mb-3">Menu</p>
              {navItems.map(({ icon: Icon, label, to }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/admin'}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                      isActive
                        ? 'text-white bg-primary-500/15 border border-primary-500/30'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  <Icon size={16} />
                  {label}
                </NavLink>
              ))}
            </nav>

            {/* User */}
            <div className="px-3 py-4 border-t space-y-2" style={{ borderColor: 'rgba(99,102,241,0.15)' }}>
              <a href="/" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <ExternalLink size={14} /> View Website
              </a>
              <div className="flex items-center gap-3 px-3 py-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
                  {user?.name?.charAt(0) || 'A'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-white truncate">{user?.name || 'Admin'}</p>
                  <p className="text-xs text-gray-500 truncate">{user?.email || ''}</p>
                </div>
                <button onClick={handleLogout} className="text-gray-500 hover:text-red-400 transition-colors" title="Logout">
                  <LogOut size={15} />
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="flex items-center gap-4 px-6 py-4 border-b" style={{ background: '#0a0f1e', borderColor: 'rgba(99,102,241,0.15)' }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400 hover:text-white transition-colors">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <h1 className="text-sm font-medium text-gray-300">Admin Panel</h1>
          <div className="ml-auto flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs text-gray-400">Live</span>
          </div>
        </header>

        {/* Page */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
