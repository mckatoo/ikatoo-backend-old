import { randomUUID } from "crypto";

export type SkillProps = {
  name: string;
  levelPercent: number;
};

export type ImageProps = {
  src: string;
  alt: string;
};

export type AboutPageProps = {
  skills?: SkillProps[];
  title: string;
  description: string;
  image?: ImageProps;
};

export class AboutPage {
  readonly id: string
  props: Required<AboutPageProps>;

  private constructor(props?: AboutPageProps, id?: string) {
    this.id = id || randomUUID()

    if (!props) throw new Error('Props required on contructor')

    this.props = {
      ...props,
      skills: props.skills || [],
      image: props.image || { src: "", alt: "" },
    };
  }

  static create(props?: AboutPageProps, id?: string) {
    return new AboutPage(props, id)
  }

  updateSkills(skills: SkillProps[]) {
    this.props.skills = skills;
  }

  updateTitle(title: string) {
    this.props.title = title;
  }

  updateDescription(description: string) {
    this.props.description = description;
  }

  updateImage(image: ImageProps) {
    this.props.image = image;
  }

  get title(): string {
    return this.props.title;
  }

  private set title(title: string) {
    this.props.title = title;
  }

  get description(): string {
    return this.props.description;
  }

  private set description(description: string) {
    this.props.description = description;
  }

  get skills(): SkillProps[] {
    return this.props.skills;
  }

  private set skills(skills: SkillProps[]) {
    this.props.skills = skills;
  }

  get image(): ImageProps {
    return this.props.image;
  }

  private set image(image: ImageProps) {
    this.props.image = image;
  }

  toJson() {
    return {
      id: this.id,
      ...this.props,
    }
  }
}
