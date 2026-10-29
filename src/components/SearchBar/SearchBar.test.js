
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SearchBar from './SearchBar.vue'

describe('SearchBar.vue', () => {
  it('deve renderizar o campo de busca e o botão', () => {
    const wrapper = mount(SearchBar)

    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.find('button').text()).toBe('Buscar')
  })

  it('deve emitir o evento buscar ao clicar no botão', async () => {
    const wrapper = mount(SearchBar)

    await wrapper.find('input').setValue('Interestelar')
    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('buscar')).toEqual([['Interestelar']])
  })

  it('deve emitir o evento buscar ao pressionar Enter', async () => {
    const wrapper = mount(SearchBar)

    await wrapper.find('input').setValue('Batman')
    await wrapper.find('input').trigger('keyup.enter')

    expect(wrapper.emitted('buscar')).toEqual([['Batman']])
  })

  it('deve exibir mensagem de erro quando o campo estiver vazio', async () => {
    const wrapper = mount(SearchBar)

    await wrapper.find('button').trigger('click')

    expect(wrapper.find('.erroInput').text()).toBe(
      'Digite um título para continuar',
    )
    expect(wrapper.emitted('buscar')).toBeUndefined()
  })

  it('deve exibir mensagem de erro quando o campo tiver apenas espaços', async () => {
    const wrapper = mount(SearchBar)

    await wrapper.find('input').setValue('   ')
    await wrapper.find('button').trigger('click')

    expect(wrapper.find('.erroInput').text()).toBe(
      'Digite um título para continuar',
    )
    expect(wrapper.emitted('buscar')).toBeUndefined()
  })

  it('deve limpar a mensagem de erro após preencher o campo', async () => {
    const wrapper = mount(SearchBar)

    await wrapper.find('button').trigger('click')
    expect(wrapper.find('.erroInput').exists()).toBe(true)

    await wrapper.find('input').setValue('Avatar')
    await wrapper.find('button').trigger('click')

    expect(wrapper.find('.erroInput').exists()).toBe(false)
  })

  it('deve exibir o estado de carregamento quando loading for true', () => {
    const wrapper = mount(SearchBar, {
      props: {
        loading: true,
      },
    })

    expect(wrapper.find('.carregar').text()).toBe('Carregando')
  })

  it('não deve exibir o estado de carregamento quando loading for false', () => {
    const wrapper = mount(SearchBar, {
      props: {
        loading: false,
      },
    })

    expect(wrapper.find('.carregar').exists()).toBe(false)
  })
})
