import { AboutPage } from '@domain/about/about-page.entity'
import {
  AboutPageRepositoryInterface,
  AboutPageWithId
} from '@domain/about/about-page.repository'

export class AboutPageMemoryRepository implements AboutPageRepositoryInterface {
  private items: AboutPage[] = []

  async get (userId: string): Promise<AboutPageWithId> {
    const aboutPage = this.items.find((item) => item.user_id === userId)
    if (aboutPage == null) throw new Error('About Page not found')

    return await Promise.resolve(aboutPage)
  }

  async create (aboutPage: AboutPage): Promise<void> {
    this.items = [...this.items, aboutPage]
  }

  async count (): Promise<number> {
    return await Promise.resolve(this.items.length)
  }
}
