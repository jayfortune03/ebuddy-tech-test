"use client";

import { Box, Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "./lib/axios";

import { useRouter } from "next/navigation";
import {
  fetchUsersFailure,
  fetchUsersStart,
  fetchUsersSuccess,
  User,
} from "./store/userSlice";
import { RootState } from "./store";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { users, loading, error } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchUsersStart()); // Set loading state

      try {
        const response = await axiosInstance.get("/users");
        console.log("Fetched data:", response.data);
        dispatch(fetchUsersSuccess(response.data)); // Store users in Redux
      } catch (error) {
        console.error("Error fetching data", error);
        dispatch(fetchUsersFailure("Failed to fetch users"));
      }
    };

    fetchData();
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/logout");
      router.replace("/auth/login");
    } catch (err) {
      console.log(
        `🥶🥶🥶🥶 ~ フ ク ロ ウ handleLogout ~ フ ク ロ ウ err:`,
        err
      );
    }
  };

  return (
    <Box
      sx={{
        background: "#F2F3F4",
        paddingX: "5rem",
        paddingY: "3rem",
        width: "100dvw",
        height: "100dvh",
      }}
    >
      <Typography variant="h4">Users List</Typography>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography>{error}</Typography>
      ) : users.length > 0 ? (
        <ul>
          {users.map((user: User) => (
            <li key={user.id}>{user.name}</li> // Replace `user.name` with actual data from the response
          ))}
        </ul>
      ) : (
        <Typography>No users found</Typography>
      )}

      <Button size="large" onClick={() => handleLogout()}>
        Logout here
      </Button>
    </Box>
  );
}
