import React, { useState } from "react";
import { User } from "../types/User";
import { Box, Typography } from "@mui/material";
import CustomCard from "./parts/CustomCard";
import CustomButton from "./parts/CustomButton";
import Link from "next/link";
import { softDeleteUser } from "@/utils/api";
import CustomModal from "./parts/CustomModal";

interface UserListProps {
  initialUsers: User[];
}

const UserList: React.FC<UserListProps> = ({ initialUsers }) => {
  const [filterUsers, setFilterUsers] = useState<User[]>(initialUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const handleDelete = async (deletedUserId: number) => {
    try {
      await softDeleteUser(deletedUserId);
      setFilterUsers((prev) =>
        prev.filter((user) => user.id !== deletedUserId && !user.deleted)
      );
    } catch (error) {
      console.error("削除に失敗しました", error);
    }
  };

  const handleConfirm = () => {
    if (selectedUserId !== null) {
      handleDelete(selectedUserId);
      setIsModalOpen(false);
      setSelectedUserId(null);
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
                onClick={() => {
                  setSelectedUserId(user.id);
                  setIsModalOpen(true);
                }}
              >
                削除
              </CustomButton>
            </>
          }
        />
      ))}

      <CustomModal
        open={isModalOpen}
        title="ユーザー削除確認"
        content="本当にこのユーザーを削除しますか？"
        onClose={() => {
          setIsModalOpen(false);
          setSelectedUserId(null);
        }}
        onConfirm={handleConfirm}
      />
    </Box>
  );
};

export default UserList;
