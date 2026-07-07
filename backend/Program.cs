// permite usar a classe AppDbContext e as ferramentas do entity framework
using backend.Data;
using Microsoft.EntityFrameworkCore;


// cria um objeto chamado 'builder' que configura a aplicação web antes que ela seja construida e executada
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();


builder.Services.AddControllers();


// agora AppDbContext é um serviço da aplicação
builder.Services.AddDbContext<AppDbContext>(options => 
    options.UseSqlite(
    builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.MapControllers();
app.Run();
