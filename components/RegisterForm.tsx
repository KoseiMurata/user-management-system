// components/RegisterForm.tsx

import { useForm, SubmitHandler } from "react-hook-form";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { createUser } from "../utils/api";

// 必要に応じて利用する
interface RegisterFormInputs {
  name: string;
  email: string;
  role: string;
}

interface RegisterFormProps {
  onSuccess?: () => void;
  onError?: (error: any) => void;
  disabled?: boolean;
}

// TODO: 新規登録フォームコンポーネントを実装する
const RegisterForm: React.FC<RegisterFormProps> = ({
  onSuccess,
  onError,
  disabled = false,
}) => {
  // 必要に応じて利用する
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    try {
      await createUser({
        name: data.name,
        email: data.email,
        role: data.role,
      });
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      console.error("登録エラー:", error);
      if (onError) {
        onError(error);
      }
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        新規ユーザー登録
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="名前"
          fullWidth
          margin="normal"
          {...register("name", { required: "名前は必須です" })}
          disabled={disabled}
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
        />
        <TextField
          label="役職"
          fullWidth
          margin="normal"
          {...register("role", { required: "役職は必須です" })}
          disabled={disabled}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={disabled}
        >
          登録
        </Button>
      </form>
    </Box>
  );
};

export default RegisterForm;
