# Movie Finder

Aplicação web desenvolvida com Vue 3 que utiliza a API do The Movie Database (TMDB) para pesquisar filmes e exibir informações como pôster, avaliação, ano de lançamento e descrição.

## Tecnologias

- Vue 3
- Vite
- JavaScript
- API do The Movie Database (TMDB)

## Configuração

Instale as dependências:

```sh
npm install
```

Crie um arquivo `.env.local` na raiz do projeto, usando `.env.example` como referência:

```env
VITE_TMDB_API_KEY=sua_chave_da_tmdb
```

O arquivo `.env.local` não deve ser enviado ao GitHub.

## Executar o projeto

Inicie o servidor de desenvolvimento:

```sh
npm run dev
```

Depois, abra o endereço exibido no terminal, normalmente `http://localhost:5173`.

## Build de produção

```sh
npm run build
```
