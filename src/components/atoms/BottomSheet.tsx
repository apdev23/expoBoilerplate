import React, { useState, forwardRef, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

const BottomSheet = forwardRef(({ title, children }, ref) => {
  const snapPoints = ["25%", "50%", "75%"];

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      backdropComponent={(props) => <BottomSheetModal.Backdrop {...props} />}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.sheetTitle}>{title}</Text>
        {children}
      </View>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  button: {
    backgroundColor: "#6200ea",
    padding: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  sheetContent: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 8,
  },
});

export default BottomSheet;
