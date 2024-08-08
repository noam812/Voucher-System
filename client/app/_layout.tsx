import React from "react";
import { Stack } from "expo-router";
import { AuthProvider } from "../context/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="index" />
        <Stack.Screen name="profile"  />
        <Stack.Screen name="login" />
      </Stack>
    </AuthProvider>
  );
}
