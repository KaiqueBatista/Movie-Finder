<script setup>
  defineProps ({
    filmeSelecionado: Object
  })

  const emitModal = defineEmits (['fecharModal'])

</script>

<template>
  
  <!-- modal aparece quando um filme é selecionado -->
  <div class="overlay" v-if="filmeSelecionado">

    <div class="modal">

      <div class="containerBotao">

        <!-- título do filme -->
        <div class="tituloSelecionado">
          {{filmeSelecionado.title}}
        </div>

        <!-- botão fechar modal -->
        <button
          class="fecharPop"
          type="button"
          aria-label="Fechar detalhes do filme"
          @click="emitModal('fecharModal')"
        >
          X
        </button>

      </div>

      <!-- descrição completa -->
      <div class="descriçãoSelecionado">
        {{filmeSelecionado.overview}}
      </div>

      <!-- imagem do filme -->
      <img
        :src="'https://image.tmdb.org/t/p/w200' + filmeSelecionado.poster_path"
        :alt="`Pôster do filme ${filmeSelecionado.title}`"
      >

    </div>
  </div>
</template>
