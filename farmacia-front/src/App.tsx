import { useEffect, useState } from 'react'
import './App.css'
import Login from './pages/Login'

function App() {
  const [usuarioLogado, setUsuarioLogado] = useState(false)
  const [perfilUsuario, setPerfilUsuario] = useState('')
  const [paginaAtual, setPaginaAtual] = useState('dashboard')
  const [receitas, setReceitas] = useState<any[]>([])
  const [medicamentos, setMedicamentos] = useState<any[]>([])
  const [funcionarios, setFuncionarios] = useState([
    {
      id: 1,
      nome: 'João Pereira',
      email: 'medico@hospital.com',
      cargo: 'Médico'
    },
    {
      id: 2,
      nome: 'Maria Souza',
      email: 'farmaceutico@hospital.com',
      cargo: 'Farmacêutico'
    },
    {
      id: 3,
      nome: 'Carlos Lima',
      email: 'enfermeiro@hospital.com',
      cargo: 'Enfermeiro'
    },
    {
      id: 4,
      nome: 'Administrador',
      email: 'admin@hospital.com',
      cargo: 'Administrador'
    }
  ])
  const [mostrarFormularioMedicamento, setMostrarFormularioMedicamento] = useState(false)
  const [nomeMedicamento, setNomeMedicamento] = useState('')
  const [dosagemMedicamento, setDosagemMedicamento] = useState('')
  const [formaFarmaceutica, setFormaFarmaceutica] = useState('')
  const [quantidadeEstoque, setQuantidadeEstoque] = useState('')
  const [mostrarFormularioFuncionario, setMostrarFormularioFuncionario] = useState(false)
  const [nomeFuncionario, setNomeFuncionario] = useState('')
  const [emailFuncionario, setEmailFuncionario] = useState('')
  const [senhaFuncionario, setSenhaFuncionario] = useState('')
  const [cargoFuncionario, setCargoFuncionario] = useState('')
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [nomePaciente, setNomePaciente] = useState('')
  const [nomeMedico, setNomeMedico] = useState('')
  const [medicamento, setMedicamento] = useState('')
  const [dosagem, setDosagem] = useState('')
  const [quantidade, setQuantidade] = useState('')
  const [observacoes, setObservacoes] = useState('')

  useEffect(() => {
    fetch('http://localhost:8080/receitas')
      .then((response) => response.json())
      .then((data) => {
        setReceitas(data)
      })
      .catch((error) => {
        console.error('Erro ao buscar receitas:', error)
      })

    fetch('http://localhost:8080/medicamentos')
      .then((response) => response.json())
      .then((data) => {
        setMedicamentos(data)
      })
      .catch((error) => {
        console.error('Erro ao buscar medicamentos:', error)
      })
  }, [])

  async function criarReceita() {
    const novaReceita = {
      nomePaciente,
      nomeMedico,
      medicamento,
      dosagem,
      quantidade,
      observacoes
    }

    try {
      const response = await fetch('http://localhost:8080/receitas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novaReceita)
      })

      const receitaCriada = await response.json()

      setReceitas([...receitas, receitaCriada])

      setNomePaciente('')
      setNomeMedico('')
      setMedicamento('')
      setDosagem('')
      setQuantidade('')
      setObservacoes('')

      setMostrarFormulario(false)
    } catch (error) {
      console.error('Erro ao criar receita:', error)
    }
  }

  async function confirmarRetirada(id: number) {
    try {
      const response = await fetch(`http://localhost:8080/receitas/${id}/retirada`, {
        method: 'PUT'
      })

      const receitaAtualizada = await response.json()

      setReceitas(
        receitas.map((receita) =>
          receita.id === id ? receitaAtualizada : receita
        )
      )
    } catch (error) {
      console.error('Erro ao confirmar retirada:', error)
    }
  }

  async function criarMedicamento() {
    const novoMedicamento = {
      nome: nomeMedicamento,
      dosagem: dosagemMedicamento,
      formaFarmaceutica,
      quantidadeEstoque: Number(quantidadeEstoque)
    }

    try {
      const response = await fetch('http://localhost:8080/medicamentos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoMedicamento)
      })

      const medicamentoCriado = await response.json()

      setMedicamentos([...medicamentos, medicamentoCriado])

      setNomeMedicamento('')
      setDosagemMedicamento('')
      setFormaFarmaceutica('')
      setQuantidadeEstoque('')

      setMostrarFormularioMedicamento(false)
    } catch (error) {
      console.error('Erro ao criar medicamento:', error)
    }
  }

  function criarFuncionario() {
    const novoFuncionario = {
      id: funcionarios.length + 1,
      nome: nomeFuncionario,
      email: emailFuncionario,
      cargo: cargoFuncionario
    }

    setFuncionarios([...funcionarios, novoFuncionario])

    setNomeFuncionario('')
    setEmailFuncionario('')
    setSenhaFuncionario('')
    setCargoFuncionario('')

    setMostrarFormularioFuncionario(false)
  }

  if (!usuarioLogado) {
    return (
      <Login
        onLogin={(perfil) => {
          setPerfilUsuario(perfil)
          setUsuarioLogado(true)
        }}
      />
    )
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-icon">✚</div>

          <div className="logo-text">
            <span>Farma</span>
            <p>Hospitalar</p>
          </div>
        </div>

        <nav>
          <a
            className={paginaAtual === 'dashboard' ? 'active' : ''}
            onClick={() => setPaginaAtual('dashboard')}
          >
            Dashboard
          </a>

          {(perfilUsuario === 'medico' ||
            perfilUsuario === 'farmaceutico' ||
            perfilUsuario === 'administrador') && (
              <a
                className={paginaAtual === 'receitas' ? 'active' : ''}
                onClick={() => setPaginaAtual('receitas')}
              >
                Receitas
              </a>
            )}

          {(perfilUsuario === 'farmaceutico' ||
            perfilUsuario === 'administrador') && (
              <a
                className={paginaAtual === 'medicamentos' ? 'active' : ''}
                onClick={() => setPaginaAtual('medicamentos')}
              >
                Medicamentos
              </a>
            )}

          {(perfilUsuario === 'enfermeiro' ||
            perfilUsuario === 'administrador') && (
              <a
                className={paginaAtual === 'retirada' ? 'active' : ''}
                onClick={() => setPaginaAtual('retirada')}
              >
                Retirada
              </a>
            )}

          {perfilUsuario === 'administrador' && (
            <>
              <a
                className={paginaAtual === 'funcionarios' ? 'active' : ''}
                onClick={() => setPaginaAtual('funcionarios')}
              >
                Funcionários
              </a>

              <a
                className={paginaAtual === 'configuracoes' ? 'active' : ''}
                onClick={() => setPaginaAtual('configuracoes')}
              >
                Configurações
              </a>
            </>
          )}
        </nav>
      </aside>

      <main className="content">
        <div className="user-profile">
          Perfil logado: <strong>{perfilUsuario}</strong>
        </div>

        {paginaAtual === 'dashboard' && (
          <>
            <div className="page-header">
              <h1>Dashboard</h1>
              <p>Bem-vindo ao sistema de controle da farmácia hospitalar.</p>
            </div>

            <div className="cards">
              <div className="card">
                <span>Receitas criadas</span>
                <strong>{receitas.length}</strong>
                <p>Hoje</p>
              </div>

              <div className="card">
                <span>Medicamentos cadastrados</span>
                <strong>{medicamentos.length}</strong>
                <p>No estoque</p>
              </div>

              <div className="card">
                <span>Retiradas realizadas</span>
                <strong>
                  {
                    receitas.filter(
                      (receita) => receita.status === 'RETIRADA'
                    ).length
                  }
                </strong>
                <p>Hoje</p>
              </div>

              <div className="card">
                <span>Estoque baixo</span>
                <strong>
                  {
                    medicamentos.filter(
                      (medicamento) => medicamento.quantidadeEstoque < 20
                    ).length
                  }
                </strong>
                <p>Itens em alerta</p>
              </div>
            </div>

            <section className="dashboard-section">
              <div className="section-header">
                <h2>Receitas recentes</h2>
                <span>Ver todas</span>
              </div>

              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Paciente</th>
                    <th>Médico</th>
                    <th>Status</th>
                    <th>Data</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>#5</td>
                    <td>Ana Carolina</td>
                    <td>Dra. Mariana Souza</td>
                    <td>
                      <span className="status criada">CRIADA</span>
                    </td>
                    <td>21/05/2026</td>
                  </tr>

                  <tr>
                    <td>#4</td>
                    <td>Maria Silva</td>
                    <td>Dr. João Pereira</td>
                    <td>
                      <span className="status retirada">RETIRADA</span>
                    </td>
                    <td>21/05/2026</td>
                  </tr>
                </tbody>
              </table>
            </section>
          </>
        )}

        {paginaAtual === 'receitas' && (
          <>
            <div className="page-header">
              <h1>Receitas</h1>
              <p>Controle de receitas médicas do hospital.</p>
            </div>

            <section className="dashboard-section">
              <div className="section-header">
                <h2>Receitas cadastradas</h2>

                {(perfilUsuario === 'medico' ||
                  perfilUsuario === 'administrador') && (
                    <button
                      className="new-button"
                      onClick={() => setMostrarFormulario(true)}
                    >
                      Nova Receita
                    </button>
                  )}
              </div>

              {mostrarFormulario && (
                <div className="form-container">

                  <input
                    type="text"
                    placeholder="Nome do paciente"
                    value={nomePaciente}
                    onChange={(e) => setNomePaciente(e.target.value)}
                  />

                  <input
                    type="text"
                    placeholder="Nome do médico"
                    value={nomeMedico}
                    onChange={(e) => setNomeMedico(e.target.value)}
                  />

                  <input
                    type="text"
                    list="medicamentos-list"
                    placeholder="Medicamento"
                    value={medicamento}
                    onChange={(e) => setMedicamento(e.target.value)}
                  />

                  <datalist id="medicamentos-list">
                    {medicamentos.map((med) => (
                      <option
                        key={med.id}
                        value={med.nome}
                      />
                    ))}
                  </datalist>

                  <input
                    type="text"
                    placeholder="Dosagem"
                    value={dosagem}
                    onChange={(e) => setDosagem(e.target.value)}
                  />

                  <input
                    type="number"
                    placeholder="Quantidade"
                    value={quantidade}
                    onChange={(e) => setQuantidade(e.target.value)}
                  />

                  <input
                    type="text"
                    placeholder="Observações"
                    value={observacoes}
                    onChange={(e) => setObservacoes(e.target.value)}
                  />

                  <button
                    className="new-button"
                    onClick={criarReceita}
                  >
                    Salvar Receita
                  </button>

                </div>
              )}

              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Paciente</th>
                    <th>Médico</th>
                    <th>Medicamento</th>
                    <th>Dosagem</th>
                    <th>Qtd.</th>
                    <th>Status</th>
                    <th>Data</th>
                  </tr>
                </thead>

                <tbody>
                  {[...receitas]
                    .sort((a, b) => {

                      if (a.status === 'CRIADA' && b.status === 'RETIRADA') {
                        return -1
                      }

                      if (a.status === 'RETIRADA' && b.status === 'CRIADA') {
                        return 1
                      }

                      return b.id - a.id
                    })
                    .map((receita) => (
                      <tr key={receita.id}>
                        <td>#{receita.id}</td>
                        <td>{receita.nomePaciente}</td>
                        <td>{receita.nomeMedico}</td>
                        <td>{receita.medicamento}</td>
                        <td>{receita.dosagem}</td>
                        <td>{receita.quantidade}</td>
                        <td>
                          <span
                            className={
                              receita.status === 'RETIRADA'
                                ? 'status retirada'
                                : 'status criada'
                            }
                          >
                            {receita.status}
                          </span>
                        </td>

                        <td>
                          {new Date(receita.dataCriacao).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </section>
          </>
        )}

        {paginaAtual === 'medicamentos' && (
          <>
            <div className="page-header">
              <h1>Medicamentos</h1>
              <p>Controle de medicamentos cadastrados no estoque.</p>
            </div>

            <section className="dashboard-section">
              <div className="section-header">
                <h2>Estoque de medicamentos</h2>

                <button
                  className="new-button"
                  onClick={() => setMostrarFormularioMedicamento(true)}
                >
                  Novo Medicamento
                </button>
              </div>

              {mostrarFormularioMedicamento && (
                <div className="form-container">
                  <input
                    type="text"
                    placeholder="Nome do medicamento"
                    value={nomeMedicamento}
                    onChange={(e) => setNomeMedicamento(e.target.value)}
                  />

                  <input
                    type="text"
                    placeholder="Dosagem"
                    value={dosagemMedicamento}
                    onChange={(e) => setDosagemMedicamento(e.target.value)}
                  />

                  <input
                    type="text"
                    placeholder="Forma farmacêutica"
                    value={formaFarmaceutica}
                    onChange={(e) => setFormaFarmaceutica(e.target.value)}
                  />

                  <input
                    type="number"
                    placeholder="Quantidade em estoque"
                    value={quantidadeEstoque}
                    onChange={(e) => setQuantidadeEstoque(e.target.value)}
                  />

                  <button
                    className="new-button"
                    onClick={criarMedicamento}
                  >
                    Salvar Medicamento
                  </button>
                </div>
              )}

              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Dosagem</th>
                    <th>Forma farmacêutica</th>
                    <th>Quantidade</th>
                  </tr>
                </thead>

                <tbody>
                  {medicamentos.map((medicamento) => (
                    <tr key={medicamento.id}>
                      <td>#{medicamento.id}</td>
                      <td>{medicamento.nome}</td>
                      <td>{medicamento.dosagem}</td>
                      <td>{medicamento.formaFarmaceutica}</td>
                      <td>{medicamento.quantidadeEstoque}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </>
        )}

        {paginaAtual === 'retirada' && (
          <>
            <div className="page-header">
              <h1>Retirada</h1>
              <p>Confirmação de retirada de medicamentos pela enfermagem.</p>
            </div>

            <section className="dashboard-section">
              <div className="section-header">
                <h2>Receitas disponíveis para retirada</h2>
              </div>

              <table className="table">
                <thead>
                  <tr>
                    <th>ID Receita</th>
                    <th>Paciente</th>
                    <th>Medicamento</th>
                    <th>Dosagem</th>
                    <th>Qtd.</th>
                    <th>Status</th>
                    <th>Ação</th>
                  </tr>
                </thead>

                <tbody>
                  {receitas
                    .filter((receita) => receita.status !== 'RETIRADA')
                    .map((receita) => (
                      <tr key={receita.id}>
                        <td>#{receita.id}</td>
                        <td>{receita.nomePaciente}</td>
                        <td>{receita.medicamento}</td>
                        <td>{receita.dosagem}</td>
                        <td>{receita.quantidade}</td>
                        <td>
                          <span className="status criada">
                            {receita.status}
                          </span>
                        </td>
                        <td>
                          <button
                            className="new-button"
                            onClick={() => confirmarRetirada(receita.id)}
                          >
                            Confirmar retirada
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </section>
          </>
        )}

        {paginaAtual === 'funcionarios' && (
          <>
            <div className="page-header">
              <h1>Funcionários</h1>
              <p>Gerenciamento de usuários do sistema hospitalar.</p>
            </div>

            <section className="dashboard-section">
              <div className="section-header">
                <h2>Funcionários cadastrados</h2>

                <button
                  className="new-button"
                  onClick={() => setMostrarFormularioFuncionario(true)}
                >
                  Novo Funcionário
                </button>
              </div>

              {mostrarFormularioFuncionario && (
                <div className="form-container">
                  <input
                    type="text"
                    placeholder="Nome"
                    value={nomeFuncionario}
                    onChange={(e) => setNomeFuncionario(e.target.value)}
                  />

                  <input
                    type="email"
                    placeholder="E-mail"
                    value={emailFuncionario}
                    onChange={(e) => setEmailFuncionario(e.target.value)}
                  />

                  <input
                    type="password"
                    placeholder="Senha"
                    value={senhaFuncionario}
                    onChange={(e) => setSenhaFuncionario(e.target.value)}
                  />

                  <select
                    value={cargoFuncionario}
                    onChange={(e) => setCargoFuncionario(e.target.value)}
                  >
                    <option value="">Selecione o cargo</option>
                    <option value="Médico">Médico</option>
                    <option value="Farmacêutico">Farmacêutico</option>
                    <option value="Enfermeiro">Enfermeiro</option>
                    <option value="Administrador">Administrador</option>
                  </select>

                  <button
                    className="new-button"
                    onClick={criarFuncionario}
                  >
                    Salvar Funcionário
                  </button>
                </div>
              )}

              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Cargo</th>
                  </tr>
                </thead>

                <tbody>
                  {funcionarios.map((funcionario) => (
                    <tr key={funcionario.id}>
                      <td>#{funcionario.id}</td>
                      <td>{funcionario.nome}</td>
                      <td>{funcionario.email}</td>
                      <td>{funcionario.cargo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </>
        )}

        {paginaAtual === 'configuracoes' && (
          <>
            <div className="page-header">
              <h1>Configurações</h1>
              <p>Gerenciamento de preferências e informações do sistema.</p>
            </div>

            <section className="dashboard-section">
              <div className="section-header">
                <h2>Configurações do sistema</h2>
              </div>

              <div className="settings-list">

                <div className="settings-item">
                  <div>
                    <h3>Dados do sistema</h3>
                    <p>Farmácia Hospitalar</p>
                  </div>
                </div>

                <div className="settings-item">
                  <div>
                    <h3>Limite de estoque baixo</h3>
                    <p>20 unidades</p>
                  </div>
                </div>

                <div className="settings-item">
                  <div>
                    <h3>Notificações</h3>
                    <p>Alertas de receitas e estoque ativados</p>
                  </div>
                </div>

                <div className="settings-item">
                  <div>
                    <h3>Segurança</h3>
                    <p>Acesso controlado por perfil de usuário</p>
                  </div>
                </div>

              </div>

              <button
                className="logout-button"
                onClick={() => {
                  setUsuarioLogado(false)
                  setPerfilUsuario('')
                  setPaginaAtual('dashboard')
                }}
              >
                Sair do sistema
              </button>
            </section>
          </>
        )}
      </main>
    </div>
  )
}

export default App