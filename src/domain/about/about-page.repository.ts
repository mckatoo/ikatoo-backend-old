import { AboutPage } from "./about-page.entity";

export type AboutPageWithId = AboutPage & { id: string };

export interface AboutPageRepositoryInterface {
  create(aboutPage: AboutPage): Promise<void>;
  get(user_id: string): Promise<AboutPageWithId>;
}
