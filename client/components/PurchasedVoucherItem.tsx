import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getVoucherById } from "../services/api";

interface PurchasedVoucherItemProps {
  voucherId: string;
  voucherPurchaseDate: Date;
}

const PurchasedVoucherItem: React.FC<PurchasedVoucherItemProps> = ({
  voucherId,
  voucherPurchaseDate,
}) => {
  const [voucher, setVoucher] = useState<null | any>(null);

  useEffect(() => {
    const fetchVoucher = async () => {
      try {
        const voucherDetails = await getVoucherById(voucherId);
        setVoucher(voucherDetails);
      } catch (error) {
        console.error("Error fetching voucher details:", error);
      }
    };

    fetchVoucher();
  }, [voucherId]);

  if (!voucher) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.company}>{voucher.company}</Text>
      <Text style={styles.cost}>${voucher.cost}</Text>
      <Text style={styles.purchaseDate}>
        Purchased on: {new Date(voucherPurchaseDate).toLocaleDateString()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  purchaseDate: {
    fontSize: 16,
    color: "white",
  },
  loadingText: {
    color: "white",
    textAlign: "center",
    marginTop: 20,
  },
});

export default PurchasedVoucherItem;
