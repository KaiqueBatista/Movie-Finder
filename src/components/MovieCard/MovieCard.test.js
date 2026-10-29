
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MovieCard from './MovieCard.vue'

describe('MovieCard.vue', () => {
  const filmeExemplo = {
    id: 1,
    title: 'Interestelar',
    poster_path: '/interestelar.jpg',
    vote_average: 8.7,
    release_date: '2014-11-06',
    overview: 'Uma equipe de exploradores viaja além desta galáxia.',
  }

  it('deve exibir o título do filme', () => {
    const wrapper = mount(MovieCard, {
      props: { filme: filmeExemplo },
    })

    expect(wrapper.find('.titulo').text()).toBe('Interestelar')
  })

  it('deve exibir o pôster com o caminho correto', () => {
    const wrapper = mount(MovieCard, {
      props: { filme: filmeExemplo },
    })

    expect(wrapper.find('img').attributes('src')).toBe(
      'https://image.tmdb.org/t/p/w200/interestelar.jpg',
    )
    expect(wrapper.find('img').attributes('alt')).toBe(
      'Pôster do filme Interestelar',
    )
  })

  it('deve exibir a nota com uma casa decimal', () => {
    const wrapper = mount(MovieCard, {
      props: { filme: filmeExemplo },
    })

    expect(wrapper.find('.notas').text()).toContain('8.7')
  })

  it('deve exibir apenas o ano de lançamento', () => {
    const wrapper = mount(MovieCard, {
      props: { filme: filmeExemplo },
    })

    expect(wrapper.find('.data').text()).toContain('2014')
  })

  it('deve exibir a descrição do filme', () => {
    const wrapper = mount(MovieCard, {
      props: { filme: filmeExemplo },
    })

    expect(wrapper.find('.descrição').text()).toContain(
      'Uma equipe de exploradores viaja além desta galáxia.',
    )
  })

  it('deve limitar a descrição a 120 caracteres', () => {
    const filme = {
      ...filmeExemplo,
      overview: 'A'.repeat(200),
    }

    const wrapper = mount(MovieCard, {
      props: { filme },
    })

    expect(wrapper.find('.descrição').text()).toBe(`${'A'.repeat(120)}...`)
  })

  it('deve exibir valores alternativos quando os dados estiverem ausentes', () => {
    const filme = {
      ...filmeExemplo,
      vote_average: 0,
      release_date: '',
      overview: '',
    }

    const wrapper = mount(MovieCard, {
      props: { filme },
    })

    expect(wrapper.find('.notas').text()).toContain('0.0')
    expect(wrapper.find('.data').text()).toContain('---')
    expect(wrapper.find('.descrição').text()).toBe('Sem descrição...')
  })

  it('deve emitir abrirModal com os dados do filme ao clicar no card', async () => {
    const wrapper = mount(MovieCard, {
      props: { filme: filmeExemplo },
    })

    await wrapper.find('.container').trigger('click')

    expect(wrapper.emitted('abrirModal')).toHaveLength(1)
    expect(wrapper.emitted('abrirModal')[0]).toEqual([filmeExemplo])
  })
})
