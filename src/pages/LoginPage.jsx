import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout.jsx'
import FormField from '../components/FormField.jsx'
import { authService } from '../services/authService.js'

function LoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setMessage('')
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)

    try {
      await authService.login({
        email: formData.get('email'),
        password: formData.get('password'),
      })
      setMessage('Login realizado com sucesso.')
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : 'Não foi possível entrar. Tente novamente.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout
      title="SunGrid"
      subtitle="Gestão inteligente de energia solar"
      className="login-card"
      footer={
        <>
          <span>Novo no SunGrid?</span> <Link to="/cadastro">Cadastrar-se</Link>
        </>
      }
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <FormField
          id="email"
          label="Endereço de E-mail"
          type="email"
          placeholder="seu@email.com"
          autoComplete="email"
        />
        <FormField
          id="password"
          label="Senha"
          type="password"
          placeholder="Digite sua senha"
          autoComplete="current-password"
        />
        {error && (
          <p className="form-feedback form-feedback--error" role="alert">
            {error}
          </p>
        )}
        {message && (
          <p className="form-feedback form-feedback--success" role="status">
            {message}
          </p>
        )}
        <button className="submit-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Entrando...' : 'Entrar'}
        </button>
        <div className="form-link-row">
          <Link to="/recuperar-senha">Esqueci minha senha</Link>
        </div>
      </form>
    </AuthLayout>
  )
}

export default LoginPage
