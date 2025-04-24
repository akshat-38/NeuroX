"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

type FloatingObject = {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  rotate: number
  shape: "circle" | "square" | "triangle" | "donut"
  color: string
}

export default function FloatingObjects() {
  const [objects, setObjects] = useState<FloatingObject[]>([])
  const { theme } = useTheme()

  useEffect(() => {
    // Generate random floating objects
    const numberOfObjects = Math.min(Math.floor(window.innerWidth / 200), 15)
    const newObjects: FloatingObject[] = []

    const shapes = ["circle", "square", "triangle", "donut"]
    const colors =
      theme === "dark" ? ["#a855f7", "#22d3ee", "#8b5cf6", "#6366f1"] : ["#c084fc", "#67e8f9", "#a78bfa", "#818cf8"]

    for (let i = 0; i < numberOfObjects; i++) {
      newObjects.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 40 + 20,
        duration: Math.random() * 100 + 100,
        delay: Math.random() * 5,
        rotate: Math.random() * 360,
        shape: shapes[Math.floor(Math.random() * shapes.length)] as any,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    setObjects(newObjects)
  }, [theme])

  const renderShape = (object: FloatingObject) => {
    const opacity = theme === "dark" ? 0.05 : 0.03

    switch (object.shape) {
      case "circle":
        return (
          <div
            className="rounded-full"
            style={{
              width: object.size,
              height: object.size,
              backgroundColor: `${object.color}${opacity * 100}`,
              border: `1px solid ${object.color}${opacity * 200}`,
            }}
          />
        )
      case "square":
        return (
          <div
            className="rounded-md"
            style={{
              width: object.size,
              height: object.size,
              backgroundColor: `${object.color}${opacity * 100}`,
              border: `1px solid ${object.color}${opacity * 200}`,
            }}
          />
        )
      case "triangle":
        return (
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: `${object.size / 2}px solid transparent`,
              borderRight: `${object.size / 2}px solid transparent`,
              borderBottom: `${object.size}px solid ${object.color}${opacity * 100}`,
            }}
          />
        )
      case "donut":
        return (
          <div
            className="rounded-full flex items-center justify-center"
            style={{
              width: object.size,
              height: object.size,
              border: `3px solid ${object.color}${opacity * 200}`,
              backgroundColor: "transparent",
            }}
          >
            <div
              className="rounded-full"
              style={{
                width: object.size / 3,
                height: object.size / 3,
                backgroundColor: "transparent",
                border: `1px solid ${object.color}${opacity * 200}`,
              }}
            />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden z-[-1]">
      {objects.map((object) => (
        <motion.div
          key={object.id}
          className="absolute"
          style={{
            left: `${object.x}%`,
            top: `${object.y}%`,
          }}
          animate={{
            x: [0, 30, -20, 10, 0],
            y: [0, -30, 20, -10, 0],
            rotate: [object.rotate, object.rotate + 20, object.rotate - 20, object.rotate + 10, object.rotate],
          }}
          transition={{
            duration: object.duration,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
            delay: object.delay,
          }}
        >
          {renderShape(object)}
        </motion.div>
      ))}
    </div>
  )
}
