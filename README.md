# THF Angular Sample
Aplicação desenvolvida em [THF (Totvs HTML Framework)](https://thf.totvs.com.br/home) contendo exemplos de templaste definidos pelo time de UX da TOTVS, podendo assim conferir na prática o uso de componentes **THF**.

> Os templates podem sofrer atualizações conforme forem alterados pelo time de UX! 

## Getting Started
Essas instruções farão com que você tenha uma cópia do projeto em execução na sua máquina para fins de desenvolvimento e teste.

### Installing
A simulação de serviço REST é realizada com [JSON Server](https://github.com/typicode/json-server). Ele é um projeto simples que ajuda você a configurar uma API REST com operações CRUD muito rapidamente.á O JSON Server está pré-configurado no projeto para atender a padronagem de API's TOTVS e será instalado juntamente com os demais pacotes necessários. Basta rodar na pasta raiz do projeto:

```
$ npm install
```

No arquivo `db.json` contém os dados que devem ser expostos pela API REST.

Vamos iniciar o servidor JSON Server. Abra uma nova linha de comando e execute:

```
$ node server
```

Agora podemos abrir `http://localhost:3000/` no navegador e obteremos o resultado.

### A aplicação

Esta aplicação já contém o escopo básico/inicial de um projeto. Execute o seguinte comando para subi-lá em um servidor local, dispobilizado pelas depedências do Angular CLI:

```
ng serve
```

Por padrão Angular, a aplicação roda na porta: `http://localhost:4200`.