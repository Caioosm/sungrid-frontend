import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout.jsx'
import FormField from '../components/FormField.jsx'
import { authService } from '../services/authService.js'

function ForgotPasswordPage() {
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
      await authService.requestPasswordReset(formData.get('email'))
      setMessage(
        'Se houver uma conta com este e-mail, enviaremos as instruções para redefinir sua senha.',
      )
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : 'Não foi possível enviar a solicitação. Tente novamente.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout
      title="SunGrid"
      subtitle="Gestão inteligente de energia solar"
      className="recovery-card"
      footer={<Link to="/login">Voltar para entrar</Link>}
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <FormField
          id="email"
          label="Digite seu endereço de e-mail"
          type="email"
          placeholder="seu@email.com"
          autoComplete="email"
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
          {isSubmitting ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    </AuthLayout>
  )
}

export default ForgotPasswordPage
