import { MenuProps } from '@domain/menu/menu.entity'
import { MenuMemoryRepository } from '@infra/db/menu/inMemory/menu-memory.repository'
import { randomUUID } from 'crypto'
import { CreateMenuUseCase } from '../create/create-menu.use-case'
import { GetMenuUseCase } from './get-menu.use-case'

describe('Get Menu use-case Test', () => {
  it('should get a menu', async () => {
    const repository = new MenuMemoryRepository()
    const createUseCase = new CreateMenuUseCase(repository)
    const getUseCase = new GetMenuUseCase(repository)
    const data: MenuProps = {
      name: 'public',
      items: [
        { label: 'first item', to: 'first/url' },
        { label: 'second item', to: 'second/url' }
      ],
      user_id: randomUUID()
    }

    const menu = await createUseCase.execute(data)
    const output = await getUseCase.execute(data.user_id, 'public')
    expect(output).toStrictEqual(menu)
    const menuDataOfTheRepository = await repository.get(data.user_id, 'public')
    expect(menuDataOfTheRepository).toStrictEqual(menu)
  })
})
