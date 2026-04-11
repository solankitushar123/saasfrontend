import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { blogAPI } from '../../api'
import toast from 'react-hot-toast'
import { Plus, Pencil, Trash2, X, Save, Eye } from 'lucide-react'

const emptyForm = { title: '', excerpt: '', content: '', category: 'Engineering', tags: '', thumbnail: '', readTime: 5, published: false, authorName: 'NexaForge Team' }
const staticBlogs = [
  { _id: '1', title: 'The Future of SaaS: Trends Shaping 2025', category: 'Industry Trends', published: true, readTime: 8, views: 245, createdAt: '2024-12-15' },
  { _id: '2', title: 'Building Multi-Tenant SaaS Architecture', category: 'Engineering', published: true, readTime: 12, views: 189, createdAt: '2024-12-08' },
  { _id: '3', title: 'Why Great UI/UX is Your Best Growth Hack', category: 'Design', published: true, readTime: 6, views: 312, createdAt: '2024-12-01' },
]

export default function AdminBlog() {
  const [blogs, setBlogs] = useState(staticBlogs)
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    blogAPI.getAll({ published: '' }).then(({ data }) => { if (data.data?.length) setBlogs(data.data) }).catch(() => {})
  }, [])

  const openCreate = () => { setForm(emptyForm); setEditId(null); setModal(true) }
  const openEdit = (b) => { setForm({ ...b, tags: Array.isArray(b.tags) ? b.tags.join(', ') : b.tags }); setEditId(b._id); setModal(true) }

  const handleSave = async () => {
    setLoading(true)
    const payload = { ...form, tags: typeof form.tags === 'string' ? form.tags.split(',').map(t => t.trim()) : form.tags }
    try {
      if (editId) {
        await blogAPI.update(editId, payload)
        setBlogs(blogs.map(b => b._id === editId ? { ...b, ...payload } : b))
        toast.success('Blog updated')
      } else {
        const { data } = await blogAPI.create(payload)
        setBlogs([data.data || { ...payload, _id: Date.now().toString() }, ...blogs])
        toast.success('Blog created')
      }
      setModal(false)
    } catch { toast.error('Failed to save') } finally { setLoading(false) }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this post?')) return
    try {
      await blogAPI.delete(id)
      setBlogs(blogs.filter(b => b._id !== id))
      toast.success('Deleted')
    } catch { toast.error('Failed to delete') }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-2xl text-white">Blog Posts</h1>
          <p className="text-gray-400 text-sm mt-1">{blogs.length} posts total</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 text-sm font-semibold text-white px-5 py-2.5 rounded-xl hover:-translate-y-0.5 transition-all" style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
          <Plus size={16} /> New Post
        </button>
      </div>
      <div className="rounded-2xl overflow-hidden" style={{ background: '#0a0f1e', border: '1px solid rgba(255,255,255,0.06)' }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              {['Title', 'Category', 'Status', 'Read Time', 'Views', 'Date', 'Actions'].map(h => (
                <th key={h} className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-4">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <td className="px-5 py-4">
                  <p className="font-medium text-white text-sm line-clamp-1 max-w-xs">{blog.title}</p>
                </td>
                <td className="px-5 py-4">
                  <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: 'rgba(99,102,241,0.15)', color: '#a5b4fc' }}>{blog.category}</span>
                </td>
                <td className="px-5 py-4">
                  <span className="text-xs px-2.5 py-1 rounded-full" style={blog.published ? { background: 'rgba(16,185,129,0.15)', color: '#34d399' } : { background: 'rgba(107,114,128,0.15)', color: '#9ca3af' }}>
                    {blog.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-5 py-4 text-gray-400 text-xs">{blog.readTime} min</td>
                <td className="px-5 py-4 text-gray-400 text-xs">{blog.views || 0}</td>
                <td className="px-5 py-4 text-gray-500 text-xs">{new Date(blog.createdAt).toLocaleDateString()}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <button onClick={() => openEdit(blog)} className="text-gray-400 hover:text-primary-400 transition-colors"><Pencil size={14} /></button>
                    <button onClick={() => handleDelete(blog._id)} className="text-gray-400 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {blogs.length === 0 && <div className="text-center py-16 text-gray-600 text-sm">No blog posts yet</div>}
      </div>

      <AnimatePresence>
        {modal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(3,7,18,0.85)', backdropFilter: 'blur(8px)' }}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="w-full max-w-2xl rounded-3xl p-7 overflow-y-auto max-h-[90vh]" style={{ background: '#0a0f1e', border: '1px solid rgba(99,102,241,0.25)' }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display font-bold text-xl text-white">{editId ? 'Edit Post' : 'New Post'}</h2>
                <button onClick={() => setModal(false)} className="text-gray-400 hover:text-white"><X size={20} /></button>
              </div>
              <div className="space-y-4">
                {[
                  { name: 'title', label: 'Title', placeholder: 'Post title...' },
                  { name: 'excerpt', label: 'Excerpt', placeholder: 'Short summary...' },
                  { name: 'thumbnail', label: 'Thumbnail URL', placeholder: 'https://...' },
                  { name: 'authorName', label: 'Author Name', placeholder: 'NexaForge Team' },
                  { name: 'tags', label: 'Tags (comma-separated)', placeholder: 'SaaS, AI, Design' },
                ].map(({ name, label, placeholder }) => (
                  <div key={name}>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">{label}</label>
                    <input value={form[name] || ''} onChange={(e) => setForm({ ...form, [name]: e.target.value })} placeholder={placeholder}
                      className="w-full px-3 py-2.5 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">Content (HTML)</label>
                  <textarea rows={6} value={form.content || ''} onChange={(e) => setForm({ ...form, content: e.target.value })} placeholder="<h2>Heading</h2><p>Content...</p>"
                    className="w-full px-3 py-2.5 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none resize-none font-mono"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">Category</label>
                    <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-3 py-2.5 rounded-xl text-white text-sm focus:outline-none" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                      {['Engineering', 'Design', 'Industry Trends', 'AI & ML', 'Business'].map(c => <option key={c} value={c} style={{ background: '#0a0f1e' }}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">Read Time (min)</label>
                    <input type="number" value={form.readTime} onChange={(e) => setForm({ ...form, readTime: parseInt(e.target.value) })} className="w-full px-3 py-2.5 rounded-xl text-white text-sm focus:outline-none" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} />
                  </div>
                </div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="w-4 h-4 rounded" />
                  <span className="text-sm text-gray-300">Published</span>
                </label>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setModal(false)} className="flex-1 py-3 rounded-xl text-sm text-gray-400 hover:text-white" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>Cancel</button>
                <button onClick={handleSave} disabled={loading} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white disabled:opacity-60" style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
                  {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Save size={14} /> Save Post</>}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
