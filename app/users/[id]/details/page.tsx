"use client";

import React, { useEffect, useState } from "react";
import UserDetails from "@/components/UserDetails";
import { Alert, Box, CircularProgress, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import { fetchUserById } from "@/utils/api";
import { User } from "@/types/User";

const UserDetailsPage: React.FC = () => {
  const { id } = useParams();
  const userId = Number(id);

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await fetchUserById(userId);
        setUser(data);
      } catch (err) {
        setError("ユーザー情報の取得に失敗しました。");
      } finally {
        setLoading(false);
      }
    };

    if (userId) loadUser();
  }, [userId]);

  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }
  if (!user) return null;
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        ユーザー詳細
      </Typography>
      <UserDetails user={user} />
    </Box>
  );
};

export default UserDetailsPage;
