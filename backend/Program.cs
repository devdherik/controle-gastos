// permite usar a classe AppDbContext e as ferramentas do entity framework
using backend.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;


// cria um objeto chamado 'builder' que configura a aplicação web antes que ela seja construida e executada
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddControllers();


// agora AppDbContext é um serviço da aplicação
builder.Services.AddDbContext<AppDbContext>(options => 
    options.UseSqlite(
    builder.Configuration.GetConnectionString("DefaultConnection")));

//permite a comunicação entre o front e o back. permite que o front faça requisições para o back. chama-se CORS (cross origin resourse sharing)
builder.Services.AddCors(Options =>
{
        Options.AddPolicy("PermitirFrontend", policy =>
        {
           policy.WithOrigins("http:localhost:5173")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

var app = builder.Build();




//coisas habilitadas no processo de desenvolvimento
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();

    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("PermitirFrontend");

app.MapControllers();
app.Run();
