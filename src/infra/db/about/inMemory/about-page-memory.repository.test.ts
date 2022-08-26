import { AboutPage, AboutPageProps } from "@domain/about/about-page.entity";
import { AboutPageMemoryRepository } from "./about-page-memory.repository";

describe("AboutPageMemory Repository", () => {
  it("should create a new about page", async () => {
    const repository = new AboutPageMemoryRepository();
    const aboutPageData = AboutPage.create({
      title: "title",
      description: "description",
      user_id: "user_id",
    });
    await repository.create(aboutPageData);
    const aboutPage = await repository.get("user_id");
    expect(aboutPage.toJson()).toStrictEqual(aboutPageData.toJson());
  });

  it("should get the about page data", async () => {
    const repository = new AboutPageMemoryRepository();
    const aboutPageData: AboutPageProps = {
      title: "get title",
      description: "get description",
      user_id: "other_user_id",
    };
    const aboutPage = AboutPage.create(aboutPageData);

    await repository.create(aboutPage);
    const newAboutPage = await repository.get("other_user_id");
    expect(newAboutPage).toStrictEqual(aboutPage);
  });
});
