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
import { useAuth } from "../context/AuthContext";

interface Voucher {
  company: string;
  cost: number;
  amount: number;
  _id: string;
}

const HomeScreen = () => {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const { isLoggedIn, user, logout } = useAuth();

  const fetchVouchers = async () => {
    try {
      const voucherList = await getVouchers();
      setVouchers(voucherList);
    } catch (error) {
      console.error("Error fetching vouchers:", error);
    }
  };

  useEffect(() => {
    fetchVouchers();
  }, []);

  const handlePurchase = async (voucherId: string) => {
    if (!isLoggedIn) {
      console.log("You need to log in to purchase a voucher");
      return;
    }
    try {
      await purchaseVoucher(voucherId, user._id);
      // Refresh voucher list or update local state
      await fetchVouchers();
    } catch (error) {
      console.error("Error purchasing voucher:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        {isLoggedIn && user ? (
          <>
            <View style={styles.userInfo}>
              <Text style={styles.navText}>Welcome, {user.email}</Text>
              <Text style={styles.navText}>Balance: ${user.balance}</Text>
            </View>
            <View style={styles.navActions}>
              <TouchableOpacity onPress={logout}>
                <Text style={styles.navText}>Logout</Text>
              </TouchableOpacity>
              <Link href="/profile" style={styles.linkText}>
                Profile
              </Link>
            </View>
          </>
        ) : (
          <Link href="/login" style={styles.linkText}>
            Login/Register
          </Link>
        )}
      </View>
      <Button title="Refresh" onPress={fetchVouchers} color="#ff132a" />
      <Text style={styles.title}>Check out our Vouchers</Text>
      <FlatList
        data={vouchers}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <VoucherItem
            company={item.company}
            cost={item.cost}
            amount={item.amount}
            onPurchase={() => handlePurchase(item._id)}
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
    backgroundColor: "black",
  },
  navbar: {
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#ff132a",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  navActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  navText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  linkText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
});

export default HomeScreen;
