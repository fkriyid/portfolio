import { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import './index.css'
import App from './App'
import ProjectPage from './pages/ProjectPage'
import NetworkBackground from './components/NetworkBackground'
import Aurora from './components/Aurora'

function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView(), 0)
      return () => clearTimeout(t)
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ScrollManager />
    <Aurora />
    <NetworkBackground />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/projects/:id" element={<ProjectPage />} />
      <Route path="*" element={<App />} />
    </Routes>
  </BrowserRouter>
)
