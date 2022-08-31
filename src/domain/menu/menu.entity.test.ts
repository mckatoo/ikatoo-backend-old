import { Menu, MenuProps } from './menu.entity'

describe('Test Menu Test', () => {
  const menuData: MenuProps = {
    name: 'test name',
    items: [
      { label: 'first item', to: 'url/first' },
      { label: 'second item', to: 'url/second' }
    ],
    user_id: 'randomUUID'
  }

  it('constructor without id', () => {
    const menu = new Menu(menuData)

    expect(menu.props).toStrictEqual(menuData)
    expect(menu.id).toBeDefined()
  })

  it('constructor with id', () => {
    const menu = new Menu(menuData, 'test_id')

    expect(menu.props).toStrictEqual(menuData)
    expect(menu.id).toBe('test_id')
  })

  it('should update name', () => {
    const menu = new Menu(menuData)
    menu.updateName('new name')

    expect(menu.name).toBe('new name')
  })

  it('should update items', () => {
    const menu = new Menu(menuData)
    const items = [{ label: 'other label', to: 'url/updated' }]
    menu.updateItems(items)

    expect(menu.items).toStrictEqual(items)
    expect(menu.items).toHaveLength(1)
  })
})
