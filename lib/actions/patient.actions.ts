/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

// import { ID, Query } from "node-appwrite";
import { users, ID } from "../appwrite.config";
import { parseStringify } from "../utils";

// CREATE APPWRITE USER
export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create(
      ID.unique(), // Let Appwrite auto-generate a unique userId
      user.email,
      user.password,
      user.name
    );
    return parseStringify(newUser);
  } catch (error: any) {
    console.error("An error occurred while creating a new user:", error);
    throw error;
  }
};

// GET USER
export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);

    return parseStringify(user);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the user details:",
      error
    );
  }
};

// export const createUser = async (user: CreateUserParams) => {}
