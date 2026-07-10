# CONTROLE DE GASTOS
Sistema desenvolvido para gerenciamento de pessoas e de suas transações financeiras, permitindo o cadastro de receitas e despesas, aplicação de regras de negócio e persistência dos dados em banco de dados SQLite.

![.NET](https://img.shields.io/badge/.NET-purple)
![C#](https://img.shields.io/badge/C%23-Backend-green)
![React](https://img.shields.io/badge/React-Frontend-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6)
![SQLite](https://img.shields.io/badge/SQLite-Database-lightblue)

## ✨ Funcionalidades:
Esse repositório se trata de um sistema de controle de gastos que tem as seguintes funcionalidades:
- Cadastrar pessoas (Nome, Idade);
- Deletar pessoas;
- Listar pessoas;
- Cadastrar transações (Despesas e Receitas [Contendo: Descrição, Pessoa e Valor]);
- Listar transações (específicas ou gerais).

## 📋 Regras de Negócio:
Existem duas regras principais: A primeira é que pessoas menores de idade podem apenas cadastrar despesas e a segunda é que se deletar uma pessoa, todas as suas transações também serão deletadas.

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Finalidade |
|------------|------------|
| C# | Linguagem do Back-end |
| ASP.NET Core | Desenvolvimento da API |
| Entity Framework Core | ORM |
| SQLite | Banco de dados |
| React | Interface do usuário |
| TypeScript | Desenvolvimento do Front-end |


## 🚀 Como Executar
Por dois terminais de comando, entre nas seguintes pastas, cada terminal em pasta e rode os comandos a seguir:
### Backend
```bash
cd backend
dotnet restore
dotnet ef database update
dotnet run
```
### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 🔮 Melhorias Futuras

Algumas funcionalidades que podem ser adicionadas em versões futuras do sistema:

- [ ] Sistema de autenticação e login de usuários.
- [ ] Dashboard com gráficos de receitas, despesas e saldo.
- [ ] Filtros por período (dia, mês e ano).
- [ ] Pesquisa de pessoas e transações por nome ou descrição.
- [ ] Edição de pessoas e transações.
- [ ] Categorias para as transações (Alimentação, Transporte, Lazer, etc.).
- [ ] Exportação de relatórios em PDF e Excel.
- [ ] Paginação nas listagens.
- [ ] Upload de foto de perfil para cada pessoa.
- [ ] Tema claro e escuro (Light/Dark Mode).


## Autor e comentários

### 💭 Comentários:
Esse foi um projeto muito desafiador pois o contato que tive com as tecnologias utilizadas havia sido muito raso até então. No entanto, apesar da pressão e do limite de tempo, acredito que aprimorei muito as minhas habilidades. Ao decorrer do desenvolvimento do projeto, fui aprendendo de forma aprofundada as funcionalidades e tecnologias. Consegui assimilar o a criação da plataforma com uma rotina de estudos fora do meio e fui capaz de entregar um resultado que me satisfez demais.
Utilizei da inteligência Artificial (Claude [Plano Free] e Chat GPT [Free]) como tutora no andamento da criação, como consultora de bugs e erros que tive que ir ajustando no caminho e como conselheira do que fazer. Todas as linhas de código foram escritras estritamentes por mim, exceto nos arquivos que ja vinham preenchidos por padrão pelos Frameworks, como o arquivo 'Program.cs'. Nestes, só tive de ajustar algumas coisas, mas já vinham estruturados. 

### Autor:
Desenvolvido por **Dherik Domingos**
