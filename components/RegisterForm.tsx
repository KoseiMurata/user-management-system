// components/RegisterForm.tsx

import { useForm, SubmitHandler } from "react-hook-form";
import { TextField, Button, Box } from "@mui/material";
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
  } = useForm<RegisterFormInputs>({ criteriaMode: "all" });

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="名前"
          fullWidth
          margin="normal"
          {...register("name", {
            required: "名前は必須です",
            minLength: {
              value: 2,
              message: "名前は2文字以上で入力してください",
            },
            maxLength: {
              value: 8,
              message: "名前は8文字以内で入力してください",
            },
            pattern: {
              value: /^[A-Za-z0-9ぁ-んァ-ヶー一-龠]+$/,
              message: "名前に記号は使用できません",
            },
          })}
          error={!!errors.name}
          helperText={
            errors.name?.types
              ? Object.values(errors.name.types).map((msg, i) => (
                  <div key={i}>{msg}</div>
                ))
              : errors.name?.message
          }
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
              value: /^[A-Za-z0-9._%+-]+@(gmail\.com|fox-hound\.co\.jp)$/,
              message:
                "使用できるドメインは gmail.com または fox-hound.co.jp のみです",
            },
          })}
          error={!!errors.email}
          helperText={
            errors.email?.types
              ? Object.values(errors.email.types).map((msg, i) => (
                  <div key={i}>{msg}</div>
                ))
              : errors.email?.message
          }
          disabled={disabled}
        />
        <TextField
          label="役職"
          fullWidth
          margin="normal"
          {...register("role", {
            required: "役職は必須です",
            validate: (value) => {
              const allowedRoles = ["admin", "guest", "一般ユーザー"];
              return (
                allowedRoles.includes(value) ||
                "役割は admin, guest, 一般ユーザー のいずれかを入力してください"
              );
            },
          })}
          error={!!errors.role}
          helperText={
            errors.role?.types
              ? Object.values(errors.role.types).map((msg, i) => (
                  <div key={i}>{msg}</div>
                ))
              : errors.role?.message
          }
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
