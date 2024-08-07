import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

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
  return (
    <View style={styles.container}>
      <Text style={styles.company}>{company}</Text>
      <Text style={styles.cost}>${cost}</Text>
      <Text style={styles.amount}>{amount}</Text>

      <TouchableOpacity style={styles.button} onPress={onPurchase}>
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
    borderBottomColor: "#ccc",
  },
  company: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cost: {
    fontSize: 16,
  },
  amount: {
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default VoucherItem;
