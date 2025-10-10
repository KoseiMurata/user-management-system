"use client"

import { User } from "@/types/User";
import { Card, CardContent, Typography } from "@mui/material";

interface UserDetailsProps {
  user: User;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
  return (
    <Card sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          名前: {user.name}
        </Typography>
        <Typography variant="h6" gutterBottom>
          メール: {user.email}
        </Typography>
        <Typography variant="h6">役割: {user.role}</Typography>
      </CardContent>
    </Card>
  );
};

export default UserDetails;
