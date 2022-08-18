import { AboutPage } from "./about-page.entity";

export interface AboutPageRepositoryInterface {
  insert(aboutPage: AboutPage): Promise<void>;
  get(): Promise<AboutPage>
}
