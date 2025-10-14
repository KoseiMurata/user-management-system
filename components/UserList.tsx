import React, { useState } from "react";
import { User } from "../types/User";
import { Box, Typography } from "@mui/material";
import CustomCard from "./parts/CustomCard";
import CustomButton from "./parts/CustomButton";
import Link from "next/link";
import { softDeleteUser } from "@/utils/api";

interface UserListProps {
  initialUsers: User[];
}

const UserList: React.FC<UserListProps> = ({ initialUsers }) => {
  const [filterUsers, setFilterUsers] = useState<User[]>(initialUsers);

  const handleDelete = async (deletedUserId: number) => {
    if (confirm("本当にこのユーザーを削除しますか？")) {
      try {
        await softDeleteUser(deletedUserId);
        setFilterUsers((prev) =>
          prev.filter((user) => user.id !== deletedUserId && !user.deleted)
        );
      } catch (error) {
        console.error("削除に失敗しました", error);
      }
    }
  };

  return (
    <Box>
      {filterUsers.map((user) => (
        <CustomCard
          key={user.id}
          title={user.name}
          description={
            <>
              <Typography variant="body2">メール: {user.email}</Typography>
              <Typography variant="body2">役割: {user.role}</Typography>
            </>
          }
          actions={
            <>
              <CustomButton
                variantType="primary"
                size="small"
                component={Link}
                href={`/users/${user.id}/details`}
              >
                詳細
              </CustomButton>
              <CustomButton
                variantType="secondary"
                size="small"
                component={Link}
                href={`/users/${user.id}/edit`}
              >
                編集
              </CustomButton>
              <CustomButton
                variantType="danger"
                size="small"
                onClick={() => handleDelete(user.id)}
              >
                削除
              </CustomButton>
            </>
          }
        />
      ))}
    </Box>
  );
};

export default UserList;
