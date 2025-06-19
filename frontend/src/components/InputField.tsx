// frontend/src/components/InputField.tsx
import React from 'react'
import '../styles/InputField.css'

interface InputFieldProps {
 label: string
 id: string
 type: string
 value: string
 onChange: (e: React.ChangeEvent<HTMLInputElement>) => void // Tipagem correta para o evento onChange
 placeholder?: string
 error?: string
}

export const InputField: React.FC<InputFieldProps> = ({
 label,
 id,
 type,
 value,
 onChange,
 placeholder,
 error
}) => {
 return (
  <div className="input-group">
   <label htmlFor={id}>{label}</label>
   <input
    id={id}
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={error ? 'input-error' : ''}
   />
   {error && <p className="input-error-message">{error}</p>}
  </div>
 )
}
