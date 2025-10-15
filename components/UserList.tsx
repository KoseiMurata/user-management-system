import React, { useEffect, useState } from "react";
import { User } from "../types/User";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Paper,
  Button,
} from "@mui/material";
import CustomCard from "./parts/CustomCard";
import CustomButton from "./parts/CustomButton";
import { softDeleteUser } from "@/utils/api";
import CustomModal from "./parts/CustomModal";
import Link from "next/link";

interface UserListProps {
  initialUsers: User[];
}

const UserList: React.FC<UserListProps> = ({ initialUsers }) => {
  const [filterUsers, setFilterUsers] = useState<User[]>(initialUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<
    "delete" | "detail" | "edit" | null
  >(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  // 🔹検索・ソート状態
  const [selectedId, setSelectedId] = useState<string>("all");
  const [selectedRole, setSelectedRole] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // 🔹プルダウン用データ
  const uniqueIds = Array.from(
    new Set(initialUsers.map((user) => user.id.toString()))
  );
  const uniqueRoles = Array.from(
    new Set(initialUsers.map((user) => user.role))
  );

  useEffect(() => {
    let filtered = initialUsers;

    if (selectedId !== "all") {
      filtered = filtered.filter((user) => user.id.toString() === selectedId);
    }

    if (selectedRole !== "all") {
      filtered = filtered.filter((user) => user.role === selectedRole);
    }

    filtered.sort((a, b) => (sortOrder === "asc" ? a.id - b.id : b.id - a.id));
    setFilterUsers(filtered);
  }, [selectedId, selectedRole, sortOrder, initialUsers]);

  // 🔹編集結果反映
  const handleUpdateUser = (updatedData: {
    name: string;
    email: string;
    role: string;
  }) => {
    if (!selectedUser) return;
    setFilterUsers((prev) =>
      prev.map((u) => (u.id === selectedUser.id ? { ...u, ...updatedData } : u))
    );
  };

  const handleDelete = async (deletedUserId: number) => {
    try {
      setLoading(true);
      await softDeleteUser(deletedUserId);
      setFilterUsers((prev) =>
        prev.filter((user) => user.id !== deletedUserId && !user.deleted)
      );
    } catch (error) {
      console.error("削除に失敗しました", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹モーダル確定
  const handleConfirm = (updatedData?: {
    name: string;
    email: string;
    role: string;
  }) => {
    if (modalType === "delete" && selectedUser) {
      handleDelete(selectedUser.id);
    } else if (modalType === "edit" && updatedData) {
      handleUpdateUser(updatedData);
    }
    setIsModalOpen(false);
    setSelectedUser(null);
    setModalType(null);
  };

  // 🔹モーダルを開く
  const openModal = (type: "delete" | "detail" | "edit", user: User) => {
    setSelectedUser(user);
    setModalType(type);
    setIsModalOpen(true);
  };

  // 🔹モーダルを閉じる
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    setModalType(null);
  };

  return (
    <Box>
      {/* タイトル */}
      <Typography
        variant="h6"
        fontWeight="bold"
        mb={2}
        sx={{ color: "#333", fontSize: "1.1rem" }}
      >
        ユーザー検索
      </Typography>

      {/* 検索セクション */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 3,
          display: "flex",
          alignItems: "center",
          gap: 2,
          flexWrap: "wrap",
          backgroundColor: "#fff",
          borderRadius: 2,
          border: "1px solid #ddd",
        }}
      >
        {/* ID プルダウン */}
        <FormControl size="small" variant="standard" sx={{ minWidth: 120 }}>
          <InputLabel>ID</InputLabel>
          <Select
            value={selectedId}
            label="ID"
            onChange={(e) => setSelectedId(e.target.value)}
          >
            <MenuItem value="all">all</MenuItem>
            {uniqueIds.map((id) => (
              <MenuItem key={id} value={id}>
                {id}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* 役職プルダウン */}
        <FormControl size="small" variant="standard" sx={{ minWidth: 150 }}>
          <InputLabel>役職</InputLabel>
          <Select
            value={selectedRole}
            label="役職"
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <MenuItem value="all">all</MenuItem>
            {uniqueRoles.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* 並び替えボタン（↑昇順↑ / ↓降順↓） */}
        <Button
          variant="outlined"
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          sx={{
            textTransform: "none",
            borderRadius: "8px",
            color: "#333",
            borderColor: "#ccc",
            px: 2,
            minWidth: 130,
            height: "40px",
            fontSize: "0.9rem",
            fontWeight: 500,
            backgroundColor: "#fff",
            "&:hover": { backgroundColor: "#f9f9f9", borderColor: "#aaa" },
          }}
        >
          {sortOrder === "asc" ? "↑ 昇順 ↑" : "↓ 降順 ↓"}
        </Button>
      </Paper>

      {/* 一覧 */}
      {filterUsers.length > 0 ? (
        filterUsers.map((user) => (
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
                  label="詳細"
                  loading={isModalOpen}
                  onClick={() => openModal("detail", user)}
                />
                <CustomButton
                  variantType="secondary"
                  size="small"
                  label="モーダル"
                  loading={isModalOpen}
                  onClick={() => openModal("edit", user)}
                />
                <CustomButton
                  variantType="danger"
                  size="small"
                  onClick={() => openModal("delete", user)}
                  label="削除"
                  loading={isModalOpen}
                />
                <CustomButton
                  variantType="secondary"
                  size="small"
                  component={Link}
                  href={`/users/${user.id}/edit`}
                  label="編集"
                  loading={isModalOpen}
                />
              </>
            }
            expandableDescription={true}
            bgColor={user.id % 2 === 0 ? "#f0f7ff" : "#f9f9f9"}
          />
        ))
      ) : (
        <Typography color="text.secondary">
          該当するユーザーがいません。
        </Typography>
      )}

      {/* モーダル */}
      {selectedUser && (
        <CustomModal
          key={selectedUser.id}
          open={isModalOpen}
          title={
            modalType === "delete"
              ? "ユーザー削除確認"
              : modalType === "edit"
              ? "ユーザー編集"
              : "ユーザー詳細"
          }
          content={
            modalType === "delete"
              ? "本当にこのユーザーを削除しますか？"
              : modalType === "detail"
              ? `名前: ${selectedUser.name}\nメール: ${selectedUser.email}\n役職: ${selectedUser.role}`
              : undefined
          }
          animationType="slide"
          showForm={modalType === "edit"}
          defaultValues={
            modalType === "edit"
              ? {
                  name: selectedUser.name,
                  email: selectedUser.email,
                  role: selectedUser.role,
                }
              : undefined
          }
          onClose={closeModal}
          onConfirm={handleConfirm}
        />
      )}
    </Box>
  );
};

export default UserList;
