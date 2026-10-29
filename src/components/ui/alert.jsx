function Alert({ variant = 'default', children }) {
  return (
    <div
      className={`ui-alert ui-alert--${variant}`}
      role={variant === 'destructive' ? 'alert' : 'status'}
      data-slot="alert"
    >
      <span className="ui-alert__icon" aria-hidden="true">
        {variant === 'destructive' ? '!' : '✓'}
      </span>
      <div className="ui-alert__content">{children}</div>
    </div>
  )
}

export default Alert
