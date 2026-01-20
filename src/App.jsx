import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [ripples, setRipples] = useState([])

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleClick = (e) => {
    const newRipple = {
      x: e.clientX,
      y: e.clientY,
      id: Date.now()
    }
    setRipples([...ripples, newRipple])
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id))
    }, 1000)
  }

  return (
    <div className="app-container" onClick={handleClick}>
      <div
        className="cursor-glow"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`
        }}
      />

      {ripples.map(ripple => (
        <div
          key={ripple.id}
          className="ripple"
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`
          }}
        />
      ))}

      <div className="content">
        <h1 className="title">
          <span className="wave">H</span>
          <span className="wave">e</span>
          <span className="wave">l</span>
          <span className="wave">l</span>
          <span className="wave">o</span>
          <span className="wave"> </span>
          <span className="wave">W</span>
          <span className="wave">o</span>
          <span className="wave">r</span>
          <span className="wave">l</span>
          <span className="wave">d</span>
        </h1>

        <p className="subtitle">Welcome to your fancy React app</p>

        <div className="features">
          <div className="feature-card">
            <div className="icon">⚡</div>
            <h3>Lightning Fast</h3>
            <p>Built with Vite for instant HMR</p>
          </div>

          <div className="feature-card">
            <div className="icon">🎨</div>
            <h3>Beautiful Design</h3>
            <p>Modern gradients and animations</p>
          </div>

          <div className="feature-card">
            <div className="icon">🚀</div>
            <h3>Ready to Deploy</h3>
            <p>Optimized and production-ready</p>
          </div>
        </div>

        <p className="hint">Click anywhere to create ripples</p>
      </div>
    </div>
  )
}

export default App
