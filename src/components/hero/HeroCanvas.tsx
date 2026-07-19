import React, { useRef, useEffect } from 'react'
import { usePortfolio } from '../../context/PortfolioContext'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
  life: number
  maxLife: number
}

const PARTICLE_COUNT = 80
const CONNECTION_DIST = 120
const MOUSE_RADIUS = 180
const PARTICLE_SPEED = 0.4
const RESIZE_DEBOUNCE = 200

const HeroCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: -9999, y: -9999, active: false })
  const { darkMode } = usePortfolio()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (prefersReduced || isTouch) return

    let animationId = 0
    let w = 0
    let h = 0
    let resizeTimer: ReturnType<typeof setTimeout> | null = null

    const initParticles = (width: number, height: number) => {
      const particles: Particle[] = []
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const maxLife = 180 + Math.random() * 220
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * PARTICLE_SPEED,
          vy: (Math.random() - 0.5) * PARTICLE_SPEED,
          size: 1.5 + Math.random() * 2.5,
          alpha: 0.2 + Math.random() * 0.4,
          life: Math.random() * maxLife,
          maxLife,
        })
      }
      particlesRef.current = particles
    }

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w
      canvas.height = h
      initParticles(w, h)
    }

    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer)
      resizeTimer = setTimeout(resize, RESIZE_DEBOUNCE)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true }
    }

    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999, active: false }
    }

    resize()
    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    const animate = () => {
      const particles = particlesRef.current
      ctx.clearRect(0, 0, w, h)

      const { x: mx, y: my, active: mouseActive } = mouseRef.current
      const isDark = darkMode
      const color = isDark ? '80, 168, 137' : '0, 168, 137'

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        p.life += 1
        if (p.life >= p.maxLife) {
          p.x = Math.random() * w
          p.y = Math.random() * h
          p.vx = (Math.random() - 0.5) * PARTICLE_SPEED
          p.vy = (Math.random() - 0.5) * PARTICLE_SPEED
          p.life = 0
          p.alpha = 0.2 + Math.random() * 0.4
        }

        if (mouseActive) {
          const dx = p.x - mx
          const dy = p.y - my
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MOUSE_RADIUS && dist > 0) {
            const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS
            p.vx += (dx / dist) * force * 0.15
            p.vy += (dy / dist) * force * 0.15
          }
        }

        p.vx *= 0.99
        p.vy *= 0.99

        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (speed > PARTICLE_SPEED * 2) {
          p.vx = (p.vx / speed) * PARTICLE_SPEED * 2
          p.vy = (p.vy / speed) * PARTICLE_SPEED * 2
        }

        p.x += p.vx
        p.y += p.vy

        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10
        if (p.y < -10) p.y = h + 10
        if (p.y > h + 10) p.y = -10

        const lifeAlpha = p.life < 60 ? p.life / 60 : 1
        const fadeOut = p.life > p.maxLife - 60 ? (p.maxLife - p.life) / 60 : 1
        const finalAlpha = p.alpha * lifeAlpha * fadeOut

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${color}, ${finalAlpha * 0.6})`
        ctx.fill()

        // Glow on larger particles
        if (p.size > 2.5) {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${color}, ${finalAlpha * 0.12})`
          ctx.fill()
        }

        // Connection lines between particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.25 * finalAlpha
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(${color}, ${alpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      if (resizeTimer) clearTimeout(resizeTimer)
    }
  }, [darkMode])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none gpu"
      aria-hidden="true"
    />
  )
}

export default HeroCanvas
