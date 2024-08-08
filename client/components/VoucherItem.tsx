import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useAuth } from "../context/AuthContext";

interface VoucherItemProps {
  company: string;
  cost: number;
  amount: number;
  onPurchase: () => void;
}

const VoucherItem: React.FC<VoucherItemProps> = ({
  company,
  cost,
  amount,
  onPurchase,
}) => {
  const { isLoggedIn } = useAuth();

  const handlePurchase = () => {
    if (!isLoggedIn) {
      Alert.alert("Not Logged In", "You need to log in to purchase a voucher.");
      return;
    }
    onPurchase();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.company}>{company}</Text>
      <Text style={styles.cost}>${cost}</Text>
      <Text style={styles.amount}>{amount}</Text>

      <TouchableOpacity style={styles.button} onPress={handlePurchase}>
        <Text style={styles.buttonText}>Purchase</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ff132a",
    backgroundColor: "black",
  },
  company: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  cost: {
    fontSize: 16,
    color: "white",
  },
  amount: {
    fontSize: 16,
    color: "white",
  },
  button: {
    backgroundColor: "#ff132a",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default VoucherItem;
