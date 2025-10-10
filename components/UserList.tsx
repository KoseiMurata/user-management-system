import React, { useState } from "react";
import { User } from "../types/User";
import UserCard from "./UserCard";
import { Box } from "@mui/material";

interface UserListProps {
  initialUsers: User[];
}

const UserList: React.FC<UserListProps> = ({ initialUsers }) => {
  const [filterUsers, setFilterUsers] = useState<User[]>(initialUsers);

  const handleDelete = (deletedUserId: number) => {
    setFilterUsers((e) => e.filter((user) => user.id !== deletedUserId && !user.deleted));
  };

  return (
    <Box>
      {filterUsers.map((user) => (
        <UserCard key={user.id} user={user} onDelete={handleDelete} />
      ))}
    </Box>
  );
};

export default UserList;