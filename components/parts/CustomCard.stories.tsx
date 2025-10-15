// components/parts/CustomCard.stories.tsx

import type { Meta, StoryObj } from "@storybook/react";
import CustomCard from "../../components/parts/CustomCard";
import CustomButton from "../../components/parts/CustomButton";

// TODO: メタデータ
const meta: Meta<typeof CustomCard> = {
  title: "Components/Parts/CustomCard",
  component: CustomCard,
  tags: ["autodocs"],
  argTypes: {
    bgColor: { control: "color" },
    imageUrl: { control: "text" },
    expandableDescription: { control: "boolean" },
    expandedInitially: { control: "boolean" },
  },
};

export default meta;

// TODO: ストーリーの定義
type Story = StoryObj<typeof CustomCard>;

export const Default: Story = {
  args: {
    title: "カードタイトル",
    description: "これはカスタムカードの説明です。",
    actions: (
      <>
        <CustomButton variantType="secondary">アクション1</CustomButton>
        <CustomButton variantType="danger">アクション2</CustomButton>
      </>
    ),
  },
};

export const WithoutActions: Story = {
  args: {
    title: "アクションなしのカード",
    description: "アクションが含まれていないカードの説明。",
  },
};

// --- 画像付きカード ---
export const WithImage: Story = {
  args: {
    title: "画像付きカード",
    description: "画像がカード上部に表示されます。",
    imageUrl:
      "https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=800&q=80",
  },
};

export const ExpandableDescription: Story = {
  args: {
    title: "展開可能な説明カード",
    description:
      "ここに長めの説明文が入ります。展開ボタンをクリックするとこの部分が表示され、再クリックで折りたたまれます。",
    expandableDescription: true,
    expandedInitially: false,
  },
};
