// components/parts/CustomButton.stories.tsx

import type { Meta, StoryObj } from "@storybook/react";
import CustomButton from "../../components/parts/CustomButton";

const meta: Meta<typeof CustomButton> = {
  title: "Components/Parts/CustomButton",
  component: CustomButton,
  tags: ["autodocs"],
};

// TODO: メタデータのエクスポート

// TODO: ストーリーの定義

export const Primary: Story = {
  args: {
    variantType: "primary",
    children: "Primary Button",
  },
};

// TODO: 上記サンプルを参考に[Secondary][Danger]を設定する
