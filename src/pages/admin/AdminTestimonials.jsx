import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { testimonialsAPI } from '../../api'
import toast from 'react-hot-toast'
import { Plus, Pencil, Trash2, Star } from 'lucide-react'

const staticTestimonials = [
  { _id: '1', name: 'Sarah Chen', role: 'CTO', company: 'FinTech Solutions', avatar: 'https://i.pravatar.cc/100?img=1', content: 'NexaForge delivered our SaaS platform on time and beyond expectations.', rating: 5, featured: true },
  { _id: '2', name: 'Marcus Williams', role: 'CEO', company: 'HealthOS Inc.', avatar: 'https://i.pravatar.cc/100?img=3', content: 'Working with NexaForge was a game-changer for our healthcare platform.', rating: 5, featured: true },
  { _id: '3', name: 'Priya Sharma', role: 'Product Lead', company: 'EduTech Ventures', avatar: 'https://i.pravatar.cc/100?img=5', content: 'Exceptional technical work with stunning UX. Truly world-class team.', rating: 5, featured: true },
]

export default function AdminTestimonials() {
  const [items, setItems] = useState(staticTestimonials)
  useEffect(() => { testimonialsAPI.getAll().then(({ data }) => { if (data.data?.length) setItems(data.data) }).catch(() => {}) }, [])
  const handleDelete = async (id) => { if (!confirm('Delete?')) return; try { await testimonialsAPI.delete(id); setItems(items.filter(t => t._id !== id)); toast.success('Deleted') } catch { toast.error('Failed') } }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="font-display font-bold text-2xl text-white">Testimonials</h1><p className="text-gray-400 text-sm mt-1">{items.length} testimonials</p></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(t => (
          <motion.div key={t._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-5 rounded-2xl" style={{ background: '#0a0f1e', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="flex mb-3">{Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={12} className="text-yellow-400" fill="#facc15" />)}</div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">"{t.content}"</p>
            <div className="flex items-center gap-3 mb-4">
              <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full" />
              <div><p className="text-sm font-medium text-white">{t.name}</p><p className="text-xs text-gray-500">{t.role}, {t.company}</p></div>
            </div>
            <div className="flex items-center justify-between">
              {t.featured && <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b' }}>Featured</span>}
              <button onClick={() => handleDelete(t._id)} className="text-gray-500 hover:text-red-400 transition-colors ml-auto"><Trash2 size={14} /></button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
