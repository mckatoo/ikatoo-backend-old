import { AboutPageRepositoryInterface } from "@domain/about/about-page.repository";
import { ImageProps, SkillProps } from "@domain/about/about-page.entity";

type GetAboutPageOutput = {
  id: string;
  title: string;
  description: string;
  skills: SkillProps[];
  image: ImageProps;
};

export class GetAboutPageUseCase {
  constructor(private aboutPageRepository: AboutPageRepositoryInterface) {}

  async execute(): Promise<GetAboutPageOutput> {
    const aboutPage = await this.aboutPageRepository.get()

    return aboutPage.toJson();
  }
}
