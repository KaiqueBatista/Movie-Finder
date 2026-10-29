<script setup>
import { ref } from 'vue'

defineProps({
  loading: Boolean,
})

const emit = defineEmits(['buscar'])
const busca = ref('')
const mensagemErro = ref('')

function buscar() {
  const titulo = busca.value.trim()

  if (!titulo) {
    mensagemErro.value = 'Digite um título para continuar'
    return
  }

  mensagemErro.value = ''
  emit('buscar', titulo)
}
</script>

<template>
  <div class="areaBusca">
    <input
      v-model="busca"
      class="inputBusca"
      placeholder="Digite um filme aqui"
      @input="mensagemErro = ''"
      @keyup.enter="buscar"
    >

    <div v-if="mensagemErro" class="erroInput">
      {{ mensagemErro }}
    </div>

    <button
      class="botaoBusca"
      :disabled="loading"
      @click="buscar"
    >
      Buscar
    </button>

    <div v-if="loading" class="carregar">
      Carregando
    </div>
  </div>
</template>

<style scoped>
.areaBusca {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  gap: 10px;
}

.inputBusca {
  display: block;
  text-align: center;
  padding: 12px;
  width: 100%;
  max-width: 500px;
  height: 6vh;
  margin-bottom: 15px;
  border-radius: 8px;
  border: none;
  outline: none;
}

.erroInput {
  margin-top: 5px;
  margin-bottom: 10px;
  color: red;
  font-size: 12px;
}

.botaoBusca {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 100px;
  padding: 12px;
  margin: 10px auto;
  border: none;
  border-radius: 8px;
  background-color: #3c3c3c;
  color: white;
  cursor: pointer;
  transition: 0.2s;
}

.botaoBusca:hover:not(:disabled) {
  transform: scale(1.03);
}

.botaoBusca:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>