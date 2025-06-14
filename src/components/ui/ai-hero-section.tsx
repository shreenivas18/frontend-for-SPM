"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";

gsap.registerPlugin(ScrollTrigger)

interface ThreeRefsType {
  scene: THREE.Scene | null
  camera: THREE.PerspectiveCamera | null
  renderer: THREE.WebGLRenderer | null
  composer: EffectComposer | null
  particles: THREE.Points | null
  aiAgents: THREE.Mesh[]
  dataStreams: THREE.Line[]
  animationId: number | null
}

export const AIHeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const scrollProgressRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const smoothCameraPos = useRef({ x: 0, y: 0, z: 50 })

  const [scrollProgress, setScrollProgress] = useState(0)
  const [currentSection, setCurrentSection] = useState(0)
  const [isReady, setIsReady] = useState(false)
  const totalSections = 3

  const threeRefs = useRef<ThreeRefsType>({
    scene: null,
    camera: null,
    renderer: null,
    composer: null,
    particles: null,
    aiAgents: [],
    dataStreams: [],
    animationId: null,
  })

  // Initialize Three.js
  useEffect(() => {
    const initThree = () => {
      if (!canvasRef.current) return
      const { current: refs } = threeRefs

      // Scene setup
      refs.scene = new THREE.Scene()
      refs.scene.fog = new THREE.Fog(0x0a0a0a, 20, 200)

      // Camera
      refs.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      refs.camera.position.z = 50

      // Renderer
      refs.renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true,
        alpha: true,
      })
      refs.renderer.setSize(window.innerWidth, window.innerHeight)
      refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      refs.renderer.toneMapping = THREE.ACESFilmicToneMapping
      refs.renderer.toneMappingExposure = 1.2

      // Post-processing
      refs.composer = new EffectComposer(refs.renderer)
      const renderPass = new RenderPass(refs.scene, refs.camera)
      refs.composer.addPass(renderPass)

      const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85)
      refs.composer.addPass(bloomPass)

      // Create scene elements
      createFloatingParticles()
      createAIAgents()
      createDataStreams()
      createNetworkGrid()

      // Start animation
      animate()

      setIsReady(true)
    }

    const createFloatingParticles = () => {
      const { current: refs } = threeRefs
      if (!refs.scene) return
      const particleCount = 2000

      const geometry = new THREE.BufferGeometry()
      const positions = new Float32Array(particleCount * 3)
      const colors = new Float32Array(particleCount * 3)
      const sizes = new Float32Array(particleCount)

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 200
        positions[i * 3 + 1] = (Math.random() - 0.5) * 200
        positions[i * 3 + 2] = (Math.random() - 0.5) * 200

        // AI-themed colors: electric blue, cyan, purple
        const colorChoice = Math.random()
        const color = new THREE.Color()
        if (colorChoice < 0.4) {
          color.setHSL(0.6, 0.8, 0.7) // Blue
        } else if (colorChoice < 0.7) {
          color.setHSL(0.5, 0.9, 0.6) // Cyan
        } else {
          color.setHSL(0.8, 0.7, 0.8) // Purple
        }

        colors[i * 3] = color.r
        colors[i * 3 + 1] = color.g
        colors[i * 3 + 2] = color.b

        sizes[i] = Math.random() * 1.5 + 0.5
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))
      geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1))

      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
        },
        vertexShader: `
          attribute float size;
          attribute vec3 color;
          varying vec3 vColor;
          uniform float time;
          
          void main() {
            vColor = color;
            vec3 pos = position;
            pos.y += sin(pos.x * 0.1 + time) * 5.0;
            pos.x += cos(pos.y * 0.1 + time) * 5.0;
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = size * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          void main() {
            float r = 0.0, delta = 0.0, alpha = 1.0;
            vec2 cxy = 2.0 * gl_PointCoord - 1.0;
            r = dot(cxy, cxy);
            if (r > 1.0) {
                discard;
            }
            gl_FragColor = vec4(vColor, 1.0 - r);
          }
        `,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        transparent: true,
        vertexColors: true,
      })

      const particles = new THREE.Points(geometry, material)
      refs.scene.add(particles)
      refs.particles = particles
    }

    const createAIAgents = () => {
      const { current: refs } = threeRefs
      if (!refs.scene) return
      const agentCount = 100
      const agentGeometry = new THREE.SphereGeometry(0.5, 16, 16)

      for (let i = 0; i < agentCount; i++) {
        const material = new THREE.MeshStandardMaterial({
          color: new THREE.Color().setHSL(Math.random(), 0.8, 0.5),
          emissive: new THREE.Color().setHSL(Math.random(), 0.8, 0.5),
          emissiveIntensity: 2,
          metalness: 0.8,
          roughness: 0.2,
        })

        const agent = new THREE.Mesh(agentGeometry, material)
        agent.position.set((Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100)
        agent.userData.velocity = new THREE.Vector3(
          (Math.random() - 0.5) * 0.1,
          (Math.random() - 0.5) * 0.1,
          (Math.random() - 0.5) * 0.1
        )
        refs.scene.add(agent)
        refs.aiAgents.push(agent)
      }
    }

    const createDataStreams = () => {
      const { current: refs } = threeRefs
      if (!refs.scene) return
      const streamCount = 50

      for (let i = 0; i < streamCount; i++) {
        const geometry = new THREE.BufferGeometry()
        const positions = new Float32Array(2 * 3) // Line with 2 points
        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))

        const material = new THREE.LineBasicMaterial({
          color: new THREE.Color().setHSL(0.6 + Math.random() * 0.2, 0.9, 0.7),
          transparent: true,
          opacity: Math.random() * 0.5 + 0.2,
        })

        const line = new THREE.Line(geometry, material)
        line.userData.start = new THREE.Vector3(
          (Math.random() - 0.5) * 150,
          (Math.random() - 0.5) * 150,
          (Math.random() - 0.5) * 150
        )
        line.userData.end = line.userData.start.clone().add(new THREE.Vector3(0, -10, 0))
        line.userData.speed = Math.random() * 0.5 + 0.1

        refs.scene.add(line)
        refs.dataStreams.push(line)
      }
    }

    const createNetworkGrid = () => {
      const { current: refs } = threeRefs
      if (!refs.scene) return
      const gridHelper = new THREE.GridHelper(200, 50, 0x00ffff, 0x808080)
      gridHelper.position.y = -50
      gridHelper.material.opacity = 0.1
      gridHelper.material.transparent = true
      refs.scene.add(gridHelper)
    }

    const animate = () => {
      const { current: refs } = threeRefs
      refs.animationId = requestAnimationFrame(animate)

      const time = Date.now() * 0.0005

      // Animate particles
      if (refs.particles) {
        ;(refs.particles.material as THREE.ShaderMaterial).uniforms.time.value = time
      }

      // Animate AI agents
      refs.aiAgents.forEach((agent) => {
        agent.position.add(agent.userData.velocity)
        if (Math.abs(agent.position.x) > 100) agent.userData.velocity.x *= -1
        if (Math.abs(agent.position.y) > 100) agent.userData.velocity.y *= -1
        if (Math.abs(agent.position.z) > 100) agent.userData.velocity.z *= -1
      })

      // Animate data streams
      refs.dataStreams.forEach((line) => {
        line.userData.start.y -= line.userData.speed
        line.userData.end.y -= line.userData.speed
        if (line.userData.start.y < -75) {
          line.userData.start.y = 75
          line.userData.end.y = 85
        }
        const positions = line.geometry.attributes.position.array as Float32Array
        positions[0] = line.userData.start.x
        positions[1] = line.userData.start.y
        positions[2] = line.userData.start.z
        positions[3] = line.userData.end.x
        positions[4] = line.userData.end.y
        positions[5] = line.userData.end.z
        line.geometry.attributes.position.needsUpdate = true
      })

      // Smooth camera movement
      if (refs.camera) {
        refs.camera.position.x += (smoothCameraPos.current.x - refs.camera.position.x) * 0.05
        refs.camera.position.y += (smoothCameraPos.current.y - refs.camera.position.y) * 0.05
        refs.camera.position.z += (smoothCameraPos.current.z - refs.camera.position.z) * 0.05
      }

      if (refs.composer) {
        refs.composer.render()
      }
    }

    const handleResize = () => {
      const { current: refs } = threeRefs
      if (refs.camera && refs.renderer && refs.composer) {
        refs.camera.aspect = window.innerWidth / window.innerHeight
        refs.camera.updateProjectionMatrix()
        refs.renderer.setSize(window.innerWidth, window.innerHeight)
        refs.composer.setSize(window.innerWidth, window.innerHeight)
      }
    }

    initThree()

    window.addEventListener("resize", handleResize)

    return () => {
      const { current: refs } = threeRefs
      window.removeEventListener("resize", handleResize)
      if (refs.animationId) {
        cancelAnimationFrame(refs.animationId)
      }
      // Clean up Three.js resources
      if (refs.renderer) {
        refs.renderer.dispose()
      }
      if (refs.scene) {
        // Dispose geometries, materials, textures
      }
    }
  }, [])

  // GSAP Scroll-based animations
  useEffect(() => {
    if (!isReady || !containerRef.current || !threeRefs.current.camera || !titleRef.current || !subtitleRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
        onUpdate: (self) => {
          setScrollProgress(self.progress)
          const newSection = Math.floor(self.progress * (totalSections - 0.001))
          if (newSection !== currentSection) {
            setCurrentSection(newSection)
          }
        },
      },
    })

    // Section 0: Initial state
    tl.to(smoothCameraPos.current, { z: 50, ease: "power2.inOut" }, 0)

    // Section 1: Zoom in and focus on a cluster of agents
    tl.to(smoothCameraPos.current, { x: 20, y: -10, z: 20, ease: "power2.inOut" }, 1 / totalSections)
    tl.to(threeRefs.current.camera.rotation, { x: 0.2, y: -0.5, ease: "power2.inOut" }, 1 / totalSections)

    // Section 2: Fly through the data streams
    tl.to(smoothCameraPos.current, { x: 0, y: 0, z: 10, ease: "power2.inOut" }, 2 / totalSections)
    tl.to(threeRefs.current.camera.rotation, { x: 0, y: 0, ease: "power2.inOut" }, 2 / totalSections)

    // Animate title and subtitle
    gsap.from(titleRef.current.querySelectorAll(".char"), {
      opacity: 0,
      y: 50,
      stagger: 0.05,
      duration: 1.5,
      ease: "power3.out",
      delay: 0.5,
    })

    gsap.from(subtitleRef.current.querySelectorAll(".subtitle-line"), {
      opacity: 0,
      y: 30,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out",
      delay: 1.5,
    })

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [isReady, currentSection])

  const handleScroll = (direction: "down" | "up") => {
    if (!containerRef.current) return
    const currentScroll = window.scrollY
    const sectionHeight = containerRef.current.scrollHeight / totalSections
    let targetScroll

    if (direction === "down") {
      targetScroll = Math.min(
        (currentSection + 1) * sectionHeight,
        containerRef.current.scrollHeight - window.innerHeight
      )
    } else {
      targetScroll = Math.max((currentSection - 1) * sectionHeight, 0)
    }

    gsap.to(window, {
      scrollTo: {
        y: targetScroll,
        autoKill: false,
      },
      duration: 1.5,
      ease: "power3.inOut",
    })
  }

  const sectionContent = [
    {
      title: "The Dawn of AI",
      line1: "Witness the birth of intelligent systems,",
      line2: "transforming data into understanding.",
    },
    {
      title: "Neural Networks",
      line1: "Explore the intricate web of connections,",
      line2: "where learning and adaptation converge.",
    },
    {
      title: "The Future is Now",
      line1: "Harness the power of AI to build tomorrow,",
      line2: "today.",
    },
  ]

  const splitTitle = (text: string) => {
    return text.split("").map((char: string, index: number) => (
      <span key={index} className="char"
        style={{ display: "inline-block" }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ))
  }

  return (
    <div ref={containerRef} className="hero-container">
      <canvas ref={canvasRef} className="hero-canvas" />

      <div ref={menuRef} className="side-menu">
        <div className="menu-icon">
          <span />
          <span />
          <span />
        </div>
        <span className="vertical-text">HORIZON AI</span>
      </div>

      <div className="hero-content">
        <h1 ref={titleRef} className="hero-title">
          {splitTitle("HORIZON")}
        </h1>
        <div ref={subtitleRef} className="hero-subtitle">
          <p className="subtitle-line">The Next Frontier of Artificial Intelligence</p>
          <p className="subtitle-line">Unleashing the power of data-driven insights</p>
        </div>
      </div>

      <div ref={scrollProgressRef} className="scroll-progress">
        <span className="scroll-text">SCROLL</span>
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ transform: `scaleY(${scrollProgress})`, transformOrigin: "bottom" }}
          />
        </div>
        <span className="section-counter">{`0${currentSection + 1}`.slice(-2)}</span>
      </div>

      <div className="scroll-sections">
        {sectionContent.map((section, index) => (
          <section key={index} className="content-section">
            <div
              style={{
                opacity: currentSection === index ? 1 : 0,
                transform: `translateY(${currentSection === index ? 0 : 20}px)`,
                transition: "opacity 0.5s ease, transform 0.5s ease",
              }}
            >
              <h2 className="text-4xl font-bold mb-4">{section.title}</h2>
              <p className="subtitle-line">{section.line1}</p>
              <p className="subtitle-line">{section.line2}</p>
            </div>
          </section>
        ))}
      </div>

      <style jsx>{`
        .hero-container {
          position: relative;
          width: 100vw;
          height: 400vh;
          overflow: hidden;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
        }

        .hero-canvas {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .side-menu {
          position: fixed;
          left: 2rem;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
        }

        .menu-icon {
          display: flex;
          flex-direction: column;
          gap: 4px;
          cursor: pointer;
        }

        .menu-icon span {
          width: 20px;
          height: 2px;
          background: linear-gradient(90deg, #00ffff, #8000ff);
          transition: all 0.3s ease;
        }

        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
          color: #00ffff;
          font-size: 0.8rem;
          letter-spacing: 2px;
          opacity: 0.8;
          font-weight: 600;
        }

        .hero-content {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          z-index: 5;
          color: white;
        }

        .hero-title {
          font-size: clamp(4rem, 12vw, 12rem);
          font-weight: 900;
          letter-spacing: 0.1em;
          margin: 0;
          background: linear-gradient(45deg, #00ffff, #8000ff, #00ff88);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 0 30px rgba(0, 255, 255, 0.5);
          overflow: hidden;
        }

        .hero-subtitle {
          margin-top: 2rem;
          font-size: clamp(1rem, 2vw, 1.5rem);
          font-weight: 300;
          letter-spacing: 0.05em;
          opacity: 0.9;
          max-width: 700px;
          color: #e0e0e0;
        }

        .subtitle-line {
          margin: 0.5rem 0;
          overflow: hidden;
        }

        .scroll-progress {
          position: fixed;
          right: 2rem;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          color: #00ffff;
        }

        .scroll-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
          font-size: 0.8rem;
          letter-spacing: 2px;
          opacity: 0.8;
          font-weight: 600;
        }

        .progress-track {
          width: 2px;
          height: 100px;
          background: rgba(0, 255, 255, 0.2);
          position: relative;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(to top, #00ffff, #8000ff);
          transition: width 0.3s ease;
        }

        .section-counter {
          font-size: 0.8rem;
          font-weight: 600;
          opacity: 0.8;
        }

        .scroll-sections {
          position: relative;
          z-index: 2;
        }

        .content-section {
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          color: white;
          padding: 2rem;
        }

        @media (max-width: 768px) {
          .side-menu,
          .scroll-progress {
            display: none;
          }

          .hero-title {
            font-size: clamp(3rem, 15vw, 8rem);
          }

          .hero-subtitle {
            font-size: clamp(0.9rem, 4vw, 1.2rem);
            padding: 0 1rem;
          }
        }
      `}</style>
    </div>
  )
}
