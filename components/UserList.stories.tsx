import type { Meta, StoryObj } from "@storybook/react";
import UserList from "./UserList";
import { User } from "../types/User";

const meta: Meta<typeof UserList> = {
  title: "Components/UserList",
  component: UserList,
};

export default meta;

type Story = StoryObj<typeof UserList>;

const users: User[] = [
  {
    id: 1,
    name: "山田 太郎",
    email: "taro.yamada@example.com",
    role: "管理者",
    deleted: false,
  },
  {
    id: 2,
    name: "鈴木 花子",
    email: "hanako.suzuki@example.com",
    role: "一般",
    deleted: false,
  },
];


export const Default: Story = {
  args: {
    users: users
  },
};
