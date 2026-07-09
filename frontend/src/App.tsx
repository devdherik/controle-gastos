import { useEffect, useState } from "react"
import type { Pessoa } from "./types/Pessoa"
import { listarPessoas } from "./services/api"


function App() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([])

  useEffect(() => {
    listarPessoas().then((dados) => setPessoas(dados))
  }, [])

  return (
    <div>
      <h1>Controle de Gastos Resienciais</h1>
      <ul>
        {pessoas.map((pessoa) => (
          <li key={pessoa.id}>
            {pessoa.nome} - {pessoa.idade} anos 
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App