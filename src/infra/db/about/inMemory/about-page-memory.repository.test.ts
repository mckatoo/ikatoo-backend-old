import { AboutPage, AboutPageProps } from "@domain/about/about-page.entity";
import { AboutPageMemoryRepository } from "./about-page-memory.repository";

describe("AboutPageMemory Repository", () => {
  it("should insert a new about page", async () => {
    const repository = new AboutPageMemoryRepository();
    const aboutPageData: AboutPageProps = {
      title: "title",
      description: "description",
    };
    const aboutPage = AboutPage.create(aboutPageData);
    const beforeInsert = await repository.get();
    expect(beforeInsert).toBeUndefined();

    await repository.insert(aboutPage);
    const afterInsert = await repository.get()
    expect(afterInsert).toStrictEqual(aboutPage);
  });

  it('should get the about page data', async () => {
    const repository = new AboutPageMemoryRepository();
    const aboutPageData: AboutPageProps = {
      title: "get title",
      description: "get description",
    };
    const aboutPage = AboutPage.create(aboutPageData);

    await repository.insert(aboutPage);
    const newAboutPage = await repository.get()
    expect(newAboutPage).toStrictEqual(aboutPage);
  });
});
