import React from "react";
import { User } from "../types/User";
import UserCard from "./UserCard";
import { Box, Typography } from "@mui/material";

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
   <Box>
      <Typography variant="h4" gutterBottom>
        ユーザー一覧
      </Typography>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </Box>
  );
};

export default UserList;