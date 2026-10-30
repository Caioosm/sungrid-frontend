import { motion, useReducedMotion } from 'motion/react'
import '../styles/auth.css'
import { Link } from 'react-router-dom'

function ArrowLeftIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  )
}

function AuthLayout({
  title,
  subtitle,
  children,
  footer,
  className = '',
  backLink,
}) {
  const reduceMotion = useReducedMotion()

  return (
    <main className="auth-page">
      <motion.section
        className={`auth-card ${className}`.trim()}
        initial={reduceMotion ? false : { y: 7 }}
        animate={{ y: 0 }}
        layout
        transition={{
          layout: reduceMotion
            ? { duration: 0 }
            : { type: 'spring', stiffness: 260, damping: 30 },
          y: { duration: reduceMotion ? 0 : 0.24, ease: 'easeOut' },
        }}
      >
        {backLink && (
          <Link className="auth-back" to={backLink} aria-label="Voltar para login">
            <ArrowLeftIcon />
          </Link>
        )}
        <header className="auth-header">
          <img
            className="auth-logo"
            src="/sungrid-logo.jpg"
            alt=""
            aria-hidden="true"
          />
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </header>
        {children}
        {footer && <footer className="auth-footer">{footer}</footer>}
      </motion.section>
    </main>
  )
}

export default AuthLayout
