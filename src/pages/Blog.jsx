import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, ArrowRight, Tag } from 'lucide-react'
import { blogAPI } from '../api'

const staticBlogs = [
  { _id: '1', title: 'The Future of SaaS: Trends Shaping 2025 and Beyond', slug: 'future-of-saas-trends-2025', excerpt: 'Discover the key trends transforming the SaaS industry — from AI-native products to vertical SaaS dominance and usage-based pricing models.', category: 'Industry Trends', tags: ['SaaS', 'AI', 'Trends'], readTime: 8, authorName: 'NexaForge Team', thumbnail: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=80', createdAt: '2024-12-15' },
  { _id: '2', title: 'Building Multi-Tenant SaaS Architecture: A Complete Guide', slug: 'building-multi-tenant-saas-architecture', excerpt: 'Learn the best practices for architecting a multi-tenant SaaS application — database strategies, isolation patterns, and scaling considerations.', category: 'Engineering', tags: ['Architecture', 'Multi-Tenant', 'Backend'], readTime: 12, authorName: 'NexaForge Team', thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80', createdAt: '2024-12-08' },
  { _id: '3', title: 'Why Great UI/UX is Your Best Growth Hack in 2025', slug: 'great-ui-ux-best-growth-hack-2025', excerpt: 'Companies investing in exceptional UX are seeing 400% ROI. Here is why design has become the most powerful competitive moat in modern SaaS.', category: 'Design', tags: ['UX', 'Design', 'Growth'], readTime: 6, authorName: 'NexaForge Team', thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80', createdAt: '2024-12-01' },
  { _id: '4', title: 'Integrating OpenAI into Your SaaS Product: A Practical Playbook', slug: 'integrating-openai-saas-product-playbook', excerpt: 'From prompt engineering to cost optimization — a practical guide to building production-grade AI features into your SaaS product.', category: 'AI & ML', tags: ['AI', 'OpenAI', 'Integration'], readTime: 10, authorName: 'NexaForge Team', thumbnail: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80', createdAt: '2024-11-24' },
  { _id: '5', title: 'Scaling Node.js: From 1K to 1M Concurrent Users', slug: 'scaling-nodejs-1k-to-1m-users', excerpt: 'Performance engineering strategies for scaling your Node.js backend to handle millions of concurrent connections without breaking the bank.', category: 'Engineering', tags: ['Node.js', 'Scaling', 'Performance'], readTime: 15, authorName: 'NexaForge Team', thumbnail: 'https://images.unsplash.com/photo-1623479322729-28b25c16b011?w=800&q=80', createdAt: '2024-11-17' },
  { _id: '6', title: 'The Complete Guide to SaaS Pricing Strategy', slug: 'complete-guide-saas-pricing-strategy', excerpt: 'Choosing the right pricing model can make or break your SaaS business. Explore value-based, usage-based, and hybrid pricing strategies.', category: 'Business', tags: ['Pricing', 'Strategy', 'SaaS'], readTime: 9, authorName: 'NexaForge Team', thumbnail: 'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=800&q=80', createdAt: '2024-11-10' },
]

const categories = ['All', 'Industry Trends', 'Engineering', 'Design', 'AI & ML', 'Business']
const categoryColors = { 'Industry Trends': '#6366f1', Engineering: '#06b6d4', Design: '#f59e0b', 'AI & ML': '#8b5cf6', Business: '#10b981' }

export default function Blog() {
  const [blogs, setBlogs] = useState(staticBlogs)
  const [activeCategory, setActiveCategory] = useState('All')

  useEffect(() => {
    blogAPI.getAll({ published: true }).then(({ data }) => { if (data.data?.length) setBlogs(data.data) }).catch(() => {})
  }, [])

  const filtered = activeCategory === 'All' ? blogs : blogs.filter((b) => b.category === activeCategory)

  return (
    <div style={{ background: '#030712' }}>
      {/* Hero */}
      <section className="relative pt-36 pb-20 overflow-hidden" style={{ background: 'radial-gradient(ellipse at top, #1a1040 0%, #030712 60%)' }}>
        <div className="absolute inset-0 opacity-25" style={{ backgroundImage: 'linear-gradient(rgba(99,102,241,0.07) 1px, transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.07) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-medium mb-4" style={{ color: '#6366f1' }}>INSIGHTS</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display font-extrabold text-5xl md:text-6xl text-white mb-6">
            The{' '}
            <span style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>NexaForge</span>{' '}
            Blog
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-gray-400 text-lg">
            Engineering deep-dives, product strategy, design craft, and SaaS insights from our team.
          </motion.p>
        </div>
      </section>

      {/* Filter */}
      <div className="py-8" style={{ background: '#0a0f1e', borderBottom: '1px solid rgba(99,102,241,0.1)' }}>
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className="px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200"
              style={activeCategory === cat ? { background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: 'white' } : { background: 'rgba(255,255,255,0.04)', color: '#9ca3af', border: '1px solid rgba(255,255,255,0.08)' }}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((blog, i) => (
              <motion.article key={blog._id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }} className="group rounded-2xl overflow-hidden flex flex-col" style={{ background: '#0a0f1e', border: '1px solid rgba(255,255,255,0.06)' }}>
                <Link to={`/blog/${blog.slug}`}>
                  <div className="relative overflow-hidden h-48">
                    <img src={blog.thumbnail || 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&q=80'} alt={blog.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute top-3 left-3">
                      <span className="text-xs font-medium px-3 py-1 rounded-full" style={{ background: `${categoryColors[blog.category] || '#6366f1'}25`, color: categoryColors[blog.category] || '#6366f1' }}>
                        {blog.category}
                      </span>
                    </div>
                  </div>
                </Link>
                <div className="p-6 flex flex-col flex-1">
                  <Link to={`/blog/${blog.slug}`}>
                    <h2 className="font-display font-semibold text-lg text-white mb-2 group-hover:text-primary-400 transition-colors line-clamp-2">{blog.title}</h2>
                  </Link>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2 flex-1">{blog.excerpt}</p>
                  <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Clock size={12} /> {blog.readTime} min read</span>
                      <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    </div>
                    <Link to={`/blog/${blog.slug}`} className="flex items-center gap-1 text-xs font-medium text-primary-400 hover:text-primary-300 transition-colors">
                      Read <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
