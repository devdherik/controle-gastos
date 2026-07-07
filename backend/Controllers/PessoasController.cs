using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Controllers;

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


    //método
    [HttpGet]
    public async Task<ActionResult<List<Pessoa>>> ListarPessoas()
    {
        var pessoas = await _context.Pessoas.ToListAsync();

        return Ok(pessoas);
    }

}

