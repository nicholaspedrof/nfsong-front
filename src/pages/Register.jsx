import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "@/styles/styles.css";

const USERS_KEY = "nfsong_users";

export function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmar: "",
    dataNascimento: ""
  });

  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function getUsers() {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  }

  function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  async function handleSubmit() {
    setErro("");

    const nome = form.nome.trim();
    const email = form.email.trim().toLowerCase();
    const senha = form.senha;
    const confirmar = form.confirmar;
    const dataNascimento = form.dataNascimento;

    if (!nome || !email || !senha || !confirmar || !dataNascimento) {
      setErro("Preencha todos os campos.");
      return;
    }

    if (senha !== confirmar) {
      setErro("As senhas não coincidem.");
      return;
    }

    if (senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setCarregando(true);

    try {
      const users = getUsers();

      const emailJaExiste = users.some((user) => user.email === email);

      if (emailJaExiste) {
        setErro("Este email já está cadastrado.");
        return;
      }

      const novoUsuario = {
        id: crypto.randomUUID(),
        nome,
        email,
        senha,
        dataNascimento,
        criadoEm: new Date().toISOString()
      };

      saveUsers([...users, novoUsuario]);

      navigate("/login");
    } catch (err) {
      setErro("Erro ao criar conta. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-visual">
        <div className="auth-visual-img" />
        <div className="auth-visual-fade" />
        <div className="auth-visual-fade-bottom" />
        <div className="auth-visual-text">
          <h2>NFSong</h2>
          <p>Junte-se à rede</p>
        </div>
      </div>

      <div className="auth-form-side">
        <div className="auth-card">
          <h1 className="auth-title">Criar <span>conta</span></h1>
          <p className="auth-subtitle">comece agora</p>
          <div className="auth-divider" />

          {erro && <p className="auth-erro">{erro}</p>}

          <div className="auth-field">
            <label className="auth-label">Nome</label>
            <input
              className="auth-input"
              type="text"
              name="nome"
              placeholder="Seu nome"
              value={form.nome}
              onChange={handleChange}
            />
          </div>

          <div className="auth-field">
            <label className="auth-label">Email</label>
            <input
              className="auth-input"
              type="email"
              name="email"
              placeholder="seu@email.com"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="auth-field">
            <label className="auth-label">Data de nascimento</label>
            <input
              className="auth-input"
              type="date"
              name="dataNascimento"
              value={form.dataNascimento}
              onChange={handleChange}
            />
          </div>

          <div className="auth-field">
            <label className="auth-label">Senha</label>

            <div className="input-password-wrapper">
              <input
                className="auth-input"
                type={mostrarSenha ? "text" : "password"}
                name="senha"
                placeholder="••••••••"
                value={form.senha}
                onChange={handleChange}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
              >
                {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="auth-field">
            <label className="auth-label">Confirmar senha</label>

            <div className="input-password-wrapper">
              <input
                className="auth-input"
                type={mostrarConfirmar ? "text" : "password"}
                name="confirmar"
                placeholder="••••••••"
                value={form.confirmar}
                onChange={handleChange}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setMostrarConfirmar(!mostrarConfirmar)}
                aria-label={mostrarConfirmar ? "Ocultar confirmação de senha" : "Mostrar confirmação de senha"}
              >
                {mostrarConfirmar ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            className="auth-btn"
            onClick={handleSubmit}
            disabled={carregando}
          >
            {carregando ? "Criando conta..." : "Cadastrar"}
          </button>

          <p className="auth-redirect">
            Já tem conta?{" "}
            <Link to="/login" className="auth-link">Entrar</Link>
          </p>
        </div>
      </div>
    </div>
  );
}