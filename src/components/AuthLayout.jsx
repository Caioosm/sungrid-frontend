import '../styles/auth.css'

function AuthLayout({ title, subtitle, children, footer, className = '' }) {
  return (
    <main className="auth-page">
      <section className={`auth-card ${className}`.trim()}>
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
      </section>
    </main>
  )
}

export default AuthLayout
