# CONTROLE DE GASTOS (Resiendciais ou não)

Esse repositório se trata de um sistema de controle de gastos que tem as seguintes funcionalidades:
- Cadastrar pessoas (Nome, Idade);
- Deletar pessoas;
- Listar pessoas;
- Cadastrar transações (Despesas e Receitas [Contendo: Descrição, Pessoa e Valor]);
- Listar transações (específicas ou gerais).

Existem duas regras principais: A primeira é que pessoas menores de idade podem apenas cadastrar despesas. E a segunda é que se deletar uma pessoa, todas as suas transações também serão deletadas.
Tecnologias utilizadas: .NET com C# para o Back-End e React com TypeScritp para o Front-End. Também foi utilizado o Entity Framework Core para fazer as conexões entre as classes do C# e com o banco de dados, que traduzia tudo para SQlite.
