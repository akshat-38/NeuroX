"use client"

import { useEffect, useRef } from "react"

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  speed: number
  vx?: number
  vy?: number
  maxTravel?: number
  distanceTravelled?: number
}

interface GalaxyPoint {
  x: number
  y: number
  size: number
  opacity: number
  color: string
  speed: number
}

export default function BackgroundAnimation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const handleResize = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    function createBackground() {
      if (!ctx || !canvas) return
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, '#000000')
      gradient.addColorStop(0.5, '#090227')
      gradient.addColorStop(1, '#000000')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    const stars: Star[] = []
    const numberOfStars = 1000
    for (let i = 0; i < numberOfStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        opacity: Math.random(),
        speed: Math.random() * 0.9
      })
    }

    const galaxyPoints: GalaxyPoint[] = []
    const numberOfPoints = 200
    let bandWidth = canvas.height * 0.4
    let bandCenterY = canvas.height / 2

    for (let i = 0; i < numberOfPoints; i++) {
      const x = Math.random() * canvas.width
      const deviation = (Math.random() - 0.5) * bandWidth
      galaxyPoints.push({
        x,
        y: bandCenterY + deviation,
        size: Math.random() * 50 + 20,
        opacity: Math.random() * 0.3,
        color: Math.random() > 0.5 ? '#4B0082' : '#800080',
        speed: Math.random() * 0.5
      })
    }

    const shootingStars: Star[] = []
    let shootingSequenceActive = false

    const shootingPaths = [
      { startX: canvas.width, startY: 200, endX: 200, endY: 500 },
      { startX: canvas.width, startY: 100, endX: 400, endY: 400 },
      { startX: canvas.width, startY: 300, endX: 600, endY: 600 },
      { startX: canvas.width, startY: 50, endX: 300, endY: 450 },
      { startX: canvas.width, startY: 400, endX: 100, endY: 700 }
    ]
    let pathIndex = 0

    function spawnShootingStarFromPath() {
      if (!canvas) return
      if (pathIndex >= shootingPaths.length) pathIndex = 0
      const path = shootingPaths[pathIndex++]
      const dx = path.endX - path.startX
      const dy = path.endY - path.startY
      const distance = Math.sqrt(dx * dx + dy * dy)
      const speed = 8
      const vx = (dx / distance) * speed
      const vy = (dy / distance) * speed

      shootingStars.push({
        x: path.startX,
        y: path.startY,
        size: 2,
        opacity: 1,
        speed: 0,
        vx,
        vy,
        maxTravel: distance,
        distanceTravelled: 0
      })
    }

    function startShootingStarSequence() {
      if (shootingSequenceActive) return
      shootingSequenceActive = true

      spawnShootingStarFromPath()

      setTimeout(() => {
        spawnShootingStarFromPath()
      }, 1000)
    }

    function animate() {
      if (!ctx || !canvas) return

      bandWidth = canvas.height * 0.4
      bandCenterY = canvas.height / 2
      createBackground()

      galaxyPoints.forEach(point => {
        point.x -= point.speed
        if (point.x < -point.size) {
          point.x = canvas.width + point.size
          point.y = bandCenterY + (Math.random() - 0.5) * bandWidth
        }

        const gradient = ctx.createRadialGradient(
          point.x, point.y, 0,
          point.x, point.y, point.size
        )
        gradient.addColorStop(0, point.color)
        gradient.addColorStop(1, 'transparent')

        ctx.fillStyle = gradient
        ctx.globalAlpha = point.opacity
        ctx.beginPath()
        ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2)
        ctx.fill()
      })

      ctx.globalAlpha = 1
      stars.forEach(star => {
        star.x -= star.speed
        if (star.x < 0) {
          star.x = canvas.width
          star.y = Math.random() * canvas.height
        }

        const gradient = ctx.createRadialGradient(
          star.x, star.y, 0,
          star.x, star.y, star.size * 2
        )
        gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`)
        gradient.addColorStop(1, 'transparent')

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()
      })

      if (shootingStars.length === 0 && !shootingSequenceActive) {
        startShootingStarSequence()
      }
      if (shootingSequenceActive && shootingStars.length === 0) {
        shootingSequenceActive = false
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const star = shootingStars[i]
        const dx = star.vx ?? 0
        const dy = star.vy ?? 0
        const distance = Math.sqrt(dx * dx + dy * dy)
        star.x += dx
        star.y += dy
        star.distanceTravelled = (star.distanceTravelled ?? 0) + distance
        star.opacity -= 0.005

        if (star.opacity <= 0 || star.distanceTravelled > (star.maxTravel ?? canvas.width)) {
          shootingStars.splice(i, 1)
          continue
        }

        const trailLength = 150
        const gradient = ctx.createLinearGradient(
          star.x, star.y,
          star.x - dx * trailLength,
          star.y - dy * trailLength
        )
        gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`)
        gradient.addColorStop(0.2, `rgba(180, 180, 255, ${star.opacity * 0.6})`)
        gradient.addColorStop(1, 'transparent')

        ctx.strokeStyle = gradient
        ctx.lineWidth = star.size
        ctx.beginPath()
        ctx.moveTo(star.x, star.y)
        ctx.lineTo(star.x - dx * trailLength, star.y - dy * trailLength)
        ctx.stroke()
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-[-1]" />
}

