export interface PessoaComTotais {
    id: number
    nome: string
    totalReceitas: number
    totalDespesas: number
    saldo: number
}

export interface RelatorioTotais {
    pessoas: PessoaComTotais[]
    totalGeral: {
        totalReceitas: number
        totalDespesas: number
        saldo: number
    }
}