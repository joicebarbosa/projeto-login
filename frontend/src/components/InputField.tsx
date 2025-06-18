import React from 'react';
import '../styles/InputField.css'; 

interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string; // Propriedade opcional para mensagens de erro
  placeholder?: string;
  id: string; // Para acessibilidade
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  value,
  onChange,
  error,
  placeholder,
  id,
}) => {
  return (
    <div className="input-group">
      <label htmlFor={id}>{label}:</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={error ? 'input-error' : ''}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};