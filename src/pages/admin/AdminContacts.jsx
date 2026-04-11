import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { contactAPI } from '../../api'
import toast from 'react-hot-toast'
import { Mail, Phone, Building, DollarSign, MessageSquare } from 'lucide-react'

const statusColors = { new: '#6366f1', read: '#06b6d4', replied: '#10b981', archived: '#6b7280' }
const staticContacts = [
  { _id: '1', name: 'Sarah Chen', email: 'sarah@fintech.com', company: 'FinTech Inc', phone: '+1234567890', budget: '$15k - $50k', service: 'SaaS Development', message: 'We need a multi-tenant SaaS platform for financial reporting.', status: 'new', createdAt: new Date().toISOString() },
  { _id: '2', name: 'Marcus Kim', email: 'marcus@startup.io', company: 'Startup.io', phone: '+0987654321', budget: '$50k - $100k', service: 'AI Integration', message: 'Looking to integrate GPT-4 into our existing platform.', status: 'read', createdAt: new Date(Date.now() - 86400000).toISOString() },
  { _id: '3', name: 'Priya Patel', email: 'priya@corp.com', company: 'BigCorp', phone: '', budget: '$100k+', service: 'Cloud Solutions', message: 'Need full AWS migration and DevOps setup.', status: 'replied', createdAt: new Date(Date.now() - 172800000).toISOString() },
]

export default function AdminContacts() {
  const [contacts, setContacts] = useState(staticContacts)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    contactAPI.getAll().then(({ data }) => { if (data.data?.length) setContacts(data.data) }).catch(() => {})
  }, [])

  const updateStatus = async (id, status) => {
    try {
      await contactAPI.updateStatus(id, status)
      setContacts(contacts.map((c) => c._id === id ? { ...c, status } : c))
      if (selected?._id === id) setSelected({ ...selected, status })
      toast.success('Status updated')
    } catch { toast.error('Failed to update') }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display font-bold text-2xl text-white">Contact Messages</h1>
        <p className="text-gray-400 text-sm mt-1">{contacts.filter(c => c.status === 'new').length} unread messages</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* List */}
        <div className="space-y-3">
          {contacts.map((contact) => (
            <motion.div key={contact._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              onClick={() => setSelected(contact)}
              className={`p-5 rounded-2xl cursor-pointer transition-all duration-200 ${selected?._id === contact._id ? 'ring-1 ring-primary-500/50' : 'hover:border-white/15'}`}
              style={{ background: '#0a0f1e', border: `1px solid ${selected?._id === contact._id ? 'rgba(99,102,241,0.4)' : 'rgba(255,255,255,0.06)'}` }}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-white text-sm">{contact.name}</p>
                    {contact.status === 'new' && <div className="w-2 h-2 rounded-full bg-primary-500" />}
                  </div>
                  <p className="text-xs text-gray-500 mb-2">{contact.email} {contact.company ? `· ${contact.company}` : ''}</p>
                  <p className="text-xs text-gray-400 line-clamp-2">{contact.message}</p>
                </div>
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <span className="text-xs px-2.5 py-1 rounded-full capitalize" style={{ background: `${statusColors[contact.status]}20`, color: statusColors[contact.status] }}>{contact.status}</span>
                  <span className="text-xs text-gray-600">{new Date(contact.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </motion.div>
          ))}
          {contacts.length === 0 && <div className="text-center py-16 text-gray-600">No contacts yet</div>}
        </div>

        {/* Detail */}
        {selected ? (
          <div className="p-6 rounded-2xl h-fit sticky top-6" style={{ background: '#0a0f1e', border: '1px solid rgba(99,102,241,0.2)' }}>
            <div className="flex items-start justify-between mb-5">
              <div>
                <h2 className="font-display font-bold text-xl text-white">{selected.name}</h2>
                <p className="text-xs text-gray-500 mt-1">{new Date(selected.createdAt).toLocaleString()}</p>
              </div>
              <select value={selected.status} onChange={(e) => updateStatus(selected._id, e.target.value)}
                className="text-xs px-3 py-1.5 rounded-xl text-white focus:outline-none cursor-pointer"
                style={{ background: `${statusColors[selected.status]}20`, border: `1px solid ${statusColors[selected.status]}40`, color: statusColors[selected.status] }}>
                {['new', 'read', 'replied', 'archived'].map((s) => <option key={s} value={s} style={{ background: '#0a0f1e', color: '#e5e7eb' }}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
              </select>
            </div>
            <div className="space-y-3 mb-5">
              {[
                { icon: Mail, label: 'Email', value: selected.email, href: `mailto:${selected.email}` },
                { icon: Phone, label: 'Phone', value: selected.phone || '—' },
                { icon: Building, label: 'Company', value: selected.company || '—' },
                { icon: DollarSign, label: 'Budget', value: selected.budget || '—' },
                { icon: MessageSquare, label: 'Service', value: selected.service || '—' },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-3">
                  <Icon size={14} className="text-gray-500 flex-shrink-0" />
                  <span className="text-xs text-gray-400 w-16 flex-shrink-0">{label}:</span>
                  {href ? <a href={href} className="text-sm text-primary-400 hover:text-primary-300">{value}</a> : <span className="text-sm text-gray-200">{value}</span>}
                </div>
              ))}
            </div>
            <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="text-xs text-gray-500 mb-2">Message</p>
              <p className="text-sm text-gray-300 leading-relaxed">{selected.message}</p>
            </div>
            <a href={`mailto:${selected.email}`} className="mt-4 w-full flex items-center justify-center gap-2 text-sm font-semibold text-white py-3 rounded-xl transition-all hover:-translate-y-0.5" style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
              <Mail size={14} /> Reply via Email
            </a>
          </div>
        ) : (
          <div className="flex items-center justify-center rounded-2xl text-gray-600 text-sm" style={{ background: '#0a0f1e', border: '1px solid rgba(255,255,255,0.06)', minHeight: '300px' }}>
            Select a message to view details
          </div>
        )}
      </div>
    </div>
  )
}
