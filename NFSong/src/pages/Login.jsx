import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "@/styles/styles.css";

export function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", senha: "" });
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit() {
    setErro("");
    if (!form.email || !form.senha) { setErro("Preencha todos os campos."); return; }
    setCarregando(true);
    try {
      // const data = await login(form.email, form.senha);
      // localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err) {
      setErro("Email ou senha inválidos.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="auth-page">

      {/* Lado esquerdo — imagem sunset estilo Netflix */}
      <div className="auth-visual">
        <div className="auth-visual-img" />
        <div className="auth-visual-fade" />
        <div className="auth-visual-fade-bottom" />
        <div className="auth-visual-text">
          <h2>NFSong</h2>
          <p>Sua música mais perto de você</p>
        </div>
      </div>

      {/* Lado direito — formulário */}
      <div className="auth-form-side">
        <div className="auth-card">
          <h1 className="auth-title">Entre na <span>rede</span></h1>
          <p className="auth-subtitle">acesse sua conta</p>
          <div className="auth-divider" />

          {erro && <p className="auth-erro">{erro}</p>}

          <div className="auth-field">
            <label className="auth-label">Email</label>
            <input className="auth-input" type="email" name="email"
              placeholder="seu@email.com" value={form.email} onChange={handleChange} />
          </div>

          <div className="auth-field">
            <label className="auth-label">Senha</label>
            <input className="auth-input" type="password" name="senha"
              placeholder="••••••••" value={form.senha} onChange={handleChange} />
          </div>

          <button className="auth-btn" onClick={handleSubmit} disabled={carregando}>
            {carregando ? "Conectando..." : "Entrar"}
          </button>

          <p className="auth-redirect">
            Não tem conta?{" "}
            <Link to="/Register" className="auth-link">Cadastre-se</Link>
          </p>
        </div>
      </div>

    </div>
  );
}