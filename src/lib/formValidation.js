export function getFormErrors(form) {
  const errors = {}

  for (const field of form.elements) {
    if (!(field instanceof HTMLInputElement)) continue

    if (field.validity.valueMissing) {
      errors[field.name] = 'Este campo é obrigatório.'
    } else if (field.validity.typeMismatch && field.type === 'email') {
      errors[field.name] = 'Digite um endereço de e-mail válido.'
    } else if (field.validity.tooShort) {
      errors[field.name] = `Use pelo menos ${field.minLength} caracteres.`
    }
  }

  return errors
}
