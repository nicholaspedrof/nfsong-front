import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "@/styles/styles.css";

const USERS_KEY = "nfsong_users";
const SESSION_KEY = "nfsong_session";

const SESSION_DURATION = 1000 * 60 * 60 * 2;

export function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    senha: ""
  });

  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function getUsers() {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  }

  async function handleSubmit() {
    setErro("");

    const email = form.email.trim().toLowerCase();
    const senha = form.senha;

    if (!email || !senha) {
      setErro("Preencha todos os campos.");
      return;
    }

    setCarregando(true);

    try {
      const users = getUsers();

      const user = users.find(
        (u) => u.email === email && u.senha === senha
      );

      if (!user) {
        setErro("Email ou senha inválidos.");
        return;
      }

      const session = {
        user: {
          id: user.id,
          nome: user.nome,
          email: user.email,
          dataNascimento: user.dataNascimento
        },
        expiresAt: Date.now() + SESSION_DURATION
      };

      localStorage.setItem(SESSION_KEY, JSON.stringify(session));

      navigate("/");
    } catch {
      setErro("Erro ao entrar. Tente novamente.");
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
          <p>Sua música mais perto de você</p>
        </div>
      </div>

      <div className="auth-form-side">
        <div className="auth-card">
          <h1 className="auth-title">
            Entre na <span>rede</span>
          </h1>
          <p className="auth-subtitle">acesse sua conta</p>
          <div className="auth-divider" />

          {erro && <p className="auth-erro">{erro}</p>}

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
              >
                {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            className="auth-btn"
            onClick={handleSubmit}
            disabled={carregando}
          >
            {carregando ? "Conectando..." : "Entrar"}
          </button>

          <p className="auth-redirect">
            Não tem conta?{" "}
            <Link to="/register" className="auth-link">
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>

    </div>
  );
}