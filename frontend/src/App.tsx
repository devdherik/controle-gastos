import React, { useEffect, useState } from "react"
import type { Pessoa } from "./types/Pessoa"
import { listarPessoas, criarPessoa, deletarPessoa, listarTransacoes, criarTransacao } from "./services/api"
import  type { Transacao } from "./types/Transacao"
import { TipoTransacao } from "./types/Transacao"

function App() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([])
  const [nome, setNome] = useState("")
  const [idade, setIdade] = useState("")
  const [transacoes, setTransacoes] = useState<Transacao[]>([])
  const [descricao, setDescricao] = useState("")
  const [valor, setValor] = useState("")
  const [tipo, setTipo] = useState<TipoTransacao>(TipoTransacao.Despesa)
  const [pessoaId, setPessoaId] = useState("")


  //permite chamar a função em outros momentos, não so quando a tela é recarragada (juntando com o useeffect)
  function carregarPessoas() {
    listarPessoas().then((dados) => setPessoas(dados))
  }

  function carregarTransacoes() {
    listarTransacoes().then((dados) => setTransacoes(dados))
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

  function handleSubmitTransacao(evento: React.SubmitEvent) {
    evento.preventDefault()

    criarTransacao({
      descricao,
      valor: Number(valor),
      tipo,
      pessoaId: Number(pessoaId),
    }).then(() => {
      setDescricao("")
      setValor("")
      setPessoaId("")
      carregarTransacoes()
    })
  }





  useEffect(() => {
    carregarPessoas()
    carregarTransacoes()
  }, [])










  return (
    <div>
      <h1>Controle de Gastos Residenciais</h1>

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


      <form onSubmit={handleSubmitTransacao}>

        <input
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />

        <input
        type="number"
        placeholder="Valor"
        value={valor}
        onChange={(e => setValor(e.target.value))}
        />

        <select
        value={tipo}
        onChange={(e) => setTipo(Number(e.target.value) as TipoTransacao)}
        >
          <option value={TipoTransacao.Despesa}>Despesa</option>
          <option value={TipoTransacao.Receita}>Receita</option>
        </select>

        <select
        value={pessoaId}
        onChange={(e) => setPessoaId(e.target.value)}
        >
          <option value="">Selecione uma pessoa</option>
          {pessoas.map((pessoa) => (
            <option key={pessoa.id} value={pessoa.id}>
              {pessoa.nome}
            </option>
          ))}
        </select>
        <button type="submit">Cadastrar Transação</button>
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