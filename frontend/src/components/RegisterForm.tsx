// frontend/src/components/RegisterForm.tsx
import React, { useState } from 'react';
import { InputField } from './InputField'; // Importação nomeada correta
import '../styles/Form.css';
import { registerUser } from '../api/auth';
import { useNavigate, Link } from 'react-router-dom'; // Importe Link também para o "Já tem uma conta?"
import axios from 'axios';

export const RegisterForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Estados para mensagens de feedback
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Estados para erros de validação individuais
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);

  const navigate = useNavigate();

  // --------------------------------------------------------------------------
  // Validadores
  // --------------------------------------------------------------------------
  const validateName = (name: string): string | null => {
    // Regex para permitir nomes com letras (incluindo acentos) e espaços
    const nameRegex = /^[a-zA-ZÀ-ÿ\u00C0-\u017F]+(?:\s[a-zA-ZÀ-ÿ\u00C0-\u017F]+)*$/; 
    if (!name.trim()) { // .trim() remove espaços em branco no início/fim
      return 'O nome é obrigatório.';
    }
    if (!nameRegex.test(name)) {
      return 'O nome deve conter apenas letras e pode ter espaços entre as palavras.';
    }
    return null;
  };

  const validateEmail = (email: string): string | null => {
    // Regex para validar emails de forma mais robusta (mas ainda simples para o frontend)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      return 'O email é obrigatório.';
    }
    if (!emailRegex.test(email)) {
      return 'Formato de email inválido.';
    }
    return null;
  };

  const validatePassword = (password: string): string | null => {
    if (password.length < 8) {
      return 'A senha deve ter no mínimo 8 caracteres.';
    }
    if (!/[A-Z]/.test(password)) {
      return 'A senha deve conter pelo menos uma letra maiúscula.';
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return 'A senha deve conter pelo menos um caractere especial.';
    }
    return null;
  };

  // --------------------------------------------------------------------------
  // Lógica de Submissão do Formulário
  // --------------------------------------------------------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null); // Limpa erros anteriores do formulário
    setSuccessMessage(null); // Limpa mensagens de sucesso anteriores

    // Revalida todos os campos para exibir os erros antes de enviar a requisição
    const nameErr = validateName(name);
    const emailErr = validateEmail(email);
    const passErr = validatePassword(password);
    const confirmPassErr = password !== confirmPassword ? 'As senhas não coincidem.' : null;

    // Atualiza os estados de erro individuais
    setNameError(nameErr);
    setEmailError(emailErr);
    setPasswordError(passErr);
    setConfirmPasswordError(confirmPassErr);

    // Se houver qualquer erro de validação local, impede o envio da requisição
    if (nameErr || emailErr || passErr || confirmPassErr) {
      setFormError('Por favor, corrija os erros no formulário.');
      return;
    }

    try {
      const newUser = await registerUser(name, email, password);
      console.log('Usuário registrado com sucesso:', newUser);
      setSuccessMessage('Cadastro realizado com sucesso! Redirecionando para o login...'); // Mensagem de sucesso
      
      // Limpa o formulário
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      // Redireciona para a página de login após um pequeno atraso
      setTimeout(() => {
        navigate('/login');
      }, 2000); // 2 segundos
    } catch (err: unknown) {
      // Tratamento de erros da requisição API
      if (axios.isAxiosError(err) && err.response) {
        // Usa a mensagem de erro retornada pelo backend, se disponível
        setFormError(err.response.data.message || 'Erro da API desconhecido.');
      } else if (err instanceof Error) {
        // Usa a mensagem de erro de outras exceções de JavaScript
        setFormError(err.message || 'Ocorreu um erro inesperado.');
      } else {
        // Para erros que não são instâncias de Error
        setFormError('Ocorreu um erro desconhecido.');
      }
      console.error('Erro de registro no frontend:', err);
    }
  };

  // --------------------------------------------------------------------------
  // Renderização do Componente
  // --------------------------------------------------------------------------
  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Cadastro</h2>

      {/* Mensagens de feedback (sucesso ou erro geral) */}
      {successMessage && <p className="success-message">{successMessage}</p>}
      {formError && <p className="form-error-message">{formError}</p>}

      {/* Campo Nome */}
      <InputField
        label="Nome"
        id="register-name"
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setNameError(validateName(e.target.value)); // Valida no onChange
        }}
        placeholder="Seu nome completo"
        error={nameError}
      />

      {/* Campo Email */}
      <InputField
        label="Email"
        id="register-email"
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setEmailError(validateEmail(e.target.value)); // Valida no onChange
        }}
        placeholder="seu.email@exemplo.com"
        error={emailError}
      />

      {/* Campo Senha */}
      <InputField
        label="Senha"
        id="register-password"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setPasswordError(validatePassword(e.target.value)); // Valida no onChange
          // Revalida a confirmação da senha se a senha for alterada e a confirmação já estiver preenchida
          if (confirmPassword) {
            setConfirmPasswordError(e.target.value !== confirmPassword ? 'As senhas não coincidem.' : null);
          }
        }}
        placeholder="Mínimo 8 caracteres, 1 maiúscula, 1 especial"
        error={passwordError}
      />

      {/* Campo Confirme a Senha */}
      <InputField
        label="Confirme a Senha"
        id="register-confirm-password"
        type="password"
        value={confirmPassword}
        onChange={(e) => {
          setConfirmPassword(e.target.value);
          setConfirmPasswordError(e.target.value !== password ? 'As senhas não coincidem.' : null); // Valida no onChange
        }}
        placeholder="Confirme sua senha"
        error={confirmPasswordError}
      />

      <button type="submit" className="form-button">Cadastrar</button>
      
      <p className="form-link-text">
        Já tem uma conta? <Link to="/login">Faça login aqui</Link>
      </p>
    </form>
  );
};