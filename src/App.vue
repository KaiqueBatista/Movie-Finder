<script setup>
  import { ref, onMounted } from 'vue';
  import SearchBar from './components/SearchBar.vue';
  import MovieGrid from './components/MovieGrid.vue';
  import MovieModal from './components/MovieModal.vue';

  const filmes = ref ([])
  const loading = ref (false)
  const url = 'https://api.themoviedb.org/3'
  const chave = import.meta.env.VITE_TMDB_API_KEY
  const filmeSelecionado = ref (null)
  const erro = ref(false)
  const mensagemErroBusca = ref('')
  

    // mostrar modal ao clicar num filme
   function modal (item){
    filmeSelecionado.value = item
  }

  // fechar modal
  function fecharModal (){
    filmeSelecionado.value = null
  }

  // carrega os filmes mais populares assim que abrir a pag.
  async function filmesPopulares() {
    loading.value = true

    if (!chave) {
      erro.value = true
      mensagemErroBusca.value = 'Configure a chave da TMDB no arquivo .env.local.'
      loading.value = false
      return
    }

    try {
      const resposta = await fetch (`${url}/movie/popular?api_key=${chave}&language=pt-BR`)

      if (!resposta.ok) {
        throw new Error('Erro ao carregar filmes populares')
      }

      const dados = await resposta.json()

      filmes.value = dados.results
      mensagemErroBusca.value = ''
    } catch {
      erro.value = true
      mensagemErroBusca.value = 'Não foi possível carregar os filmes.'
    } finally {
      loading.value = false
    }
  }

  // buscar filmes
  async function buscarFilme (busca) {

    if(busca.trim() === ''){
      erro.value = false
      await filmesPopulares()
       return
    }

    loading.value = true

    erro.value = false

    mensagemErroBusca.value = ''

    if (!chave) {
      erro.value = true
      mensagemErroBusca.value = 'Configure a chave da TMDB no arquivo .env.local.'
      loading.value = false
      return
    }

    try {
      const buscaCodificada = encodeURIComponent(busca)
      const resposta = await fetch (`${url}/search/movie?api_key=${chave}&language=pt-BR&query=${buscaCodificada}`)

      if (!resposta.ok) {
        throw new Error('Erro ao buscar filmes')
      }

      const dados = await resposta.json()

      if (dados.results.length === 0) {
        erro.value = true
        mensagemErroBusca.value = 'Nenhum filme encontrado.'
        return
      }

      filmes.value = dados.results
    } catch {
      erro.value = true
      mensagemErroBusca.value = 'Não foi possível buscar os filmes.'
    } finally {
      loading.value = false
    }
  }
  
  // Executa uma ação automaticamente quando o componente é carregado na tela
  onMounted(() => {
    filmesPopulares()
  })
</script>


<template>
  <!-- título da aplicação -->
  <h1 id="titulo">Movie Finder</h1>

  <SearchBar
    :loading="loading"
    @buscar="buscarFilme"
  />

  <MovieGrid
    :filmes="filmes"
    :loading="loading"
    :erro="erro"
    :mensagemErro="mensagemErroBusca"
    @selecionar="modal"
  />

  <!-- fechar modal -->
  <MovieModal
    v-if="filmeSelecionado"
    :filmeSelecionado="filmeSelecionado"
    @fecharModal="fecharModal"
  />

</template>


<style>

  /* reset padrão */
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  /* fundo da página */
  body {
    background-color: black;
    color: white;
  }

  /* título principal */
  h1 {
    text-align: center;
    padding: 20px;
    font-weight: bold;
    margin-top: 8px;
    margin-bottom: 5px;
  }

  /* card do filme */
  .container {
    display: flex;
    flex-direction: column;
    background-color: #1c1c1c;
    padding: 7px;
    border-radius: 5px;
    cursor: pointer;
    overflow: hidden;
    transition: 0.3s;
    width: 100%;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
  }

  /* efeito hover card */
  .container:hover {
    transform: scale(1.03);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.6);
  }

  /* imagem do filme */
  img {
    width: 100%;
    border-radius: 5px;
    padding: 2px;
  }

  /* nota e data */
  .notas,
  .data {
    font-weight: 100;
  }

  /* descrição resumida */
  .descrição {
    margin-top: 15px;
    line-height: 22px;
    font-size: 14px;
    color: #d1d1d1;
  }

  /* fundo escuro do modal */
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* caixa do modal */
  .modal {
    background-color: #1c1c1c;
    padding: 20px;
    border-radius: 10px;
    width: 90%;
    max-width: 400px;
    position: relative;
    max-height: 90vh;
    overflow-y: auto;
  }

  .descriçãoSelecionado {
    margin-bottom: 15px;
  }

  .tituloSelecionado {
    font-size: 20px;
    font-weight: bolder;
  }

  /* área do título e botão */
  .containerBotao {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    gap: 15px;
    font-weight: bolder;
    align-items: center;
  }

  /* botão fechar */
  .fecharPop {
    background-color: rgba(0, 0, 0, 0.8);
    border: none;
    padding: 5px;
    color: white;
    font-size: 20px;
    cursor: pointer;
    transition: 0.2s;
    border-radius: 8px;
    flex-shrink: 0;
  }

  /* animação botão fechar */
  .fecharPop:hover {
    transform: scale(1.1);
  }

  /* ajustes mobile */
  @media (max-width:768px) {

    .filmes {
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      margin: 8px;
    }

    .modal {
      padding: 15px;
    }
  }

  /* descrição do modal */
  .descriçãoSelecionado {
    font-size: 14px;
    line-height: 20px;
  }

</style>