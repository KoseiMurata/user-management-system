import { User } from "../types/User";
import { supabase } from "./supabaseClient";

export const fetchUsers = async (): Promise<User[]> => {
  const { data, error } = await supabase
    .from("dev_users")
    .select("*")
    .eq("deleted", false);

  if (error) {
    throw error;
  }
  return data as User[];
};

export const fetchUserById = async (id: number): Promise<User | null> => {
  const { data, error } = await supabase
    .from("dev_users")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      // No rows found
      return null;
    }
    throw error;
  }

  return data as User;
};

export const createUser = async (
  user: Omit<User, "id" | "deleted">
): Promise<User> => {
  const { data, error } = await supabase
    .from("dev_users")
    .insert(user)
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data as User;
};

export const updateUser = async (
  id: number,
  user: Partial<User>
): Promise<User> => {
  const { data, error } = await supabase
    .from("dev_users")
    .update(user)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data as User;
};

export const softDeleteUser = async (id: number): Promise<void> => {
  const { error } = await supabase
    .from("dev_users")
    .update({ deleted: true })
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    throw error;
  }
};

export const deleteUser = async (id: number): Promise<void> => {
  const { error } = await supabase.from("dev_users").delete().eq("id", id);

  if (error) {
    throw error;
  }
};
