import { useState } from 'react'
import {
  Field,
  FieldError,
  FieldLabel,
} from './ui/field-group.jsx'

function EyeIcon({ visible }) {
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
      {visible ? (
        <>
          <path d="M3 3l18 18" />
          <path d="M10.6 10.6a2 2 0 002.8 2.8" />
          <path d="M9.9 5.2A10.7 10.7 0 0112 5c5.4 0 9 5 9 7a9.9 9.9 0 01-3 4.2" />
          <path d="M6.2 6.2C3.9 7.7 3 10.2 3 12c0 2 3.6 7 9 7a9.5 9.5 0 004.1-.9" />
        </>
      ) : (
        <>
          <path d="M2.5 12s3.4-6 9.5-6 9.5 6 9.5 6-3.4 6-9.5 6-9.5-6-9.5-6z" />
          <circle cx="12" cy="12" r="2.5" />
        </>
      )}
    </svg>
  )
}

function FormField({
  id,
  label,
  type = 'text',
  placeholder,
  autoComplete,
  required = true,
  minLength,
  error,
  onChange,
}) {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const isPassword = type === 'password'

  return (
    <Field className="form-field">
      <FieldLabel htmlFor={id}>
        {label}
        {required && (
          <>
            <span className="required-mark" aria-hidden="true">
              *
            </span>
            <span className="sr-only"> obrigatório</span>
          </>
        )}
      </FieldLabel>
      <div className={`input-wrap${isPassword ? ' input-wrap--password' : ''}`}>
        <input
          className="input-control"
          id={id}
          name={id}
          type={isPassword && passwordVisible ? 'text' : type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          minLength={minLength}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          onChange={onChange}
        />
        {isPassword && (
          <button
            className="password-toggle"
            type="button"
            onClick={() => setPasswordVisible((visible) => !visible)}
            aria-label={passwordVisible ? 'Ocultar senha' : 'Mostrar senha'}
            aria-pressed={passwordVisible}
          >
            <EyeIcon visible={passwordVisible} />
          </button>
        )}
      </div>
      <FieldError id={`${id}-error`}>{error}</FieldError>
    </Field>
  )
}

export default FormField
