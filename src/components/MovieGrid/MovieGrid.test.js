
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MovieGrid from './MovieGrid.vue'

describe('MovieGrid.vue', () => {
  const filmesExemplo = [
    {
      id: 1,
      title: 'Interestelar',
      poster_path: '/interestelar.jpg',
      vote_average: 8.7,
      release_date: '2014-11-06',
      overview: 'Uma equipe de exploradores viaja além desta galáxia.',
    },
    {
      id: 2,
      title: 'Batman',
      poster_path: '/batman.jpg',
      vote_average: 7.5,
      release_date: '2022-03-04',
      overview: 'Um herói protege Gotham.',
    },
  ]

  it('deve renderizar um card para cada filme', () => {
    const wrapper = mount(MovieGrid, {
      props: {
        filmes: filmesExemplo,
        loading: false,
        erro: false,
        mensagemErro: '',
      },
    })

    expect(wrapper.findAll('.container')).toHaveLength(2)
  })

  it('deve exibir os títulos dos filmes', () => {
    const wrapper = mount(MovieGrid, {
      props: {
        filmes: filmesExemplo,
        loading: false,
        erro: false,
        mensagemErro: '',
      },
    })

    const titulos = wrapper.findAll('.titulo')

    expect(titulos[0].text()).toBe('Interestelar')
    expect(titulos[1].text()).toBe('Batman')
  })

  it('deve emitir selecionar com os dados do filme escolhido', async () => {
    const wrapper = mount(MovieGrid, {
      props: {
        filmes: filmesExemplo,
        loading: false,
        erro: false,
        mensagemErro: '',
      },
    })

    await wrapper.findAll('.container')[0].trigger('click')

    expect(wrapper.emitted('selecionar')).toHaveLength(1)
    expect(wrapper.emitted('selecionar')[0]).toEqual([
      filmesExemplo[0],
    ])
  })

  it('deve exibir a mensagem de erro quando erro for true', () => {
    const wrapper = mount(MovieGrid, {
      props: {
        filmes: [],
        loading: false,
        erro: true,
        mensagemErro: 'Não foi possível carregar os filmes.',
      },
    })

    expect(wrapper.find('.erroDeBusca').text()).toBe(
      'Não foi possível carregar os filmes.',
    )
  })

  it('não deve exibir a mensagem de erro quando erro for false', () => {
    const wrapper = mount(MovieGrid, {
      props: {
        filmes: filmesExemplo,
        loading: false,
        erro: false,
        mensagemErro: '',
      },
    })

    expect(wrapper.find('.erroDeBusca').exists()).toBe(false)
  })

  it('não deve renderizar a grade enquanto estiver carregando', () => {
    const wrapper = mount(MovieGrid, {
      props: {
        filmes: filmesExemplo,
        loading: true,
        erro: false,
        mensagemErro: '',
      },
    })

    expect(wrapper.find('.filmes').exists()).toBe(false)
    expect(wrapper.findAll('.container')).toHaveLength(0)
  })

  it('deve renderizar a grade quando o carregamento terminar', () => {
    const wrapper = mount(MovieGrid, {
      props: {
        filmes: filmesExemplo,
        loading: false,
        erro: false,
        mensagemErro: '',
      },
    })

    expect(wrapper.find('.filmes').exists()).toBe(true)
    expect(wrapper.findAll('.container')).toHaveLength(2)
  })

  it('deve renderizar uma grade vazia quando não houver filmes', () => {
    const wrapper = mount(MovieGrid, {
      props: {
        filmes: [],
        loading: false,
        erro: false,
        mensagemErro: '',
      },
    })

    expect(wrapper.find('.filmes').exists()).toBe(true)
    expect(wrapper.findAll('.container')).toHaveLength(0)
  })
})
