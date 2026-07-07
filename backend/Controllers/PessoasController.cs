using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Controllers;


//o apicontroller faz o asp.net validar automaticamente os data annotations, como os do 'pessoas.cs'
[ApiController]
[Route("pessoas")]

// controllerbase é uma classe pronta do asp.net, e aqui, estamos dizendo que pessoacontroller é um tipo especial de controller base. ':' indica herança
public class PessoasController : ControllerBase
{
    //campo
    private readonly AppDbContext _context;

    //construtor
    // injeção de dependencia
    public PessoasController(AppDbContext context)
    {
        _context = context;
    }


    //métodos:

    [HttpGet]
    public async Task<ActionResult<List<Pessoa>>> ListarPessoas()
    {
        var pessoas = await _context.Pessoas.ToListAsync();

        return Ok(pessoas);
    }

    [HttpPost]
    //aqui eu já nao usei o '<list pessoas> pois não estou devolvendo uma lista, estou enviando apenas uma pessoa, ja que estou cadastrando apenas uma pessoa com (POST)
    public async Task<ActionResult<Pessoa>> CriarPessoa([FromBody] Pessoa pessoa)
    {
        _context.Pessoas.Add(pessoa);


        //aqui, depois dessa linha, o entityframework atualiza o objeto automaticamente, ou seja, atualiza o id.
        await _context.SaveChangesAsync();


        //aqui, nao usei o Ok() pq quando crio um recurso novo, tipo esse de retornar alguem, o ideal não é voltar um OK 200, e sim um '201 Created'. 
        return CreatedAtAction(
            nameof(ListarPessoas),
            new { id = pessoa.Id },
            pessoa);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> ExcluirPessoa(int id)
    {
        var pessoa = await _context.Pessoas.FindAsync(id);

        if (pessoa == null)
        {
            return NotFound();
        }

        _context.Pessoas.Remove(pessoa);

        await _context.SaveChangesAsync();

        return NoContent();
    }

}

