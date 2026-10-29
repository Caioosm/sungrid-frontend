import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout.jsx'
import FormField from '../components/FormField.jsx'
import { authService } from '../services/authService.js'

function RegisterPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setMessage('')

    const form = event.currentTarget
    const formData = new FormData(form)
    const password = formData.get('password')

    if (password !== formData.get('confirm-password')) {
      setError('As senhas não coincidem.')
      return
    }

    setIsSubmitting(true)

    try {
      await authService.register({
        name: formData.get('name'),
        email: formData.get('email'),
        password,
      })
      setMessage('Conta criada com sucesso. Você já pode entrar.')
      form.reset()
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : 'Não foi possível criar sua conta. Tente novamente.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout
      title="Criar sua conta"
      subtitle="Junte-se ao monitoramento sustentável"
      className="register-card"
      footer={
        <>
          <span>Já possui uma conta?</span> <Link to="/login">Entrar aqui</Link>
        </>
      }
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <FormField
          id="name"
          label="Nome Completo"
          placeholder="Ex: Carlos Silva"
          autoComplete="name"
        />
        <FormField
          id="email"
          label="E-mail Corporativo"
          type="email"
          placeholder="seu@email.com"
          autoComplete="email"
        />
        <FormField
          id="password"
          label="Definir Senha"
          type="password"
          placeholder="Mínimo de 8 caracteres"
          autoComplete="new-password"
          minLength={8}
        />
        <FormField
          id="confirm-password"
          label="Confirmar Senha"
          type="password"
          placeholder="Repita sua senha"
          autoComplete="new-password"
          minLength={8}
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
          {isSubmitting ? 'Criando conta...' : 'Criar conta'}
        </button>
      </form>
    </AuthLayout>
  )
}

export default RegisterPage
