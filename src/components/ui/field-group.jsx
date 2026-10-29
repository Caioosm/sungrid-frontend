function FieldGroup({ children, className = '' }) {
  return (
    <div className={`field-group ${className}`.trim()} data-slot="field-group">
      {children}
    </div>
  )
}

function Field({ children, className = '' }) {
  return (
    <div className={`field ${className}`.trim()} data-slot="field">
      {children}
    </div>
  )
}

function FieldLabel({ htmlFor, children }) {
  return (
    <label className="field-label" htmlFor={htmlFor} data-slot="field-label">
      {children}
    </label>
  )
}

function FieldError({ id, children }) {
  if (!children) return null

  return (
    <p
      className="field-error"
      id={id}
      role="alert"
      data-slot="field-error"
    >
      {children}
    </p>
  )
}

export { Field, FieldError, FieldGroup, FieldLabel }
