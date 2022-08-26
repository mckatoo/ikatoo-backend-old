import { AboutPageProps } from "@domain/about/about-page.entity";
import { AboutPageRepositoryInterface } from "@domain/about/about-page.repository";

type GetAboutPageOutput = AboutPageProps & { id: string };

export class GetAboutPageUseCase {
  constructor(private aboutPageRepository: AboutPageRepositoryInterface) {}

  async execute(user_id: string): Promise<GetAboutPageOutput> {
    const aboutPage = await this.aboutPageRepository.get(user_id);

    return aboutPage.toJson();
  }
}
