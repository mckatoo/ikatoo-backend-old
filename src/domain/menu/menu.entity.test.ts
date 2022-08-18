import { randomUUID } from "crypto";
import { Menu, MenuProps } from "./menu.entity";

describe("Test Menu Test", () => {

  it("constructor without id", () => {
    let menuData: MenuProps = {
      label: "test label",
      to: "url/test"
    };

    let menu = new Menu(menuData);

    expect(menu.props).toStrictEqual({
      label: "test label",
      to: "url/test"
    });
    expect(menu.id).toBeDefined();
  });

  it("constructor with id", () => {
    let menuData: MenuProps = {
      label: "test label",
      to: "url/test"
    };

    const id = randomUUID()

    let menu = new Menu(menuData, id);

    expect(menu.props).toStrictEqual({
      label: "test label",
      to: "url/test"
    });
    expect(menu.id).toBe(id);
  });

  it("should update label method", () => {
    const menuData: MenuProps = {
      label: "label",
      to: "url",
    };
    const menu = new Menu(menuData);
    menu.updateLabel("new label");

    expect(menu.label).toBe("new label");
  });

  it("should update skills method", () => {
    const menuData: MenuProps = {
      label: "label",
      to: "url",
    };
    const menu = new Menu(menuData);
    menu.updateTo("new/url");
   
    expect(menu.to).toStrictEqual("new/url");
  });

  // it('Should show default data on about_page table', async () => {
  //   const menu = await menuRepository.getMenu()

  //   expect(menu).toEqual({
  //     id: '83ee76b5-c877-4eb1-b919-876d177bcf80',
  //     skills: ['Modelagem de dados', 'Desenvolvimento de aplicações'],
  //     label: 'Olá. Bem vindo❗',
  //     to: '<p>Me chamo Milton Carlos Katoo, moro em Itapira, interior de São Paulo/Brasil. Pai de uma princesa e filho de excelente cozinheira Italiana e um saldoso Japonês faz tudo, sou um desenvolvedor full-stack que ama programação e desenvolvimento de software afim de melhorar a vida das pessoas.</p><p>Pessoa bem organizada, solucionador de problemas, funcionário independente com alta atenção aos detalhes.Fã de animes, mangas, games, séries de TV e filmes. Uma pessoa de família e pai de uma princesa.</p><p>Interessado em todo o espectro de programação e trabalhar em projetos ambiciosos com pessoas positivas.</p><a class="text-mck_aqua underline underline-offset-8" href="https://ikatoo.com.br/contact/" rel="contact"><span>🎉</span>Vamos fazer algo especial.</a><span>😄</span>'
  //   })
  // })

  // it('Should insert new data on about_page table', async () => {
  //   const newData = {
  //     label: 'Title test',
  //     to: 'Describe test',
  //     skills: ['Test', 'Test2']
  //   }

  //   await menuRepository.createMenu(newData)
  //   const menu = await menuRepository.getMenu()

  //   expect(menu).toHaveProperty('label', 'Title test')
  //   expect(menu).toHaveProperty('to', 'Describe test')
  //   expect(menu).toHaveProperty('skills', ['Test', 'Test2'])
  // })

  // it('Should insert new data with id on about_page table', async () => {
  //   const newData = {
  //     id: randomUUID(),
  //     label: 'Title test',
  //     to: 'Describe test',
  //     skills: ['Test', 'Test2']
  //   }

  //   await menuRepository.createMenu(newData)
  //   const menu = await menuRepository.getMenu()

  //   expect(menu).toHaveProperty('id', newData.id)
  // })

  // it('Should return an error when informing an existing id', async () => {
  //   const newData = {
  //     id: '83ee76b5-c877-4eb1-b919-876d177bcf80',
  //     label: 'Title test',
  //     to: 'Describe test',
  //     skills: ['Test', 'Test3']
  //   }

  //   await expect(menuRepository.createMenu(newData))
  //     .rejects
  //     .toThrowError('The id already exists.')
  // })

  // it('Should delete a existent page', async () => {
  //   menuRepository.deleteMenu()
  //   const menu = await menuRepository.getMenu()

  //   expect(menu).toBeUndefined()
  // })

  // it('Should update the about page', async () => {
  //   await menuRepository.createMenu({
  //     label: 'Title test updated',
  //     to: 'Describe test updated',
  //     skills: ['Test', 'Test4']
  //   })

  //   const menuUpdated = await menuRepository.getMenu()

  //   expect(menuUpdated).toHaveProperty('label', 'Title test updated')
  //   expect(menuUpdated).toHaveProperty('to', 'Describe test updated')
  // })
});
