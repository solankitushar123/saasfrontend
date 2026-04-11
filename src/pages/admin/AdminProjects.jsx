import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projectsAPI } from '../../api'
import toast from 'react-hot-toast'
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react'

const emptyForm = { title: '', shortDesc: '', description: '', category: 'SaaS', thumbnail: '', technologies: '', liveUrl: '', clientName: '', featured: false, status: 'completed' }
const staticProjects = [
  { _id: '1', title: 'FinFlow SaaS Platform', category: 'SaaS', status: 'completed', featured: true, clientName: 'FinTech Solutions', thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200', technologies: ['React', 'Node.js', 'MongoDB'] },
  { _id: '2', title: 'HealthOS Patient Portal', category: 'Web App', status: 'completed', featured: true, clientName: 'MedTech Corp', thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=200', technologies: ['Next.js', 'PostgreSQL'] },
  { _id: '3', title: 'EduSpark Learning Platform', category: 'SaaS', status: 'completed', featured: true, clientName: 'EduTech Ventures', thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=200', technologies: ['React', 'OpenAI'] },
]

export default function AdminProjects() {
  const [projects, setProjects] = useState(staticProjects)
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    projectsAPI.getAll().then(({ data }) => { if (data.data?.length) setProjects(data.data) }).catch(() => {})
  }, [])

  const openCreate = () => { setForm(emptyForm); setEditId(null); setModal(true) }
  const openEdit = (p) => { setForm({ ...p, technologies: Array.isArray(p.technologies) ? p.technologies.join(', ') : p.technologies }); setEditId(p._id); setModal(true) }

  const handleSave = async () => {
    setLoading(true)
    const payload = { ...form, technologies: typeof form.technologies === 'string' ? form.technologies.split(',').map((t) => t.trim()) : form.technologies }
    try {
      if (editId) {
        await projectsAPI.update(editId, payload)
        setProjects(projects.map((p) => p._id === editId ? { ...p, ...payload } : p))
        toast.success('Project updated')
      } else {
        const { data } = await projectsAPI.create(payload)
        setProjects([data.data, ...projects])
        toast.success('Project created')
      }
      setModal(false)
    } catch { toast.error('Failed to save') } finally { setLoading(false) }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return
    try {
      await projectsAPI.delete(id)
      setProjects(projects.filter((p) => p._id !== id))
      toast.success('Deleted')
    } catch { toast.error('Failed to delete') }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-2xl text-white">Projects</h1>
          <p className="text-gray-400 text-sm mt-1">{projects.length} projects total</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 text-sm font-semibold text-white px-5 py-2.5 rounded-xl transition-all hover:-translate-y-0.5" style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
          <Plus size={16} /> Add Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {projects.map((p) => (
          <motion.div key={p._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-2xl" style={{ background: '#0a0f1e', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="relative h-36 rounded-xl overflow-hidden mb-4">
              <img src={p.thumbnail} alt={p.title} className="w-full h-full object-cover" />
              <div className="absolute top-2 left-2 flex gap-2">
                <span className="text-xs px-2 py-0.5 rounded-full text-white" style={{ background: 'rgba(99,102,241,0.8)' }}>{p.category}</span>
                {p.featured && <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(245,158,11,0.8)', color: 'white' }}>Featured</span>}
              </div>
            </div>
            <h3 className="font-medium text-white text-sm mb-1 truncate">{p.title}</h3>
            <p className="text-xs text-gray-500 mb-3">{p.clientName}</p>
            <div className="flex flex-wrap gap-1 mb-4">
              {(Array.isArray(p.technologies) ? p.technologies : []).slice(0, 3).map((t) => (
                <span key={t} className="text-xs px-2 py-0.5 rounded text-gray-400" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>{t}</span>
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={() => openEdit(p)} className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium py-2 rounded-lg transition-colors text-gray-300 hover:text-white" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <Pencil size={12} /> Edit
              </button>
              <button onClick={() => handleDelete(p._id)} className="flex items-center justify-center gap-1.5 text-xs font-medium px-4 py-2 rounded-lg transition-colors text-red-400 hover:bg-red-400/10" style={{ border: '1px solid rgba(239,68,68,0.2)' }}>
                <Trash2 size={12} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {modal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(3,7,18,0.85)', backdropFilter: 'blur(8px)' }}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9 }}
              className="w-full max-w-xl rounded-3xl p-7 overflow-y-auto max-h-[90vh]" style={{ background: '#0a0f1e', border: '1px solid rgba(99,102,241,0.25)' }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display font-bold text-xl text-white">{editId ? 'Edit Project' : 'New Project'}</h2>
                <button onClick={() => setModal(false)} className="text-gray-400 hover:text-white"><X size={20} /></button>
              </div>
              <div className="space-y-4">
                {[
                  { name: 'title', label: 'Project Title', placeholder: 'FinFlow SaaS Platform' },
                  { name: 'shortDesc', label: 'Short Description', placeholder: 'One-line summary' },
                  { name: 'thumbnail', label: 'Thumbnail URL', placeholder: 'https://...' },
                  { name: 'technologies', label: 'Technologies (comma-separated)', placeholder: 'React, Node.js, MongoDB' },
                  { name: 'liveUrl', label: 'Live URL', placeholder: 'https://project.com' },
                  { name: 'clientName', label: 'Client Name', placeholder: 'Acme Corp' },
                ].map(({ name, label, placeholder }) => (
                  <div key={name}>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">{label}</label>
                    <input value={form[name] || ''} onChange={(e) => setForm({ ...form, [name]: e.target.value })} placeholder={placeholder}
                      className="w-full px-3 py-2.5 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} />
                  </div>
                ))}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">Category</label>
                    <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl text-white text-sm focus:outline-none"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                      {['SaaS', 'Web App', 'Mobile', 'AI/ML', 'E-commerce', 'Other'].map((c) => <option key={c} value={c} style={{ background: '#0a0f1e' }}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">Status</label>
                    <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl text-white text-sm focus:outline-none"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                      {['completed', 'ongoing', 'concept'].map((s) => <option key={s} value={s} style={{ background: '#0a0f1e' }}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4 rounded accent-primary-500" />
                  <span className="text-sm text-gray-300">Featured Project</span>
                </label>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setModal(false)} className="flex-1 py-3 rounded-xl text-sm text-gray-400 hover:text-white transition-colors" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>Cancel</button>
                <button onClick={handleSave} disabled={loading} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:-translate-y-0.5 disabled:opacity-60" style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
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
