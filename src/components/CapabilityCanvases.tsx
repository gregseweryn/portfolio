import React, { useEffect, useRef } from 'react'

export type CapabilityType = 'research' | 'design' | 'systems' | 'a11y'

interface CapabilityCanvasProps {
  type: CapabilityType
}

export const CapabilityCanvas: React.FC<CapabilityCanvasProps> = ({ type }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ currentX: 0, currentY: 0, targetX: 0, targetY: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let width = 0
    let height = 0
    const fov = 420

    const updateSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = container.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.resetTransform?.()
      ctx.scale(dpr, dpr)
    }

    updateSize()
    const resizeObserver = new ResizeObserver(updateSize)
    resizeObserver.observe(container)

    // Significantly increased mouse responsiveness and range
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      mouseRef.current.targetX = x * 1.05 // expressive horizontal tilt
      mouseRef.current.targetY = -y * 0.85 // expressive vertical tilt
    }

    const handleMouseLeave = () => {
      mouseRef.current.targetX = 0
      mouseRef.current.targetY = 0
    }

    // Attach to the parent card container if possible for full-card interactive hover
    const parentCard = container.closest('.capability-card') || container
    parentCard.addEventListener('mousemove', handleMouseMove as EventListener)
    parentCard.addEventListener('mouseleave', handleMouseLeave)

    const render = (time: number) => {
      // Snappier, fluid lerp interpolation
      mouseRef.current.currentX += (mouseRef.current.targetX - mouseRef.current.currentX) * 0.12
      mouseRef.current.currentY += (mouseRef.current.targetY - mouseRef.current.currentY) * 0.12

      const rotXOffset = mouseRef.current.currentY
      const rotYOffset = mouseRef.current.currentX

      // Dynamic parallax translation on mouse hover
      const cx = width / 2 + mouseRef.current.currentX * 18
      const cy = height / 2 - mouseRef.current.currentY * 14

      ctx.clearRect(0, 0, width, height)

      if (type === 'research') {
        // 1. UX Research: Concentric 3D Rings with Depth Attenuation (Expanded scale & expressive tilt)
        const t = time * 0.00075
        const ax = 0.52 + Math.sin(t * 0.7) * 0.12 + rotXOffset
        const ay = Math.sin(t * 0.8) * 0.35 + rotYOffset

        const drawRing = (radius: number, segments = 80) => {
          const pts: { x: number; y: number; z: number }[] = []
          for (let i = 0; i <= segments; i++) {
            const th = (i / segments) * Math.PI * 2
            const p = [Math.cos(th) * radius, Math.sin(th) * radius, 0]
            const y1 = p[1] * Math.cos(ax) - p[2] * Math.sin(ax)
            const z1 = p[1] * Math.sin(ax) + p[2] * Math.cos(ax)
            const x2 = p[0] * Math.cos(ay) + z1 * Math.sin(ay)
            const z2 = -p[0] * Math.sin(ay) + z1 * Math.cos(ay)
            const s = fov / (fov + z2)
            pts.push({ x: cx + x2 * s, y: cy + y1 * s, z: z2 })
          }

          for (let i = 0; i < segments; i++) {
            const p1 = pts[i]
            const p2 = pts[i + 1]
            const avgZ = (p1.z + p2.z) / 2
            const depth = (avgZ + 60) / 120
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(20, 20, 25, ${Math.max(0.18, 0.95 - depth * 0.65)})`
            ctx.lineWidth = Math.max(0.9, 2.2 - depth * 1.0)
            ctx.stroke()
          }
        }

        drawRing(64)
        drawRing(42)
        drawRing(22)

        // Center focal pulse
        const pulse = 1 + Math.sin(t * 2) * 0.15
        ctx.beginPath()
        ctx.arc(cx, cy, 2.8 * pulse, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(20, 20, 25, 0.9)'
        ctx.fill()
      } else if (type === 'design') {
        // 2. UX & UI Design: 3D Cube with Nested Module (Taller & larger scale)
        const t = time * 0.00065
        const ax = 0.44 + Math.sin(t * 0.6) * 0.10 + rotXOffset
        const ay = 0.72 + Math.sin(t * 0.7) * 0.32 + rotYOffset
        const hs = 44

        const project = (p: number[]) => {
          const y1 = p[1] * Math.cos(ax) - p[2] * Math.sin(ax)
          const z1 = p[1] * Math.sin(ax) + p[2] * Math.cos(ax)
          const x2 = p[0] * Math.cos(ay) + z1 * Math.sin(ay)
          const z2 = -p[0] * Math.sin(ay) + z1 * Math.cos(ay)
          const s = fov / (fov + z2)
          return { x: cx + x2 * s, y: cy + y1 * s, z: z2 }
        }

        // Outer cube vertices
        const v = [
          [-hs, -hs, -hs], [hs, -hs, -hs], [hs, hs, -hs], [-hs, hs, -hs],
          [-hs, -hs, hs], [hs, -hs, hs], [hs, hs, hs], [-hs, hs, hs]
        ].map(project)

        // Inner nested module vertices
        const innerHs = 22
        const vi = [
          [-innerHs, -innerHs, -innerHs], [innerHs, -innerHs, -innerHs],
          [innerHs, innerHs, -innerHs], [-innerHs, innerHs, -innerHs],
          [-innerHs, -innerHs, innerHs], [innerHs, -innerHs, innerHs],
          [innerHs, innerHs, innerHs], [-innerHs, innerHs, innerHs]
        ].map(project)

        // Outer translucent faces (transparent aesthetic)
        const faces = [
          [0, 1, 2, 3], [5, 4, 7, 6], [4, 0, 3, 7], [1, 5, 6, 2], [4, 5, 1, 0], [3, 2, 6, 7]
        ]
        faces.forEach(f => {
          ctx.beginPath()
          ctx.moveTo(v[f[0]].x, v[f[0]].y)
          ctx.lineTo(v[f[1]].x, v[f[1]].y)
          ctx.lineTo(v[f[2]].x, v[f[2]].y)
          ctx.lineTo(v[f[3]].x, v[f[3]].y)
          ctx.closePath()
          ctx.fillStyle = 'rgba(20, 25, 35, 0.025)'
          ctx.fill()
        })

        // Inner module wireframe
        const innerEdges = [
          [0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]
        ]
        innerEdges.forEach(([i, j]) => {
          ctx.beginPath()
          ctx.moveTo(vi[i].x, vi[i].y)
          ctx.lineTo(vi[j].x, vi[j].y)
          ctx.strokeStyle = 'rgba(20, 20, 25, 0.35)'
          ctx.lineWidth = 1.0
          ctx.stroke()
        })

        // Outer cube edges with depth attenuation
        const edges = [
          [0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]
        ]
        edges.forEach(([i, j]) => {
          const avgZ = (v[i].z + v[j].z) / 2
          const depth = (avgZ + 65) / 130
          ctx.beginPath()
          ctx.moveTo(v[i].x, v[i].y)
          ctx.lineTo(v[j].x, v[j].y)
          ctx.strokeStyle = `rgba(20, 20, 25, ${Math.max(0.25, 0.95 - depth * 0.65)})`
          ctx.lineWidth = Math.max(1.0, 2.1 - depth * 0.9)
          ctx.stroke()
        })
      } else if (type === 'systems') {
        // 3. Design Systems: Bento Grid with Extruded Tiles (Expanded scale & breathing gaps)
        const t = time * 0.00065
        const ax = 0.62 + Math.cos(t * 0.5) * 0.10 + rotXOffset
        const ay = Math.sin(t * 0.65) * 0.30 + rotYOffset
        const gap = 6 + (Math.sin(t * 1.6) * 0.5 + 0.5) * 6.5

        const scale = 1.25
        const cards = [
          { x: -65 * scale, y: -54 * scale, w: 42 * scale, h: 42 * scale },
          { x: (-65 + 42) * scale + gap, y: -54 * scale, w: 86 * scale - gap, h: 42 * scale },
          { x: -65 * scale, y: (-54 + 42) * scale + gap, w: 35 * scale, h: 76 * scale - gap },
          { x: (-65 + 35) * scale + gap, y: (-54 + 42) * scale + gap, w: 54 * scale, h: 36 * scale },
          { x: (-65 + 35) * scale + gap, y: (-54 + 42 + 36) * scale + gap * 2, w: 54 * scale, h: 40 * scale - gap },
          { x: (-65 + 89) * scale + gap * 2, y: (-54 + 42) * scale + gap, w: 39 * scale - gap, h: 76 * scale - gap }
        ]

        cards.forEach(c => {
          const pts = [
            [c.x, c.y, -4],
            [c.x + c.w, c.y, -4],
            [c.x + c.w, c.y + c.h, -4],
            [c.x, c.y + c.h, -4]
          ].map(p => {
            const y1 = p[1] * Math.cos(ax) - p[2] * Math.sin(ax)
            const z1 = p[1] * Math.sin(ax) + p[2] * Math.cos(ax)
            const x2 = p[0] * Math.cos(ay) + z1 * Math.sin(ay)
            const z2 = -p[0] * Math.sin(ay) + z1 * Math.cos(ay)
            const s = fov / (fov + z2)
            return { x: cx + x2 * s, y: cy + y1 * s, z: z2 }
          })

          ctx.beginPath()
          ctx.moveTo(pts[0].x, pts[0].y)
          ctx.lineTo(pts[1].x, pts[1].y)
          ctx.lineTo(pts[2].x, pts[2].y)
          ctx.lineTo(pts[3].x, pts[3].y)
          ctx.closePath()
          ctx.fillStyle = 'rgba(240, 243, 248, 0.45)'
          ctx.fill()
          ctx.strokeStyle = 'rgba(20, 20, 25, 0.85)'
          ctx.lineWidth = 1.4
          ctx.stroke()
        })
      } else if (type === 'a11y') {
        // 4. Accessibility: Extruded 3D Checkmark (Scaled up, transparent background)
        const t = time * 0.0007
        const ax = 0.38 + Math.sin(t * 0.55) * 0.10 + rotXOffset
        const ay = Math.sin(t * 0.7) * 0.34 + rotYOffset
        const hDepth = 12

        const scale = 0.68
        const p2d = [
          [-65 * scale, 5 * scale],
          [-20 * scale, 50 * scale],
          [65 * scale, -45 * scale],
          [46 * scale, -60 * scale],
          [-20 * scale, 16 * scale],
          [-48 * scale, -12 * scale]
        ]

        const project = (pt: number[]) => {
          const y1 = pt[1] * Math.cos(ax) - pt[2] * Math.sin(ax)
          const z1 = pt[1] * Math.sin(ax) + pt[2] * Math.cos(ax)
          const x2 = pt[0] * Math.cos(ay) + z1 * Math.sin(ay)
          const z2 = -pt[0] * Math.sin(ay) + z1 * Math.cos(ay)
          const s = fov / (fov + z2)
          return { x: cx + x2 * s, y: cy + y1 * s, z: z2 }
        }

        const pFront = p2d.map(p => project([p[0], p[1], -hDepth]))
        const pBack = p2d.map(p => project([p[0], p[1], hDepth]))

        // Extruded side walls
        for (let i = 0; i < p2d.length; i++) {
          const next = (i + 1) % p2d.length
          ctx.beginPath()
          ctx.moveTo(pFront[i].x, pFront[i].y)
          ctx.lineTo(pFront[next].x, pFront[next].y)
          ctx.lineTo(pBack[next].x, pBack[next].y)
          ctx.lineTo(pBack[i].x, pBack[i].y)
          ctx.closePath()
          ctx.fillStyle = 'rgba(15, 20, 30, 0.035)'
          ctx.fill()
          ctx.strokeStyle = 'rgba(20, 20, 25, 0.45)'
          ctx.lineWidth = 1.0
          ctx.stroke()
        }

        // Front face
        ctx.beginPath()
        ctx.moveTo(pFront[0].x, pFront[0].y)
        for (let i = 1; i < p2d.length; i++) ctx.lineTo(pFront[i].x, pFront[i].y)
        ctx.closePath()
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)'
        ctx.fill()
        ctx.strokeStyle = 'rgba(20, 20, 25, 0.95)'
        ctx.lineWidth = 1.8
        ctx.stroke()
      }

      animId = requestAnimationFrame(render)
    }

    animId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animId)
      resizeObserver.disconnect()
      parentCard.removeEventListener('mousemove', handleMouseMove as EventListener)
      parentCard.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [type])

  return (
    <div ref={containerRef} className="w-full h-full relative select-none">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  )
}
