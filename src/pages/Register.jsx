import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "@/styles/styles.css";

export function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nome: "", email: "", senha: "", confirmar: "" });
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit() {
    setErro("");
    if (!form.nome || !form.email || !form.senha || !form.confirmar) { setErro("Preencha todos os campos."); return; }
    if (form.senha !== form.confirmar) { setErro("As senhas não coincidem."); return; }
    if (form.senha.length < 6) { setErro("A senha deve ter pelo menos 6 caracteres."); return; }
    setCarregando(true);
    try {
      // await cadastrar(form.nome, form.email, form.senha);
      navigate("/login");
    } catch (err) {
      setErro("Erro ao criar conta. Tente novamente.");
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
          <p>Junte-se à rede</p>
        </div>
      </div>

      {/* Lado direito — formulário */}
      <div className="auth-form-side">
        <div className="auth-card">
          <h1 className="auth-title">Criar <span>conta</span></h1>
          <p className="auth-subtitle">comece agora</p>
          <div className="auth-divider" />

          {erro && <p className="auth-erro">{erro}</p>}

          <div className="auth-field">
            <label className="auth-label">Nome</label>
            <input className="auth-input" type="text" name="nome"
              placeholder="Seu nome" value={form.nome} onChange={handleChange} />
          </div>

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

          <div className="auth-field">
            <label className="auth-label">Confirmar senha</label>
            <input className="auth-input" type="password" name="confirmar"
              placeholder="••••••••" value={form.confirmar} onChange={handleChange} />
          </div>

          <button className="auth-btn" onClick={handleSubmit} disabled={carregando}>
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