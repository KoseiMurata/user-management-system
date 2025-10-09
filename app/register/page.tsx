// app/register/page.tsx

"use client"; // クライアントコンポーネントとしてマーク

import React from "react";
import RegisterForm from "../../components/RegisterForm";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

// TODO: 新規登録ページを実装し、RegisterFormコンポーネントを使用する
const RegisterPage: React.FC = () => {
  const router = useRouter();

  const handleSuccess = () => {
    router.push("/users");
  };
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        新規ユーザー登録
      </Typography>
      <RegisterForm onSuccess={handleSuccess} />
    </Box>
  );
};

export default RegisterPage;
