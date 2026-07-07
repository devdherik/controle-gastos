using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class Transacao
{
    public int Id { get; set; }

    [Required(ErrorMessage ="A descrição é obrigatória.")]
    [StringLength(200, ErrorMessage ="A descrição pode ter no máximo 200 caracteres.")]
    public string Descricao { get; set; } = string.Empty;

    [Range(0.01, double.MaxValue, ErrorMessage = "O valor deve ser maior que zero.")]
    public decimal Valor { get; set; }

    //esse 'TipoTransacao' é o enum do arquivo 'TipoTransacao.cs'. ele faz com que so tenha duas possiveis respostas para o tipo da transaçao: receita e despesa
    public TipoTransacao Tipo { get; set; }

    public int PessoaId { get; set; }

    // propriedade de navegação: permite fazer coisas como 'transacao.Pessoa.Nome', mesmo que a tabela tenha apenas o PessoaId
    public Pessoa? Pessoa { get; set; }
}