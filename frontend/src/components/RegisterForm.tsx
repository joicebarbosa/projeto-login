// frontend/src/components/RegisterForm.tsx
import React, { useState } from 'react';
import { InputField } from './InputField';
import '../styles/Form.css';
import { registerUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Alterado: Removido 'AxiosError' daqui

export const RegisterForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const navigate = useNavigate();

  const validateName = (name: string): string => {
    const nameRegex = /^[a-zA-Z]+\.[a-zA-Z]+$/;
    if (!name) {
      return 'O nome é obrigatório.';
    }
    if (!nameRegex.test(name)) {
      return 'O nome deve estar no formato "nome.sobrenome".';
    }
    return '';
  };

  const validatePassword = (password: string): string => {
    if (password.length < 8) {
      return 'A senha deve ter no mínimo 8 caracteres.';
    }
    if (!/[A-Z]/.test(password)) {
      return 'A senha deve conter pelo menos uma letra maiúscula.';
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return 'A senha deve conter pelo menos um caractere especial.';
    }
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setNameError('');
    setPasswordError('');
    setConfirmPasswordError('');

    const nameErr = validateName(name);
    const passErr = validatePassword(password);
    const confirmPassErr = password !== confirmPassword ? 'As senhas não coincidem.' : '';

    if (nameErr) {
      setNameError(nameErr);
    }
    if (passErr) {
      setPasswordError(passErr);
    }
    if (confirmPassErr) {
      setConfirmPasswordError(confirmPassErr);
    }

    if (nameErr || passErr || confirmPassErr) {
      return;
    }

    try {
      const data = await registerUser(name, email, password);
      console.log('Cadastro bem-sucedido!', data);
      alert('Cadastro realizado com sucesso! Agora você pode fazer login.');
      navigate('/login');
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        setFormError(err.response.data.message || 'Erro da API desconhecido.');
      } else if (err instanceof Error) {
        setFormError(err.message || 'Ocorreu um erro inesperado.');
      } else {
        setFormError('Ocorreu um erro desconhecido.');
      }
      console.error('Erro de registro no frontend:', err);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <InputField
        label="Nome"
        id="register-name"
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setNameError(validateName(e.target.value));
        }}
        placeholder="nome.sobrenome"
        error={nameError}
      />
      <InputField
        label="Email"
        id="register-email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Digite seu email"
      />
      <InputField
        label="Senha"
        id="register-password"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setPasswordError(validatePassword(e.target.value));
          if (confirmPassword) {
            setConfirmPasswordError(e.target.value !== confirmPassword ? 'As senhas não coincidem.' : '');
          }
        }}
        placeholder="Mínimo 8 caracteres, 1 maiúscula, 1 especial"
        error={passwordError}
      />
      <InputField
        label="Confirme a Senha"
        id="register-confirm-password"
        type="password"
        value={confirmPassword}
        onChange={(e) => {
          setConfirmPassword(e.target.value);
          setConfirmPasswordError(e.target.value !== password ? 'As senhas não coincidem.' : '');
        }}
        placeholder="Confirme sua senha"
        error={confirmPasswordError}
      />

      {formError && <p className="form-error-message">{formError}</p>}

      <button type="submit" className="form-button">Cadastrar</button>
    </form>
  );
};