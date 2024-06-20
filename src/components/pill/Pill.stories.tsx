import { Pill, PillProps } from "./Pill";

export default {
  title: "Pill",
  component: Pill,
  argTypes: {
    label: { control: "text" },
    color: { control: "color" },
    onClick: { action: "clicked" },
  },
};

export const Default = () => <Pill label="Default Pill" />;

export const Clickable = (args: PillProps) => <Pill {...args} />;
Clickable.args = {
  label: "Clickable Pill",
  color: "#0ff",
  onClick: () => console.log("Clicked"),
};
