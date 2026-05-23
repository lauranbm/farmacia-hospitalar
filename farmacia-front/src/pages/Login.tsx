import { useState } from 'react'

type LoginProps = {
  onLogin: (perfil: string) => void
}

const usuariosCadastrados = [
  {
    email: 'medico@hospital.com',
    senha: '123',
    perfil: 'medico'
  },
  {
    email: 'farmaceutico@hospital.com',
    senha: '123',
    perfil: 'farmaceutico'
  },
  {
    email: 'enfermeiro@hospital.com',
    senha: '123',
    perfil: 'enfermeiro'
  },
  {
    email: 'admin@hospital.com',
    senha: '123',
    perfil: 'administrador'
  }
]

function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [perfil, setPerfil] = useState('')

  function entrar() {
    if (!email || !senha || !perfil) {
      alert('Preencha e-mail, senha e perfil.')
      return
    }

    const usuarioEncontrado = usuariosCadastrados.find(
      (usuario) =>
        usuario.email === email &&
        usuario.senha === senha &&
        usuario.perfil === perfil
    )

    if (!usuarioEncontrado) {
      alert('E-mail, senha ou perfil inválido.')
      return
    }

    onLogin(perfil)
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-form">
          <div className="login-logo">
            <div className="login-logo-icon">✚</div>
            <div>
              <h1>Farma</h1>
              <span>Hospitalar</span>
            </div>
          </div>

          <h2>Bem-vindo de volta!</h2>

          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <select value={perfil} onChange={(e) => setPerfil(e.target.value)}>
            <option value="">Selecione o perfil</option>
            <option value="medico">Médico</option>
            <option value="farmaceutico">Farmacêutico</option>
            <option value="enfermeiro">Enfermeiro</option>
            <option value="administrador">Administrador</option>
          </select>

          <button onClick={entrar}>
            Entrar
          </button>

          <div className="login-options">
            <label>
              <input type="checkbox" />
              Lembrar-me
            </label>

            <a>Esqueceu a senha?</a>
          </div>
        </div>

        <div className="login-illustration">
          <div className="illustration-circle">💊</div>
          <h3>Controle seguro de receitas e medicamentos</h3>
          <p>Gerencie prescrições, retiradas e estoque hospitalar em um só lugar.</p>
        </div>
      </div>
    </div>
  )
}

export default Login