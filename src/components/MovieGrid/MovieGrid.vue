
<script setup>
import MovieCard from '../MovieCard/MovieCard.vue'

defineProps({
  filmes: Array,
  loading: Boolean,
  erro: Boolean,
  mensagemErro: String,
})

const emit = defineEmits(['selecionar'])
</script>

<template>
  <!-- mensagem de erro da busca -->
  <div v-if="erro" class="erroDeBusca">
    {{ mensagemErro }}
  </div>

  <!-- grade de filmes -->
  <div v-if="!loading" class="filmes">
    <MovieCard
      v-for="filme in filmes"
      :key="filme.id"
      :filme="filme"
      @abrirModal="emit('selecionar', $event)"
    />
  </div>
</template>

<style scoped>
.erroDeBusca {
  width: 100%;
  max-width: 400px;
  padding: 10px;
  margin: 10px auto;
  border-radius: 8px;
  background-color: rgba(143, 0, 0, 0.7);
  text-align: center;
  font-size: 15px;
}

.filmes {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
  padding: 10px;
  margin: 15px;
  border-radius: 5px;
}
</style>
