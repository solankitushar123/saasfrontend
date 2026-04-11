import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { login } from '../../store/authSlice'
import { Zap, Eye, EyeOff } from 'lucide-react'
import toast from 'react-hot-toast'

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, token } = useSelector((s) => s.auth)

  if (token) return <Navigate to="/admin" replace />

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await dispatch(login(form))
    if (login.fulfilled.match(result)) {
      toast.success('Welcome back!')
      navigate('/admin')
    } else {
      toast.error(result.payload || 'Login failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: '#030712' }}>
      {/* BG */}
      <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.3) 0%, transparent 70%)' }} />
      <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.05) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />

      <motion.div initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.5 }}
        className="relative w-full max-w-md p-8 rounded-3xl" style={{ background: '#0a0f1e', border: '1px solid rgba(99,102,241,0.25)' }}>
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
            <Zap size={22} className="text-white" fill="white" />
          </div>
          <h1 className="font-display font-bold text-2xl text-white">Admin Portal</h1>
          <p className="text-gray-400 text-sm mt-1">NexaForge Agency Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required
              placeholder="admin@nexaforge.com"
              className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500/50 transition-all"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
            <div className="relative">
              <input type={showPass ? 'text' : 'password'} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required
                placeholder="••••••••"
                className="w-full px-4 py-3 pr-11 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500/50 transition-all"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="p-3 rounded-xl text-xs text-gray-400" style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.15)' }}>
            <strong className="text-gray-300">Demo:</strong> admin@nexaforge.com / Admin@123456
          </div>

          <button type="submit" disabled={loading}
            className="w-full font-semibold text-white py-3.5 rounded-xl transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60"
            style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', boxShadow: '0 0 25px rgba(99,102,241,0.3)' }}>
            {loading ? <div className="flex items-center justify-center gap-2"><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Signing in...</div> : 'Sign In →'}
          </button>
        </form>
      </motion.div>
    </div>
  )
}
