
// aqui ele diz tipo: vou usar as classes que estão nesses lugares
// traz as ferramentas do entity framework
using Microsoft.EntityFrameworkCore;
// permite usar as classes que criei em models (pessoa, trasacao...)
using backend.Models;

namespace backend.Data;

// ':' é como se significasse herança: AppDbContext é um tipo de DbContext. DbContext é uma classe pronta do entity framework
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
        
    }

    // liga as classes ao banco, ele entende que precisa criar as tabelas, e quando ele ver la na classe 'Pessoa' ele ja vai criar  com id, nome e idade
    public DbSet<Pessoa> Pessoas { get; set; }

    public DbSet<Transacao> Transacoes { get; set; }

}