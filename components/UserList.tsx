import React, { useEffect, useState } from "react";
import { User } from "../types/User";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
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
  const [selectedId, setSelectedId] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const uniqueIds = Array.from(
    new Set(initialUsers.map((user) => user.id.toString()))
  );
  const uniqueRoles = Array.from(
    new Set(initialUsers.map((user) => user.role))
  );
  useEffect(() => {
    let filtered = initialUsers;

    if (selectedId) {
      filtered = filtered.filter((user) => user.id.toString() === selectedId);
    }

    if (selectedRole) {
      filtered = filtered.filter((user) => user.role === selectedRole);
    }
    filtered.sort((a, b) => (sortOrder === "asc" ? a.id - b.id : b.id - a.id));
    setFilterUsers(filtered);
  }, [selectedId, selectedRole, initialUsers, sortOrder]);

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
      <Box display="flex" gap={2} mb={3}>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>ID</InputLabel>
          <Select
            value={selectedId}
            label="ID"
            onChange={(e) => setSelectedId(e.target.value)}
          >
            <MenuItem value="">all</MenuItem>
            {uniqueIds.map((id) => (
              <MenuItem key={id} value={id}>
                {id}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>役職</InputLabel>
          <Select
            value={selectedRole}
            label="役職"
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <MenuItem value="">all</MenuItem>
            {uniqueRoles.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>並び替え</InputLabel>
          <Select
            value={sortOrder}
            label="並び替え"
            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          >
            <MenuItem value="asc">ID昇順</MenuItem>
            <MenuItem value="desc">ID降順</MenuItem>
          </Select>
        </FormControl>
      </Box>
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
