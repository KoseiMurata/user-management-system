// components/EditUserForm.tsx

"use client";

import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { fetchUserById, updateUser } from "../utils/api";

interface EditUserFormInputs {
  name: string;
  email: string;
  role: string;
}

interface EditUserFormProps {
  userId: number;
  onSuccess?: () => void;
  onError?: (error: any) => void;
  disabled?: boolean;
}

const EditUserForm: React.FC<EditUserFormProps> = ({
  userId,
  onSuccess,
  onError,
  disabled = false,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EditUserFormInputs>();

  useEffect(() => {
    const loadUser = async () => {
      const fetchedUser = await fetchUserById(userId);
      if (fetchedUser) {
        setValue("name", fetchedUser.name);
        setValue("email", fetchedUser.email);
        setValue("role", fetchedUser.role);
      }
    };
    loadUser();
  }, [userId, setValue]);

  const onSubmit: SubmitHandler<EditUserFormInputs> = async (data) => {
    try {
      await updateUser(userId, data);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      console.error("更新エラー:", error);
      if (onError) {
        onError(error);
      }
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        ユーザー編集
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="名前"
          fullWidth
          margin="normal"
          {...register("name", { required: "名前は必須です" })}
          disabled={disabled}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="メールアドレス"
          type="email"
          fullWidth
          margin="normal"
          {...register("email", {
            required: "メールアドレスは必須です",
            pattern: {
              value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
              message: "有効なメールアドレスを入力してください",
            },
          })}
          disabled={disabled}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="役職"
          fullWidth
          margin="normal"
          {...register("role", { required: "役職は必須です" })}
          disabled={disabled}
          InputLabelProps={{ shrink: true }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={disabled}
        >
          更新
        </Button>
      </form>
    </Box>
  );
};

export default EditUserForm;
