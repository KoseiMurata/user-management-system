import React, { useState } from "react";
import { User } from "../types/User";
import UserCard from "./UserCard";
import { Box, Typography } from "@mui/material";

interface UserListProps {
  initialUsers: User[];
}

const UserList: React.FC<UserListProps> = ({ initialUsers }) => {
  const [filterUsers, setFilterUsers] = useState<User[]>(initialUsers);

  return (
   <Box>
      {filterUsers.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </Box>
  );
};

export default UserList;