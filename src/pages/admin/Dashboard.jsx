import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Users, Briefcase, FileText, MessageSquare, Star, Eye } from 'lucide-react'
import { analyticsAPI } from '../../api'

const staticStats = {
  stats: { contacts: 24, projects: 6, blogs: 6, services: 6, testimonials: 6, newContacts: 5 },
  monthlyContacts: [
    { _id: { month: 7 }, count: 3 }, { _id: { month: 8 }, count: 5 }, { _id: { month: 9 }, count: 4 },
    { _id: { month: 10 }, count: 7 }, { _id: { month: 11 }, count: 6 }, { _id: { month: 12 }, count: 8 },
  ],
  recentContacts: [
    { _id: '1', name: 'Sarah Chen', email: 'sarah@fintech.com', budget: '$15k - $50k', status: 'new', createdAt: new Date().toISOString() },
    { _id: '2', name: 'Marcus Kim', email: 'marcus@startup.io', budget: '$50k - $100k', status: 'read', createdAt: new Date(Date.now() - 86400000).toISOString() },
    { _id: '3', name: 'Priya Patel', email: 'priya@corp.com', budget: '$100k+', status: 'replied', createdAt: new Date(Date.now() - 172800000).toISOString() },
  ],
}

const statCards = [
  { key: 'contacts', label: 'Total Contacts', icon: Users, color: '#6366f1' },
  { key: 'projects', label: 'Projects', icon: Briefcase, color: '#06b6d4' },
  { key: 'blogs', label: 'Blog Posts', icon: FileText, color: '#8b5cf6' },
  { key: 'testimonials', label: 'Testimonials', icon: Star, color: '#f59e0b' },
  { key: 'newContacts', label: 'New Messages', icon: MessageSquare, color: '#ef4444' },
  { key: 'services', label: 'Services', icon: Eye, color: '#10b981' },
]

const monthNames = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const statusColors = { new: '#6366f1', read: '#06b6d4', replied: '#10b981', archived: '#6b7280' }

export default function Dashboard() {
  const [data, setData] = useState(staticStats)

  useEffect(() => {
    analyticsAPI.getDashboard().then(({ data: res }) => { if (res.data) setData(res.data) }).catch(() => {})
  }, [])

  const chartData = (data.monthlyContacts || []).map((d) => ({ month: monthNames[d._id.month], contacts: d.count }))

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-8">
          <h1 className="font-display font-bold text-2xl text-white">Dashboard Overview</h1>
          <p className="text-gray-400 text-sm mt-1">Welcome back! Here's what's happening with your agency.</p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          {statCards.map(({ key, label, icon: Icon, color }) => (
            <motion.div key={key} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.05 }}
              className="p-5 rounded-2xl" style={{ background: '#0a0f1e', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${color}20` }}>
                  <Icon size={17} style={{ color }} />
                </div>
              </div>
              <p className="font-display font-bold text-2xl text-white">{data.stats?.[key] ?? 0}</p>
              <p className="text-xs text-gray-400 mt-1">{label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart */}
          <div className="lg:col-span-2 p-6 rounded-2xl" style={{ background: '#0a0f1e', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h2 className="font-display font-semibold text-white mb-5">Monthly Contacts (Last 6 Months)</h2>
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: '#0a0f1e', border: '1px solid rgba(99,102,241,0.3)', borderRadius: 8, color: '#e5e7eb' }} />
                  <Bar dataKey="contacts" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-52 flex items-center justify-center text-gray-600 text-sm">No contact data yet</div>
            )}
          </div>

          {/* Recent Contacts */}
          <div className="p-6 rounded-2xl" style={{ background: '#0a0f1e', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h2 className="font-display font-semibold text-white mb-5">Recent Contacts</h2>
            <div className="space-y-3">
              {(data.recentContacts || []).map((contact) => (
                <div key={contact._id} className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-white truncate">{contact.name}</p>
                    <span className="text-xs px-2 py-0.5 rounded-full capitalize" style={{ background: `${statusColors[contact.status]}20`, color: statusColors[contact.status] }}>{contact.status}</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{contact.email}</p>
                  <p className="text-xs text-gray-600 mt-1">{contact.budget}</p>
                </div>
              ))}
              {(!data.recentContacts || data.recentContacts.length === 0) && (
                <p className="text-gray-600 text-sm text-center py-8">No contacts yet</p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
