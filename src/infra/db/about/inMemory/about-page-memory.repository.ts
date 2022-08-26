import { AboutPage } from "@domain/about/about-page.entity";
import {
  AboutPageRepositoryInterface,
  AboutPageWithId,
} from "@domain/about/about-page.repository";

export class AboutPageMemoryRepository implements AboutPageRepositoryInterface {
  private items: AboutPage[] = [];

  async get(user_id: string): Promise<AboutPageWithId> {
    const aboutPage = this.items.find((item) => item.user_id === user_id);
    if (!aboutPage) throw new Error("About Page not found");

    return Promise.resolve(aboutPage);
  }

  async create(aboutPage: AboutPage): Promise<void> {
    this.items = [...this.items, aboutPage];
  }

  async count(): Promise<number> {
    return Promise.resolve(this.items.length);
  }
}
