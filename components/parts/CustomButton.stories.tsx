// components/parts/CustomButton.stories.tsx

import type { Meta, StoryObj } from "@storybook/react";
import CustomButton from "./CustomButton";
import { Save, Delete, Edit } from "@mui/icons-material";

const meta: Meta<typeof CustomButton> = {
  title: "Components/Parts/CustomButton",
  component: CustomButton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CustomButton>;

// --- 基本ボタン ---
export const Primary: Story = {
  args: {
    variantType: "primary",
    children: "Primary Button",
  },
};

export const Secondary: Story = {
  args: {
    variantType: "secondary",
    children: "Secondary Button",
  },
};

export const Danger: Story = {
  args: {
    variantType: "danger",
    children: "Danger Button",
  },
};

// --- アイコン付き ---
export const WithIcon: Story = {
  args: {
    variantType: "primary",
    children: "Save",
    startIcon: <Save />,
  },
};

export const WithEndIcon: Story = {
  args: {
    variantType: "secondary",
    children: "Edit",
    endIcon: <Edit />,
  },
};

export const DeleteIconButton: Story = {
  args: {
    variantType: "danger",
    children: "Delete",
    startIcon: <Delete />,
  },
};

export const Loading: Story = {
  args: {
    variantType: "primary",
    children: "Loading...",
    loading: true,
  },
};
