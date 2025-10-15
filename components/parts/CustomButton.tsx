// components/parts/CustomButton.tsx

import React, { useState } from "react";
import { Box, Button, ButtonProps, CircularProgress } from "@mui/material";
import { Delete, Edit, Visibility } from "@mui/icons-material";

interface CustomButtonProps extends ButtonProps {
  variantType?: "primary" | "secondary" | "danger";
  loading?: boolean;
  label?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  variantType = "primary",
  variant = "contained",
  loading = false,
  label = "",
  children,
  ...props
}) => {
  const [hovered, setHovered] = useState(false);

  let color: ButtonProps["color"] = "primary";
  let icon: React.ReactNode;

  // TODO: variantTypeに応じてcolorを変化させる
  // colorに設定する色は調べて実装する

  switch (variantType) {
    case "secondary":
      color = "secondary";
      icon = <Edit fontSize="small" />;
      break;
    case "danger":
      color = "error";
      icon = <Delete fontSize="small" />;
      break;
    default:
      color = "primary";
      icon = <Visibility fontSize="small" />;
  }
  return (
    // TODO: <Button>の実装
    // プロップスには[color][variant]を設定し、{...props}を最後に設定する
    <Button
      color={color}
      variant={variant}
      disabled={loading || props.disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...props}
    >
      {loading ? (
        <CircularProgress size={20} color="inherit" />
      ) : hovered ? (
        <Box component="span">{label}</Box>
      ) : (
        icon
      )}
    </Button>
  );
};

export default CustomButton;
