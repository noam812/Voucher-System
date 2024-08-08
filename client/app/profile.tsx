import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, FlatList } from "react-native";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "expo-router";
import PurchasedVoucherItem from "@/components/PurchasedVoucherItem";
import { getUserPurchasedVouchers } from "../services/api";

const ProfileScreen = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const [purchasedVouchers, setPurchasedVouchers] = useState<Array<{ _id: string; voucher: string; purchaseDate: Date }>>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUserVouchers = async () => {
      try {
        const userPurchasedVouchers = await getUserPurchasedVouchers(user._id);
        setPurchasedVouchers(userPurchasedVouchers);
      } catch (error) {
        console.error("Error fetching vouchers:", error);
      }
    };

    if (user) {
      fetchUserVouchers();
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (!isLoggedIn) {
    return (
      <Text style={styles.loginMessage}>
        You need to log in to your account
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{user.email}</Text>
      <Text style={styles.balance}>Balance: ${user.balance}</Text>
      <Text style={styles.sectionTitle}>Vouchers:</Text>
      <FlatList
        data={purchasedVouchers}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <PurchasedVoucherItem
            voucherId={item.voucher}
            voucherPurchaseDate={item.purchaseDate}
          />
        )}
      />
      <Button title="Logout" onPress={handleLogout} color="#ff132a" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  balance: {
    fontSize: 18,
    color: "white",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  loginMessage: {
    color: "white",
    textAlign: "center",
    marginTop: 20,
  },
});

export default ProfileScreen;
