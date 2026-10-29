import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx'

function AnimatedRoutes() {
  const location = useLocation()
  const reduceMotion = useReducedMotion()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        className="route-transition"
        key={location.pathname}
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
        transition={{ duration: reduceMotion ? 0 : 0.22, ease: 'easeOut' }}
      >
        <Routes location={location}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cadastro" element={<RegisterPage />} />
          <Route path="/recuperar-senha" element={<ForgotPasswordPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  )
}

export default App
