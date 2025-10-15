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
  const [selectedId, setSelectedId] = useState<string>("all");
  const [selectedRole, setSelectedRole] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const uniqueIds = Array.from(new Set(initialUsers.map((user) => user.id.toString())));
  const uniqueRoles = Array.from(new Set(initialUsers.map((user) => user.role)));

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
                <Typography variant="body2">{user.email}</Typography>
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
        ))
      ) : (
        <Typography color="text.secondary">該当するユーザーがいません。</Typography>
      )}

      {/* モーダル */}
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