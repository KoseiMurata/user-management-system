// components/parts/CustomModal.stories.tsx

import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import CustomModal from "./CustomModal";
import CustomButton from "./CustomButton";
import { Box } from "@mui/material";

// TODO: メタデータ
const meta: Meta<typeof CustomModal> = {
  title: "Components/Parts/CustomModal",
  component: CustomModal,
  tags: ["autodocs"],
  argTypes: {
    animationType: {
      control: { type: "select" },
      options: ["fade", "slide", "none"],
    },
    showForm: { control: "boolean" },
  },
};
export default meta;

// TODO: ストーリーの定義
type Story = StoryObj<typeof CustomModal>;

// TODO: デフォルトストーリーの作成
export const Default: Story = {
  args: {
    open: false,
    title: "アニメーションモーダル",
    content: "animationTypeを切り替えて確認できます。",
    animationType: "fade",
  },
  render: (args) => {
    const [open, setOpen] = useState(false);

    return (
      <Box>
        {/*TODO: クリックでモーダル開閉させる*/}
        <CustomButton variantType="primary" onClick={() => setOpen(true)}>
          モーダルを開く
        </CustomButton>
        <CustomModal
          // TODO: Propを渡す
          {...args}
          open={open}
          title="確認"
          content="この操作を実行しますか"
          // onCloceはsetOpenにfalseを渡す
          onClose={() => setOpen(false)}
          // onConfirmはalert()を使ってクリックしたことを知らせて
          // setOpenにfalseを渡す
          onConfirm={() => {
            alert("確認ボタンが押されました");
            setOpen(false);
          }}
        />
      </Box>
    );
  },
};

// --- フォーム付き ---
export const FormModal: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <Box>
        <CustomButton variantType="primary" onClick={() => setOpen(true)}>
          フォームモーダルを開く
        </CustomButton>
        <CustomModal
          open={open}
          title="フォーム入力"
          onClose={() => setOpen(false)}
          onConfirm={() => setOpen(false)}
          showForm
          animationType="fade"
        />
      </Box>
    );
  },
};
