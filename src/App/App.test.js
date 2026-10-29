import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'

const filmesExemplo = [
  {
    id: 1,
    title: 'Interestelar',
    overview: 'Uma equipe viaja pelo espaço em busca de um novo lar.',
    poster_path: '/interestelar.jpg',
    release_date: '2014-11-07',
    vote_average: 8.7,
  },
  {
    id: 2,
    title: 'A Origem',
    overview: 'Um ladrão invade sonhos para roubar informações.',
    poster_path: '/origem.jpg',
    release_date: '2010-07-16',
    vote_average: 8.4,
  },
]

vi.mock('../components/SearchBar/SearchBar.vue', () => ({
  default: {
    name: 'SearchBar',
    props: ['loading'],
    emits: ['buscar'],
    template: `
      <div data-testid="search-bar">
        <span data-testid="loading">
          {{ loading ? 'Carregando' : 'Pronto' }}
        </span>

        <button
          data-testid="buscar-filme"
          @click="$emit('buscar', 'Interestelar')"
        >
          Buscar Interestelar
        </button>

      </div>
    `,
  },
}))

vi.mock('../components/MovieGrid/MovieGrid.vue', () => ({
  default: {
    name: 'MovieGrid',
    props: ['filmes', 'loading', 'erro', 'mensagemErro'],
    emits: ['selecionar'],
    template: `
      <div data-testid="movie-grid">
        <p v-if="erro" data-testid="erro">
          {{ mensagemErro }}
        </p>

        <p
          v-for="filme in filmes"
          :key="filme.id"
          data-testid="filme"
        >
          {{ filme.title }}
        </p>

        <button
          v-if="filmes && filmes.length > 0"
          data-testid="selecionar-filme"
          @click="$emit('selecionar', filmes[0])"
        >
          Selecionar filme
        </button>
      </div>
    `,
  },
}))

vi.mock('../components/MovieModal/MovieModal.vue', () => ({
  default: {
    name: 'MovieModal',
    props: ['filmeSelecionado'],
    emits: ['fecharModal'],
    template: `
      <div v-if="filmeSelecionado" data-testid="movie-modal">
        <p>{{ filmeSelecionado.title }}</p>

        <button
          data-testid="fechar-modal"
          @click="$emit('fecharModal')"
        >
          Fechar
        </button>
      </div>
    `,
  },
}))

let App

beforeEach(async () => {
  vi.resetModules()

  vi.stubEnv('VITE_TMDB_API_KEY', 'chave-teste')

  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        results: filmesExemplo,
      }),
    }),
  )

  App = (await import('./App.vue')).default
})

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
  vi.unstubAllEnvs()
})

describe('App.vue', () => {
  it('deve renderizar os componentes principais', async () => {
    const wrapper = mount(App)

    await flushPromises()

    expect(wrapper.find('#titulo').text()).toBe('Movie Finder')
    expect(wrapper.find('[data-testid="search-bar"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="movie-grid"]').exists()).toBe(true)

    wrapper.unmount()
  })

  it('deve carregar os filmes populares ao iniciar', async () => {
    const wrapper = mount(App)

    await flushPromises()

    expect(fetch).toHaveBeenCalled()
    expect(wrapper.text()).toContain('Interestelar')
    expect(wrapper.text()).toContain('A Origem')

    wrapper.unmount()
  })

  it('deve buscar filmes pelo título informado', async () => {
    const wrapper = mount(App)

    await flushPromises()

    await wrapper.find('[data-testid="buscar-filme"]').trigger('click')

    await flushPromises()

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/search/movie'),
    )

    wrapper.unmount()
  })

  it('deve abrir o modal ao selecionar um filme', async () => {
    const wrapper = mount(App)

    await flushPromises()

    await wrapper.find('[data-testid="selecionar-filme"]').trigger('click')

    await flushPromises()

    expect(wrapper.find('[data-testid="movie-modal"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="movie-modal"]').text()).toContain(
      'Interestelar',
    )

    wrapper.unmount()
  })

  it('deve fechar o modal', async () => {
    const wrapper = mount(App)

    await flushPromises()

    await wrapper.find('[data-testid="selecionar-filme"]').trigger('click')

    await flushPromises()

    await wrapper.find('[data-testid="fechar-modal"]').trigger('click')

    await flushPromises()

    expect(wrapper.find('[data-testid="movie-modal"]').exists()).toBe(false)

    wrapper.unmount()
  })

  it('deve exibir uma mensagem quando nenhum filme for encontrado', async () => {
    const wrapper = mount(App)

    await flushPromises()

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        results: [],
      }),
    })

    await wrapper.find('[data-testid="buscar-filme"]').trigger('click')

    await flushPromises()

    expect(wrapper.find('[data-testid="erro"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('Nenhum filme encontrado.')

    wrapper.unmount()
  })

  it('deve exibir uma mensagem quando a API falhar', async () => {
    fetch.mockRejectedValueOnce(new Error('Erro de conexão'))

    const wrapper = mount(App)

    await flushPromises()

    expect(wrapper.text()).toContain('Não foi possível carregar os filmes.')

    wrapper.unmount()
  })

  it('deve informar quando a chave da API não estiver configurada', async () => {
    vi.stubEnv('VITE_TMDB_API_KEY', '')

    vi.resetModules()

    const AppSemChave = (await import('./App.vue')).default
    const wrapper = mount(AppSemChave)

    await flushPromises()

    expect(wrapper.text()).toContain(
      'Configure a variável VITE_TMDB_API_KEY nas configurações do projeto.',
    )

    expect(fetch).not.toHaveBeenCalled()

    wrapper.unmount()
  })
})