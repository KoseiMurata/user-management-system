// components/parts/CustomModal.tsx

import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Fade,
  Slide,
  TextField,
  Checkbox,
  FormControlLabel,
  useTheme,
} from "@mui/material";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

interface CustomModalProps {
  open: boolean;
  title: string;
  content?: string;
  onClose: () => void;
  onConfirm?: () => void;
  animationType?: "fade" | "slide" | "none";
  showForm?: boolean;
}

// TODO: propの設定
const CustomModal: React.FC<CustomModalProps> = ({
  open,
  title,
  content,
  onClose,
  onConfirm,
  animationType = "fade",
  showForm = false,
}) => {
  const theme = useTheme();
  const [text, setText] = useState("");
  const [checked, setChecked] = useState(false);

  const bgColor =
    theme.palette.mode === "dark"
      ? theme.palette.background.default
      : theme.palette.background.paper;
  const textColor =
    theme.palette.mode === "dark" ? theme.palette.text.primary : "inherit";

  const modalBox = (
    <Box sx={{ ...style, bgcolor: bgColor, color: textColor }}>
      <Typography variant="h6" component="h2" gutterBottom>
        {title}
      </Typography>

      {showForm ? (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="名前"
            value={text}
            onChange={(e) => setText(e.target.value)}
            fullWidth
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
              />
            }
            label="同意します"
          />
        </Box>
      ) : (
        <Typography sx={{ mt: 2 }}>{content}</Typography>
      )}

      <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={onClose} sx={{ mr: 2 }}>
          キャンセル
        </Button>
        {onConfirm && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              if (showForm) {
                alert(`入力値: ${text}\n同意: ${checked ? "はい" : "いいえ"}`);
              }
              onConfirm();
            }}
          >
            確認
          </Button>
        )}
      </Box>
    </Box>
  );

  // アニメーション制御
  const TransitionWrapper = ({ children }: { children: React.ReactNode }) => {
    switch (animationType) {
      case "slide":
        return (
          <Slide direction="up" in={open} mountOnEnter unmountOnExit>
            {children as React.ReactElement}
          </Slide>
        );
      case "none":
        return open ? <>{children}</> : null;
      default:
        return (
          <Fade in={open} timeout={300}>
            {children as React.ReactElement}
          </Fade>
        );
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <TransitionWrapper>{modalBox}</TransitionWrapper>
    </Modal>
  );
};

export default CustomModal;
