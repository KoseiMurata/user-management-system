import { Button } from "@mui/material";
import React from "react";
import { softDeleteUser } from "../utils/api";

interface DeleteUserButtonProps {
  userId: number;
  onDelete: (userId: number) => void;
}

const DeleteUserButton: React.FC<DeleteUserButtonProps> = ({
  userId,
  onDelete,
}) => {
  const handleDelete = async () => {
    if (confirm("本当にこのユーザーを削除しますか？")) {
      try {
        await softDeleteUser(userId);
        onDelete(userId);
      } catch (error) {
        error;
      }
    }
  };

  return (
    <Button color="error" size="small" onClick={handleDelete}>
      削除
    </Button>
  );
};

export default DeleteUserButton;
