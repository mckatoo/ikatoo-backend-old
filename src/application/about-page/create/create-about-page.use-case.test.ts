import { AboutPageRepository } from "@infra/db/about";
import { CreateAboutPageUseCase } from "./create-about-page.use-case";

describe("Create About Page use-case Test", () => {
  it("should create a new about page", async () => {
    const repository = new AboutPageRepository();
    const createUseCase = new CreateAboutPageUseCase(repository);
    const data = {
      title: "title",
      description: "description",
    };
    expect(await repository.count()).toBe(0);

    const output = await createUseCase.execute(data);
    expect(output).toStrictEqual({
      id: (await repository.get()).id,
      ...data,
      image: {
        src: "",
        alt: "",
      },
      skills: [],
    });
    expect(await repository.count()).toBe(1);
  });
});
