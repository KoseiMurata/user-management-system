import type { Meta, StoryObj } from "@storybook/react";
import DeleteUserButton from "./DeleteUserBotton";

const meta: Meta<typeof DeleteUserButton> = {
  title: "Components/DeleteUserBotton",
  component: DeleteUserButton,
};

export default meta;

type Story = StoryObj<typeof DeleteUserButton>;

export const Default: Story = {
  args: {
    userId: 1
  },
};
