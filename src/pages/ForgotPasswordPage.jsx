import { useState } from 'react'
import AuthLayout from '../components/AuthLayout.jsx'
import FormField from '../components/FormField.jsx'
import Alert from '../components/ui/alert.jsx'
import { FieldGroup } from '../components/ui/field-group.jsx'
import { getFormErrors } from '../lib/formValidation.js'
import { authService } from '../services/authService.js'

function ForgotPasswordPage() {
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
      backLink="/login"
    >
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <FieldGroup>
          <FormField
            id="email"
            label="Digite seu endereço de e-mail"
            type="email"
            placeholder="seu@email.com"
            autoComplete="email"
            error={fieldErrors.email}
            onChange={() => setFieldErrors((current) => ({ ...current, email: '' }))}
          />
        </FieldGroup>
        {error && <Alert variant="destructive">{error}</Alert>}
        {message && <Alert>{message}</Alert>}
        <button className="submit-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    </AuthLayout>
  )
}

export default ForgotPasswordPage
