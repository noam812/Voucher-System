import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import { getVouchers, purchaseVoucher } from "../services/api";
import VoucherItem from "@/components/VoucherItem";
import { Link } from "expo-router";

const HomeScreen = () => {
  const [vouchers, setVouchers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulating login state

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const voucherList = await getVouchers();
        setVouchers(voucherList);
      } catch (error) {
        console.error("Error fetching vouchers:", error);
      }
    };

    fetchVouchers();
  }, []);

  const handlePurchase = async (voucherId: string) => {
    try {
      await purchaseVoucher(voucherId);
      // Refresh voucher list or update local state
      const updatedVouchers = await getVouchers();
      setVouchers(updatedVouchers);
    } catch (error) {
      console.error("Error purchasing voucher:", error);
    }
  };

  const handleLoginLogout = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Link href="/profile">Profile</Link>
        <Link href="/login">Login</Link>

        <TouchableOpacity onPress={() => console.log("Navigate to Profile")}>
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
      <Button title="Refresh" onPress={() => fetchVouchers()} />
      <Text>Check out our Vouchers</Text>
      <FlatList
        data={vouchers}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <VoucherItem
            company={item.company}
            cost={item.cost}
            amount={item.amount}
            onPurchase={() => handlePurchase(item._id, user)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#007AFF",
  },
  navText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HomeScreen;
