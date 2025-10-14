// components/parts/CustomModal.stories.tsx

import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import CustomModal from "./CustomModal";
import CustomButton from "./CustomButton";
import { Box } from "@mui/material";

// TODO: メタデータ
const meta: Meta<typeof CustomModal> = {
  title: "Parts/CustomModal",
  component: CustomModal,
};
export default meta;

// TODO: ストーリーの定義
type Story = StoryObj<typeof CustomModal>;

// TODO: デフォルトストーリーの作成
export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <Box>
         {/*TODO: クリックでモーダル開閉させる*/}
        <CustomButton variantType="primary" onClick={() => setOpen(true)}>
          モーダルを開く
        </CustomButton>
        <CustomModal
        // TODO: Propを渡す
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
