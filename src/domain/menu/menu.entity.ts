import { randomUUID } from "crypto";

export type MenuProps = {
  label: string
  to: string
};

export class Menu {
  readonly id: string;
  props: Required<MenuProps>;

  constructor(props: MenuProps, id?: string) {
    this.id = id || randomUUID()

    if (!props) throw new Error('Props required on contructor')

    this.props = {
      ...props,
      label: props.label || "",
      to: props.to || "",
    };
  }

  static create(props: MenuProps, id?: string) {
    return new Menu(props, id)
  }

  updateLabel(label: string) {
    this.props.label = label;
  }

  updateTo(to: string) {
    this.props.to = to;
  }

  get to(): string {
    return this.props.to;
  }

  private set to(to: string) {
    this.props.to = to;
  }

  get label():string  {
    return this.props.label;
  }

  private set label(label: string) {
    this.props.label = label;
  }

  toJson() {
    return this.props;
  }
}
