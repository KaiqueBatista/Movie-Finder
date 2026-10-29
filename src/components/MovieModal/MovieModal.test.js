
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MovieModal from './MovieModal.vue'

describe('MovieModal.vue', () => {
  const filmeExemplo = {
    id: 1,
    title: 'Interestelar',
    poster_path: '/interestelar.jpg',
    overview: 'Uma equipe de exploradores viaja além desta galáxia.',
  }

  it('deve exibir os detalhes quando um filme estiver selecionado', () => {
    const wrapper = mount(MovieModal, {
      props: {
        filmeSelecionado: filmeExemplo,
      },
    })

    expect(wrapper.find('.overlay').exists()).toBe(true)
    expect(wrapper.find('.modal').exists()).toBe(true)
  })

  it('deve exibir o título do filme', () => {
    const wrapper = mount(MovieModal, {
      props: {
        filmeSelecionado: filmeExemplo,
      },
    })

    expect(wrapper.find('.tituloSelecionado').text()).toBe('Interestelar')
  })

  it('deve exibir a descrição completa do filme', () => {
    const wrapper = mount(MovieModal, {
      props: {
        filmeSelecionado: filmeExemplo,
      },
    })

    expect(wrapper.find('.descriçãoSelecionado').text()).toBe(
      'Uma equipe de exploradores viaja além desta galáxia.',
    )
  })

  it('deve exibir o pôster com o caminho correto', () => {
    const wrapper = mount(MovieModal, {
      props: {
        filmeSelecionado: filmeExemplo,
      },
    })

    expect(wrapper.find('img').attributes('src')).toBe(
      'https://image.tmdb.org/t/p/w200/interestelar.jpg',
    )
    expect(wrapper.find('img').attributes('alt')).toBe(
      'Pôster do filme Interestelar',
    )
  })

  it('deve emitir fecharModal ao clicar no botão de fechar', async () => {
    const wrapper = mount(MovieModal, {
      props: {
        filmeSelecionado: filmeExemplo,
      },
    })

    await wrapper.find('.fecharPop').trigger('click')

    expect(wrapper.emitted('fecharModal')).toHaveLength(1)
  })

  it('deve exibir o botão de fechar com um nome acessível', () => {
    const wrapper = mount(MovieModal, {
      props: {
        filmeSelecionado: filmeExemplo,
      },
    })

    expect(
      wrapper.find('button').attributes('aria-label'),
    ).toBe('Fechar detalhes do filme')
  })

  it('não deve exibir o modal quando nenhum filme estiver selecionado', () => {
    const wrapper = mount(MovieModal, {
      props: {
        filmeSelecionado: null,
      },
    })

    expect(wrapper.find('.overlay').exists()).toBe(false)
    expect(wrapper.find('.modal').exists()).toBe(false)
  })
})
