import { AboutPage } from "@domain/about/about-page.entity";
import { AboutPageRepositoryInterface } from "@domain/about/about-page.repository";

export class AboutPageMemoryRepository implements AboutPageRepositoryInterface {
  private items: AboutPage[] = [];

  get(): Promise<AboutPage> {
    return Promise.resolve(this.items[0])
  }

  async insert(aboutPage: AboutPage): Promise<void> {
    this.items = [aboutPage]
  }

  count(): Promise<number> {
    return Promise.resolve(this.items.length);
  }
}
