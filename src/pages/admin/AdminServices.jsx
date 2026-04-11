import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { servicesAPI } from '../../api'
import toast from 'react-hot-toast'
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react'

const icons = ['Cloud', 'Globe', 'Brain', 'Palette', 'Code', 'Server', 'Shield', 'Zap']
const emptyForm = { title: '', shortDesc: '', description: '', icon: 'Cloud', color: '#6366f1', features: '', technologies: '', order: 0, isActive: true }
const staticServices = [
  { _id: '1', title: 'SaaS Development', icon: 'Cloud', color: '#6366f1', isActive: true, order: 1 },
  { _id: '2', title: 'Web App Development', icon: 'Globe', color: '#06b6d4', isActive: true, order: 2 },
  { _id: '3', title: 'AI Integration', icon: 'Brain', color: '#8b5cf6', isActive: true, order: 3 },
  { _id: '4', title: 'UI/UX Design', icon: 'Palette', color: '#f59e0b', isActive: true, order: 4 },
  { _id: '5', title: 'API Development', icon: 'Code', color: '#10b981', isActive: true, order: 5 },
  { _id: '6', title: 'Cloud Solutions', icon: 'Server', color: '#ef4444', isActive: true, order: 6 },
]

export default function AdminServices() {
  const [services, setServices] = useState(staticServices)
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    servicesAPI.getAll().then(({ data }) => { if (data.data?.length) setServices(data.data) }).catch(() => {})
  }, [])

  const openCreate = () => { setForm(emptyForm); setEditId(null); setModal(true) }
  const openEdit = (s) => { setForm({ ...s, features: Array.isArray(s.features) ? s.features.join(', ') : s.features, technologies: Array.isArray(s.technologies) ? s.technologies.join(', ') : s.technologies }); setEditId(s._id); setModal(true) }

  const handleSave = async () => {
    setLoading(true)
    const payload = { ...form, features: typeof form.features === 'string' ? form.features.split(',').map(t => t.trim()) : form.features, technologies: typeof form.technologies === 'string' ? form.technologies.split(',').map(t => t.trim()) : form.technologies }
    try {
      if (editId) { await servicesAPI.update(editId, payload); setServices(services.map(s => s._id === editId ? { ...s, ...payload } : s)); toast.success('Service updated') }
      else { const { data } = await servicesAPI.create(payload); setServices([...services, data.data]); toast.success('Service created') }
      setModal(false)
    } catch { toast.error('Failed to save') } finally { setLoading(false) }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this service?')) return
    try { await servicesAPI.delete(id); setServices(services.filter(s => s._id !== id)); toast.success('Deleted') } catch { toast.error('Failed to delete') }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="font-display font-bold text-2xl text-white">Services</h1><p className="text-gray-400 text-sm mt-1">{services.length} services configured</p></div>
        <button onClick={openCreate} className="flex items-center gap-2 text-sm font-semibold text-white px-5 py-2.5 rounded-xl hover:-translate-y-0.5 transition-all" style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}><Plus size={16} /> Add Service</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map(s => (
          <motion.div key={s._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-5 rounded-2xl" style={{ background: '#0a0f1e', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ background: `${s.color}20`, border: `1px solid ${s.color}30` }}>
                {s.icon === 'Cloud' ? '☁️' : s.icon === 'Globe' ? '🌐' : s.icon === 'Brain' ? '🧠' : s.icon === 'Palette' ? '🎨' : s.icon === 'Code' ? '💻' : '🔧'}
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${s.isActive ? 'text-green-400' : 'text-gray-500'}`} style={{ background: s.isActive ? 'rgba(16,185,129,0.1)' : 'rgba(107,114,128,0.1)' }}>{s.isActive ? 'Active' : 'Inactive'}</span>
            </div>
            <h3 className="font-medium text-white text-sm mb-1">{s.title}</h3>
            <p className="text-xs text-gray-500 mb-4">Order: {s.order}</p>
            <div className="flex gap-2">
              <button onClick={() => openEdit(s)} className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium py-2 rounded-lg text-gray-300 hover:text-white transition-colors" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}><Pencil size={12} /> Edit</button>
              <button onClick={() => handleDelete(s._id)} className="flex items-center justify-center px-4 py-2 rounded-lg text-red-400 hover:bg-red-400/10 transition-colors" style={{ border: '1px solid rgba(239,68,68,0.2)' }}><Trash2 size={12} /></button>
            </div>
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {modal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(3,7,18,0.85)', backdropFilter: 'blur(8px)' }}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="w-full max-w-lg rounded-3xl p-7 overflow-y-auto max-h-[90vh]" style={{ background: '#0a0f1e', border: '1px solid rgba(99,102,241,0.25)' }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display font-bold text-xl text-white">{editId ? 'Edit Service' : 'New Service'}</h2>
                <button onClick={() => setModal(false)} className="text-gray-400 hover:text-white"><X size={20} /></button>
              </div>
              <div className="space-y-4">
                {[{ name: 'title', label: 'Title' }, { name: 'shortDesc', label: 'Short Description' }, { name: 'description', label: 'Full Description' }, { name: 'features', label: 'Features (comma-separated)' }, { name: 'technologies', label: 'Technologies (comma-separated)' }].map(({ name, label }) => (
                  <div key={name}>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">{label}</label>
                    <input value={form[name] || ''} onChange={(e) => setForm({ ...form, [name]: e.target.value })} className="w-full px-3 py-2.5 rounded-xl text-white text-sm focus:outline-none" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} />
                  </div>
                ))}
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">Icon</label>
                    <select value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className="w-full px-3 py-2.5 rounded-xl text-white text-sm focus:outline-none" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                      {icons.map(i => <option key={i} value={i} style={{ background: '#0a0f1e' }}>{i}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">Color</label>
                    <input type="color" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} className="w-full h-10 rounded-xl cursor-pointer" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">Order</label>
                    <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) })} className="w-full px-3 py-2.5 rounded-xl text-white text-sm focus:outline-none" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} />
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setModal(false)} className="flex-1 py-3 rounded-xl text-sm text-gray-400" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>Cancel</button>
                <button onClick={handleSave} disabled={loading} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white" style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
                  {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Save size={14} /> Save</>}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
