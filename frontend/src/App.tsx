//arquivo que concentra a maioria das coisas e é o que aparece na tela do usuário

import "./App.css"
import React, { useEffect, useState } from "react"
import type { Pessoa } from "./types/Pessoa"
import { listarPessoas, criarPessoa, deletarPessoa, listarTransacoes, criarTransacao, consultarTotais } from "./services/api"
import  type { Transacao } from "./types/Transacao"
import { TipoTransacao } from "./types/Transacao"
import type { RelatorioTotais } from "./types/Relatorio"

function App() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([])
  const [nome, setNome] = useState("")
  const [idade, setIdade] = useState("")
  const [transacoes, setTransacoes] = useState<Transacao[]>([])
  const [descricao, setDescricao] = useState("")
  const [valor, setValor] = useState("")
  const [tipo, setTipo] = useState<TipoTransacao>(TipoTransacao.Despesa)
  const [pessoaId, setPessoaId] = useState("")
  const [erroTransacao, setErroTransacao] = useState("")
  // o | é uma união de objetos: objeto e null
  const [relatorio, setRelatorio] = useState<RelatorioTotais | null>(null)

  //permite chamar a função em outros momentos, não so quando a tela é recarragada (juntando com o useeffect)
  function carregarPessoas() {
    listarPessoas().then((dados) => setPessoas(dados))
  }

  function carregarTransacoes() {
    listarTransacoes().then((dados) => setTransacoes(dados))
  }





  function handleSubmitPessoa(evento: React.SubmitEvent) {
    evento.preventDefault()

    //esse .then limpa o formulario e carrega a pessoa criada sem precisar atualizar a pagina
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
    //pega o erro e manda a mensagem la do back-end
    .catch((erro) => {
      setErroTransacao(erro.message)
    })
  }

  function handleConsultarTotais() {
    consultarTotais().then((dados) => setRelatorio(dados))
  }





  useEffect(() => {
    carregarPessoas()
    carregarTransacoes()
  }, [])









  //aqui é o html dentro do typescript
  return (
    <div className="container">
      <h1 className="titulo">Controle de Gastos Residenciais</h1>

      {/* aqui ele chama a função que criei acima */}
      <form onSubmit={handleSubmitPessoa} className="card">
        <h2 className="subtitulo">Cadastro de Pessoas</h2>
        <input
        type="text"
        placeholder="Nome"
        value={nome} 
        onChange={(e) => setNome(e.target.value)}
        className="campo"
        />
        <input
        type="number"
        placeholder="Idade"
        value={idade}
        onChange={(e) => setIdade(e.target.value)}
        className="campo"
        />
        <button type="submit" className="botao-primario">Cadastrar Pessoa</button>
      </form> 


      <form onSubmit={handleSubmitTransacao} className="card">
        <h2 className="subtitulo">Cadastro de Transações</h2>
        <input
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="campo"
        />

        <input
        type="number"
        placeholder="Valor"
        value={valor}
        onChange={(e => setValor(e.target.value))}
        className="campo"
        />

        <select
        value={tipo}
        onChange={(e) => setTipo(Number(e.target.value) as TipoTransacao)}
        className="campo"
        >
          <option value={TipoTransacao.Despesa}>Despesa</option>
          <option value={TipoTransacao.Receita}>Receita</option>
        </select>

        <select
        value={pessoaId}
        onChange={(e) => setPessoaId(e.target.value)}
        className="campo"
        >
          <option value="">Selecione uma pessoa</option>
          {pessoas.map((pessoa) => (
            <option key={pessoa.id} value={pessoa.id}>
              {pessoa.nome}
            </option>
          ))}
        </select>
        {erroTransacao && <p className="erro">{erroTransacao}</p>}
        <button type="submit" className="botao-primario">Cadastrar Transação</button>
      </form>

      <h2 className="subtitulo">Pessoas</h2>
      <ul className="lista">
        {pessoas.map((pessoa) => (
          <li key={pessoa.id} className="item-lista">
            {pessoa.nome} - {pessoa.idade} anos 
            <button onClick={() => handleDeletarPessoa(pessoa.id)} className="botao-excluir">Excluir</button>
          </li>
        ))}
      </ul>

      
      <h2 className="subtitulo">Transações</h2>
      <ul className="lista">
        {transacoes.map((transacao) => {
          const pessoa = pessoas.find((p) => p.id === transacao.pessoaId)
          return (
            <li key={transacao.id} className="item-lista">
              {pessoa?.nome} | {transacao.descricao} - R$ {transacao.valor}
              <span className={transacao.tipo == TipoTransacao.Receita ? "tag-receita" : "tag-despesa"}>
                {transacao.tipo == TipoTransacao.Receita ? "Receita" : "Despesa"}
              </span>
            </li>
          )
        })}
      </ul>


      {/* chamar todas as transações e pessoas */}
        
      <button onClick={handleConsultarTotais} className="botao-primario">Calcular Totais</button>
        {relatorio && (
          <div className="card">
            <h2>Totais por pessoa</h2>
            <ul className="lista">
              {relatorio.pessoas.map((pessoa) =>
              <li key={pessoa.id} className="item-lista">
                {pessoa.nome} - Receitas: R$ {pessoa.totalReceitas} | Despesas: R$ {pessoa.totalDespesas} | Saldo: R$ {pessoa.saldo}
              </li>
              )}
            </ul>

            <h2>Total Geral</h2>
            <p>Receitas: R$ {relatorio.totalGeral.totalReceitas}</p>
            <p>Despesas: R$ {relatorio.totalGeral.totalDespesas}</p>
            <p>Saldo: R$ {relatorio.totalGeral.saldo}</p>

          </div>
        )}



    </div>
  )
}

export default App