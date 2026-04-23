import { motion } from 'framer-motion'
export default function PageLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{background:'#030712'}}>
      <div className="flex flex-col items-center gap-6">
        <motion.div className="relative w-20 h-20" animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}>
          <div className="absolute inset-0 rounded-full" style={{border:'2px solid rgba(99,102,241,0.2)'}} />
          <div className="absolute inset-0 rounded-full" style={{border:'2px solid transparent', borderTopColor:'#6366f1'}} />
        </motion.div>
        <div className="flex gap-0.5">
          {['s','h','i','v','o','r','a'].map((l, i) => (
            <motion.span key={i} className="font-display font-bold text-2xl" style={{background:'linear-gradient(135deg,#6366f1,#8b5cf6,#06b6d4)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}} animate={{ y: [0, -10, 0] }} transition={{ duration: 0.6, delay: i * 0.06, repeat: Infinity }}>{l}</motion.span>
          ))}
        </div>
      </div>
    </div>
  )
}
