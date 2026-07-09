import type { Pessoa } from "../types/Pessoa"
import type { Transacao } from "../types/Transacao"
import type { RelatorioTotais } from "../types/Relatorio"

const API_URL = "http://localhost:5245"

//METODOS PARA PESSOAS 
//get
export async function listarPessoas(): Promise<Pessoa[]> {
    const resposta = await fetch(`${API_URL}/pessoas`)
    const dados = await resposta.json()
    return dados
}


//post
export async function criarPessoa(pessoa: Omit<Pessoa, "id">): Promise<Pessoa> {
    const resposta = await fetch (`${API_URL}/pessoa`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(pessoa),
    })
    const dados = await resposta.json()
    return dados
}


//delete
export async function deletarPessoa(id: number): Promise<void> {
    await fetch(`${API_URL}/pessoas/${id}`, {
        method: "DELETE",
    })
}

//METODOS PARA TRANSAÇÕES
//get
export async function listarTransacoes(): Promise<Transacao[]> {
    const resposta = await fetch(`${API_URL}/transacoes`)
    const dados = await resposta.json()
    return dados
}

//post
export async function criarTransacao(transacao: Omit<Transacao, "id">): Promise<Transacao> {
    const resposta = await fetch(`${API_URL}/transacoes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(transacao),
    })
    const dados = await resposta.json()
    return dados
}


//METODOS PARA RELATORIOS
//get
export async function consultarTotais(): Promise<RelatorioTotais> {
    const resposta = await fetch(`${API_URL}/pessoas/totais`)
    const dados = await resposta.json()
    return dados
}