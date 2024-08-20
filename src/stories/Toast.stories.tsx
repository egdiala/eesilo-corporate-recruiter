import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Toast } from "./../components/core";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "UI/Toast",
  component: Toast,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    theme: { control: "radio" },
    variant: { control: "radio" },
    size: { control: "radio" }
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const PrimaryFilled: Story = {
  render: (args) => <div className="w-[15dvw] flex justify-center"><Toast {...args} /></div>,
  args: {
    type: "success",
    variant: "filled",
    size: "32",
    title: "Success 🤯",
    message: "A success message for the toast."
  },
};
