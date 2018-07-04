# ThfCrud
Uma aplicação desenvolvida em [THF (Totvs HTML Framework)](https://thf.totvs.com.br/home) contendo um sample de cadastro de cliente.  

## Getting Started
Essas instruções farão com que você tenha uma cópia do projeto em execução na sua máquina local para fins de desenvolvimento e teste.

### Installing
A simulação de serviço REST é realizada com [JSON Server](https://github.com/typicode/json-server). Ele é um projeto simples que ajuda você a configurar uma API REST com operações CRUD muito rapidamente.
O JSON Server está disponível como um pacote NPM. A instalação pode ser feita usando o gerenciador de pacotes Node.js:

`$ npm install -g json-server`

No arquivo `db.json` contém os dados que devem ser expostos pela API REST.

Vamos iniciar o servidor JSON executando o seguinte comando:

`$ json-server --watch db.json`

Agora podemos abrir `http://localhost:3000/` no navegador e obteremos o resultado.

### A aplicação

Esta aplicação já contém o escopo básico/inicial de um projeto. Execute o seguinte comando para subi-lá em um servidor local, dispobilizado pelas depedências do Angular CLI:

`ng serve`

Por padrão, o comando acima utiliza o seguinte caminho: `http://localhost:4200`.