// app/users/page.tsx
"use client";
import UserList from "@/components/UserList";
import { Alert, Box, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { User } from "../../types/User";
import { fetchUsers } from "../../utils/api";
const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        console.log(data);
        setUsers(data);
      } catch (err) {
        setError("ユーザーの取得に失敗しました。" + err);
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);
  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        ユーザー一覧
      </Typography>
      <UserList initialUsers={users} />
    </Box>
  );
};
export default UsersPage;
