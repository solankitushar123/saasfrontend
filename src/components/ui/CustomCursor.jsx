import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [hover, setHover] = useState(false)
  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY })
    const over = (e) => setHover(!!e.target.closest('a, button, [role="button"]'))
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseover', over) }
  }, [])
  return (
    <>
      <motion.div className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] hidden lg:block" style={{border:'1px solid rgba(99,102,241,0.7)'}} animate={{ x: pos.x - 16, y: pos.y - 16, scale: hover ? 1.6 : 1 }} transition={{ type: 'spring', stiffness: 500, damping: 28 }} />
      <motion.div className="fixed top-0 left-0 w-2 h-2 bg-primary-500 rounded-full pointer-events-none z-[9999] hidden lg:block" animate={{ x: pos.x - 4, y: pos.y - 4 }} transition={{ type: 'spring', stiffness: 2000, damping: 50 }} />
    </>
  )
}
