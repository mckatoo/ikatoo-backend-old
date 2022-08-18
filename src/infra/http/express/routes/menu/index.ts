import { Router, Request, Response } from "express"

const menuRoute = Router();

// const menuPageRepository = new MenuPageRepository();

menuRoute.get("/menu/:title", (req: Request, res: Response) => {
  const { title } = req.params
  const menuItems = [
    { menu_item_id: 1, menu_id: 1, label: "Sobre", to: "app/about" },
    { menu_item_id: 2, menu_id: 1, label: "Habilidades", to: "app/skills" },
    { menu_item_id: 3, menu_id: 1, label: "Projetos", to: "app/projects" },
    { menu_item_id: 4, menu_id: 1, label: "Contatos", to: "app/contact" },
    { menu_item_id: 5, menu_id: 2, label: "Dashboard", to: "admin" },
    { menu_item_id: 6, menu_id: 3, label: "Sobre", to: "app/about" },
    { menu_item_id: 7, menu_id: 3, label: "Habilidades", to: "app/skills" },
    { menu_item_id: 8, menu_id: 3, label: "Projetos", to: "app/projects" },
  ]

  const social = [
    {
      social_id: 1,
      linkedin: "mckatoo-linkedin",
      github: "mckatoo-github",
      youtube: "mckatoo-youtube",
      user_id: 1
    },
    {
      social_id: 2,
      linkedin: "teste-linkedin",
      github: "teste-github",
      youtube: "teste-youtube",
      user_id: 2
    }
  ]

  const menus = [
    {
      menu_id: 1,
      menu_name: "public",
      user_id: 1
    },
    {
      menu_id: 2,
      menu_name: "admin",
      user_id: 1
    },
    {
      menu_id: 3,
      menu_name: "public",
      user_id: 2
    }
  ]

  const user_id = 1

  const selectedMenu = menus.find(menu => menu.menu_name === title && menu.user_id === user_id)
  if (!selectedMenu) throw new Error("Menu not found.");

  const itemsFromMenu = menuItems.filter(menu => menu.menu_id === selectedMenu?.menu_id)
  const socialLinksFromUser = social.find(link => link.user_id === user_id)

  res.json({ links: itemsFromMenu, social: socialLinksFromUser })
})

menuRoute.post("/menu", (req: Request, res: Response) => {
  const { menu } = req.body
  const publicLinks = [
    { label: "Sobre", to: "app/about" },
    { label: "Habilidades", to: "app/skills" },
    { label: "Projetos", to: "app/projects" },
    { label: "Contatos", to: "app/contact" },
  ]

  const adminLinks = [
    { label: "Dashboard", to: "admin" },
  ]

  const social = {
    linkedin: "mckatoo",
    github: "mckatoo",
    youtube: "UCc1e1mclC9o5OnQU87PcU1g",
  }

  const links = (menu === 'public') ? publicLinks : adminLinks

  res.status(201).json({ social, links })
})

export default menuRoute
