// components/parts/CustomModal.stories.tsx

import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import CustomModal from "./CustomModal";
import CustomButton from "../../components/parts/CustomButton";
import { Box } from "@mui/material";

// TODO: メタデータ
// TODO: ストーリーの定義

// TODO: デフォルトストーリーの作成
export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <Box>
        // TODO: クリックでモーダル開閉させる
        <CustomButton variantType="primary" onClick={}>
          モーダルを開く
        </CustomButton>
        <CustomModal
        // TODO: Propを渡す
        // onCloceはsetOpenにfalseを渡す
        // onConfirmはalert()を使ってクリックしたことを知らせて
        // setOpenにfalseを渡す
        />
      </Box>
    );
  },
};
