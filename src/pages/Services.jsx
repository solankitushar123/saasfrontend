import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle } from 'lucide-react'

const services = [
  { icon: '☁️', title: 'SaaS Development', slug: 'saas-development', desc: 'We architect and build robust, multi-tenant SaaS platforms from the ground up. Whether you need an MVP in 6 weeks or an enterprise system serving millions — we deliver.', color: '#6366f1', features: ['Multi-tenant architecture', 'Subscription billing with Stripe', 'OAuth & SSO integration', 'Real-time features with WebSockets', 'Analytics dashboard', 'API-first design'], tech: ['React', 'Node.js', 'MongoDB', 'Redis', 'AWS', 'Stripe', 'Socket.io'] },
  { icon: '🌐', title: 'Web App Development', slug: 'web-app-development', desc: 'From marketing sites to complex web applications, we build fast, responsive, and scalable products using the latest technologies — optimized for performance and SEO.', color: '#06b6d4', features: ['Progressive Web Apps (PWA)', 'Real-time collaborative features', 'Offline-first architecture', 'Core Web Vitals optimization', 'SEO & semantic markup', 'WCAG accessibility compliance'], tech: ['React', 'Next.js', 'TypeScript', 'PostgreSQL', 'GraphQL', 'Docker', 'Vercel'] },
  { icon: '📱', title: 'Android Development', slug: 'android-development', desc: 'We create native Android applications with Kotlin that deliver seamless user experiences, robust performance, and deep integration with device features.', color: '#8b5cf6', features: ['Native Kotlin development', 'Material Design UI/UX', 'Offline data sync', 'Push notifications', 'In-app purchases', 'Google Play Store deployment'], tech: ['Kotlin', 'Android Jetpack', 'Firebase', 'Retrofit', 'Coroutines', 'Google Play Console'] },
  { icon: '🧠', title: 'AI Integration', slug: 'ai-integration', desc: 'We embed AI capabilities into your product that actually make a difference — from GPT-powered copilots to computer vision pipelines and intelligent automation workflows.', color: '#8b5cf6', features: ['LLM integration (GPT-4, Claude, Gemini)', 'RAG & vector database setup', 'Computer vision pipelines', 'NLP & text analytics', 'Recommendation engines', 'Autonomous agent workflows'], tech: ['Python', 'FastAPI', 'LangChain', 'OpenAI', 'Pinecone', 'TensorFlow', 'Hugging Face'] },
  { icon: '🎨', title: 'UI/UX Design', slug: 'ui-ux-design', desc: 'Our design team creates beautiful, intuitive interfaces that convert visitors into customers. Every design decision is backed by user research and conversion data.', color: '#f59e0b', features: ['User research & journey mapping', 'Wireframing & prototyping', 'Design system creation', 'Usability testing', 'Motion & interaction design', 'Figma → production handoff'], tech: ['Figma', 'Framer', 'Adobe XD', 'Maze', 'Lottie', 'Storybook', 'Hotjar'] },
  { icon: '🔌', title: 'API Development', slug: 'api-development', desc: 'We design and build APIs that developers love working with. Well-documented, versioned, performant REST and GraphQL APIs with enterprise-grade security.', color: '#10b981', features: ['REST API design & development', 'GraphQL schema & resolvers', 'JWT & OAuth 2.0 security', 'Rate limiting & throttling', 'OpenAPI / Swagger documentation', 'Webhook systems & event streaming'], tech: ['Node.js', 'Express', 'Go', 'Python', 'Kong', 'Swagger', 'Postman'] },
  { icon: '☁️', title: 'Cloud & DevOps', slug: 'cloud-solutions', desc: "We design, deploy, and manage cloud infrastructure that scales effortlessly with your growth. Zero-downtime deployments, auto-scaling, and 99.99% uptime SLAs.", color: '#ef4444', features: ['AWS / GCP / Azure architecture', 'Kubernetes orchestration', 'CI/CD pipeline automation', 'Infrastructure as Code (Terraform)', 'Monitoring & alerting setup', 'Cost optimization audits'], tech: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Datadog', 'Grafana'] },
  { icon: '🛠️', title: 'Maintenance & Support', slug: 'maintenance-support', desc: 'Our job isn’t done at launch. We offer ongoing support plans with 24/7 monitoring, performance optimization, security updates, and feature development.', color: '#6366f1', features: ['24/7 monitoring & incident response', 'Performance optimization', 'Security patching & updates', 'Feature request handling', 'Monthly analytics reports', 'Dedicated support channels'], tech: ['New Relic', 'Sentry', 'PagerDuty', 'GitHub Issues', 'Slack', 'Google Analytics'] },
  { icon: '⚙️', title: 'Custom Software', slug: 'custom-software', desc: 'Beyond SaaS, we build custom software solutions tailored to your unique needs — from internal tools and automation scripts to complex integrations and data pipelines.', color: '#06b6d4', features: ['Internal tool development', 'Automation scripts & bots', 'Third-party API integrations', 'Data processing pipelines', 'Custom CMS solutions', 'Legacy system modernization'], tech: ['Python', 'Node.js', 'Ruby on Rails', 'AWS Lambda', 'Zapier', 'Apache Airflow'] },
]

export default function Services() {
  return (
    <div style={{ background: '#030712' }}>
      {/* Hero */}
      <section className="relative pt-36 pb-20 overflow-hidden" style={{ background: 'radial-gradient(ellipse at top, #1a1040 0%, #030712 60%)' }}>
        <div className="absolute inset-0 opacity-25" style={{ backgroundImage: 'linear-gradient(rgba(99,102,241,0.07) 1px, transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.07) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-medium mb-4" style={{ color: '#6366f1' }}>SERVICES</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display font-extrabold text-5xl md:text-6xl text-white mb-6">
            Everything You Need to{' '}
            <span style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Ship</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-gray-400 text-lg">
            Full-stack software development services designed for modern SaaS companies and ambitious startups.
          </motion.p>
        </div>
      </section>

      {/* Services */}
      <section className="pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {services.map((svc, i) => (
              <motion.div key={svc.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }}
                className="p-8 md:p-10 rounded-3xl" style={{ background: '#0a0f1e', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <span className="text-4xl">{svc.icon}</span>
                      <div className="w-px h-8 bg-white/10" />
                      <span className="text-xs font-medium px-3 py-1 rounded-full" style={{ background: `${svc.color}15`, color: svc.color, border: `1px solid ${svc.color}30` }}>
                        Service 0{i + 1}
                      </span>
                    </div>
                    <h2 className="font-display font-extrabold text-3xl text-white mb-4">{svc.title}</h2>
                    <p className="text-gray-400 leading-relaxed mb-6">{svc.desc}</p>
                    <Link to="/contact" className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:-translate-y-0.5 text-sm"
                      style={{ background: `${svc.color}18`, color: svc.color, border: `1px solid ${svc.color}35` }}>
                      Start This Project <ArrowRight size={14} />
                    </Link>
                  </div>
                  <div>
                    <div className="mb-6">
                      <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">What's Included</h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {svc.features.map((f) => (
                          <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                            <CheckCircle size={14} className="mt-0.5 flex-shrink-0" style={{ color: svc.color }} />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Tech Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {svc.tech.map((t) => (
                          <span key={t} className="text-xs px-3 py-1 rounded-lg text-gray-300" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ background: '#0a0f1e', borderTop: '1px solid rgba(99,102,241,0.1)' }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display font-extrabold text-4xl text-white mb-5">Not sure which service you need?</h2>
          <p className="text-gray-400 mb-8">Book a free 30-minute strategy call. We'll recommend the best path forward for your product.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 font-semibold text-white px-10 py-4 rounded-xl transition-all duration-300 hover:-translate-y-1" style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', boxShadow: '0 0 40px rgba(99,102,241,0.35)' }}>
            Book a Free Call <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  )
}
