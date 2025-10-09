// app/register/page.tsx

'use client'; // クライアントコンポーネントとしてマーク

import React from 'react';
import RegisterForm from '../../components/RegisterForm';
import { Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

// TODO: 新規登録ページを実装し、RegisterFormコンポーネントを使用する
const RegisterPage: React.FC = () => {
  const router = useRouter();

  const handleSuccess = () => {
    router.push("/users");
  }
  return (
    <Typography>
        <RegisterForm onSuccess={handleSuccess} />
    </Typography>
  );
}

export default RegisterPage;