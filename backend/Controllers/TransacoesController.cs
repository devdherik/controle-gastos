using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("transacoes")]
public class TransacoesController : ControllerBase
{
    private readonly AppDbContext _context;

    public TransacoesController(AppDbContext context)
    {
        _context = context;
    }

    //metodos:

    [HttpPost]
    public async Task<ActionResult<Transacao>> CriarTransacao([FromBody] Transacao transacao)
    {
        //aqui eu busco a pessoa antes de dar continuidade à criação da transação pq eu preciso da idade pra fazer a validação da regra do menor de idade
        var pessoa = await _context.Pessoas.FindAsync(transacao.PessoaId);

        if (pessoa == null)
        {
            return NotFound(new { mensagem = "Pessoa não encontrada." });
        }

        //aqui é a regra que o problema exige
        if (pessoa.Idade < 18 && transacao.Tipo == TipoTransacao.Receita)
        {
            return BadRequest( new { mensagem = "Pessoas menores de idade só podem cadastrar despesas."} );
        }

        _context.Transacoes.Add(transacao);

        await _context.SaveChangesAsync();

        
        return Ok(transacao);

    }

    [HttpGet]
    public async Task<ActionResult<List<Transacao>>> ListarTransacoes()
    {
        var transacoes = await _context.Transacoes.ToListAsync();

        return Ok(transacoes);
    }
}
