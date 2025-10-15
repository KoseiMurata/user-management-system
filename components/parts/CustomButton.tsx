// components/parts/CustomButton.tsx

import React from "react";
import { Button, ButtonProps, CircularProgress } from "@mui/material";

interface CustomButtonProps extends ButtonProps {
  variantType?: "primary" | "secondary" | "danger";
  loading?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  variantType = "primary",
  variant = "contained",
  loading = false,
  startIcon,
  endIcon,
  children,
  ...props
}) => {
  let color: ButtonProps["color"] = "primary";

  // TODO: variantTypeに応じてcolorを変化させる
  // colorに設定する色は調べて実装する

  switch (variantType) {
    case "secondary":
      color = "secondary";
      break;
    case "danger":
      color = "error";
      break;
    default:
      color = "primary";
  }

  return (
    // TODO: <Button>の実装
    // プロップスには[color][variant]を設定し、{...props}を最後に設定する
    <Button
      color={color}
      variant={variant}
      disabled={loading || props.disabled}
      startIcon={!loading ? startIcon : undefined} // ローディング時はアイコンを消す
      endIcon={!loading ? endIcon : undefined}
      {...props}
    >
      {loading ? <CircularProgress size={20} color="inherit" /> : children}
    </Button>
  );
};

export default CustomButton;
