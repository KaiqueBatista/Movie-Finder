<script setup>
  defineProps ({
    filme: Object
  })

  const emit = defineEmits (['abrirModal'])
  
</script>

<template>
  <!-- card de cada filme -->
    <div
      class="container"
      @click="emit('abrirModal', filme)"
    >

      <!-- poster do filme -->
      <img
        :src="'https://image.tmdb.org/t/p/w200' + filme.poster_path"
        :alt="`Pôster do filme ${filme.title}`"
      >

      <!-- nome do filme -->
      <div class="titulo">
        {{ filme.title }}
      </div>

      <!-- nota e ano -->
      <div class="info">

        <!-- nota -->
        <div class="notas">
          ⭐ {{filme.vote_average ? filme.vote_average.toFixed(1) : "0.0"}}
        </div>

        <!-- ano -->
        <div class="data">
          📅 {{filme.release_date ? filme.release_date.slice(0,4) : '---'}}
        </div>

      </div>

      <!-- descrição resumida -->
      <div class="descrição">
        {{filme.overview ? filme.overview.slice(0, 120) : 'Sem descrição'}}...
      </div>
    </div>
</template>

<style scoped>
.info {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 10px;
}
</style>