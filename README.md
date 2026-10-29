# Movie Finder

Aplicação web desenvolvida com Vue 3 que utiliza a API do The Movie Database (TMDB) para pesquisar filmes e apresentar informações como pôster, avaliação, ano de lançamento e descrição.

## Tecnologias

- Vue 3
- JavaScript
- Vite
- Vue Router
- Pinia
- API REST (The Movie Database)
- Vitest
- Vue Test Utils

## Funcionalidades

- Exibição de filmes populares.
- Busca de filmes pelo título.
- Visualização de pôsteres, avaliações, datas de lançamento e descrições.
- Modal para exibição dos detalhes do filme selecionado.
- Tratamento de estados de carregamento, erros e buscas sem resultados.
- Testes automatizados de componentes e funcionalidades da aplicação.

## Instalação

Clone o repositório:

```bash
git clone https://github.com/KaiqueBatista/Movie-Finder.git
cd Movie-Finder
```

Instale as dependências:

```bash
npm install
```

## Configuração da API

Crie uma chave de API no [site oficial do TMDB](https://www.themoviedb.org/).

Na raiz do projeto, crie o arquivo `.env.local` com o seguinte conteúdo:

```env
VITE_TMDB_API_KEY=sua_chave_da_tmdb
```

Substitua `sua_chave_da_tmdb` pela chave obtida no TMDB.

O arquivo `.env.local` não deve ser enviado ao GitHub. Verifique se ele está incluído no `.gitignore`.

**Nota de segurança:** variáveis com o prefixo `VITE_` ficam acessíveis no código executado pelo navegador. Portanto, essa configuração não protege a chave como um segredo de backend. Não utilize credenciais privadas nessa variável.

## Execução local

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Acesse o endereço informado no terminal, normalmente `http://localhost:5173`.

## Testes automatizados

Execute os testes com o comando:

```bash
npm run test:run
```

Os testes verificam os componentes da interface, as interações do usuário, a busca de filmes, o modal e o tratamento de erros.

## Build de produção

Gere os arquivos de produção:

```bash
npm run build
```

Para visualizar localmente a versão compilada, execute:

```bash
npm run preview
```

## Deploy

A aplicação pode ser publicada no [Vercel](https://vercel.com/).

Para configurar a variável de ambiente:

1. Acesse as configurações do projeto no Vercel.
2. Entre em **Settings → Environment Variables**.
3. Adicione a variável `VITE_TMDB_API_KEY` com a chave do TMDB.
4. Selecione os ambientes desejados: Production, Preview e Development.
5. Salve as configurações e execute um novo deploy.

A variável deve estar configurada antes do processo de build.

## Links do projeto

- Repositório: [Movie Finder no GitHub](https://github.com/KaiqueBatista/Movie-Finder)
- Aplicação publicada: [Movie Finder no Vercel](https://movie-finder-five-xi.vercel.app/)

## Desenvolvedor

**Kaique Oliveira Batista**

Desenvolvedor Front-end Júnior, com foco em desenvolvimento de interfaces web, JavaScript, Vue.js e React.

- GitHub: [KaiqueBatista](https://github.com/KaiqueBatista)
- LinkedIn: [Kaique Oliveira Batista](https://linkedin.com/in/kaique-oliveira-batista)
