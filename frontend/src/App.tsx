import React, { useEffect, useState } from "react"
import type { Pessoa } from "./types/Pessoa"
import { listarPessoas, criarPessoa, deletarPessoa } from "./services/api"


function App() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([])
  const [nome, setNome] = useState("")
  const [idade, setIdade] = useState("")


  //permite chamar a função em outros momentos, não so quando a tela é recarragada (juntando com o useeffect)
  function carregarPessoas() {
    listarPessoas().then((dados) => setPessoas(dados))
  }

  function handleSubmitPessoa(evento: React.SubmitEvent) {
    evento.preventDefault()

    criarPessoa({ nome, idade: Number(idade)}).then(() => {
      setNome("")
      setIdade("")
      carregarPessoas()
    })
  }

  function handleDeletarPessoa(id: number) {
    deletarPessoa(id).then(() => {
      carregarPessoas()
    })
  }



  useEffect(() => {
    carregarPessoas()
  }, [])

  return (
    <div>
      <h1>Controle de Gastos Resienciais</h1>

      {/* aqui ele chama a função que criei acima */}
      <form onSubmit={handleSubmitPessoa}>
        <input
        type="text"
        placeholder="Nome"
        value={nome} 
        onChange={(e) => setNome(e.target.value)}
        />
        <input
        type="number"
        placeholder="Idade"
        value={idade}
        onChange={(e) => setIdade(e.target.value)}
        />
        <button type="submit">Cadastrar Pessoa</button>
      </form> 

      <ul>
        {pessoas.map((pessoa) => (
          <li key={pessoa.id}>
            {pessoa.nome} - {pessoa.idade} anos 
            <button onClick={() => handleDeletarPessoa(pessoa.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App