import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout.jsx'
import FormField from '../components/FormField.jsx'
import Alert from '../components/ui/alert.jsx'
import { FieldGroup } from '../components/ui/field-group.jsx'
import { getFormErrors } from '../lib/formValidation.js'
import { authService } from '../services/authService.js'

function LoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setMessage('')

    const form = event.currentTarget
    const nextFieldErrors = getFormErrors(form)
    if (Object.keys(nextFieldErrors).length > 0) {
      setFieldErrors(nextFieldErrors)
      return
    }

    setFieldErrors({})
    setIsSubmitting(true)

    const formData = new FormData(form)

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
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <FieldGroup>
          <FormField
            id="email"
            label="Endereço de E-mail"
            type="email"
            placeholder="seu@email.com"
            autoComplete="email"
            error={fieldErrors.email}
            onChange={() => setFieldErrors((current) => ({ ...current, email: '' }))}
          />
          <FormField
            id="password"
            label="Senha"
            type="password"
            placeholder="Digite sua senha"
            autoComplete="current-password"
            error={fieldErrors.password}
            onChange={() => setFieldErrors((current) => ({ ...current, password: '' }))}
          />
        </FieldGroup>
        {error && <Alert variant="destructive">{error}</Alert>}
        {message && <Alert>{message}</Alert>}
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
