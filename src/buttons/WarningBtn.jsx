import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const SecondaryBtn = ({ style }) => {
  const secondarybtn = () => {
    alert("Secondary button clicked.");
  };
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={secondarybtn}>
      <Text style={styles.buttonText}>
        Secondary Button
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 18 20"
          width={24}
          height={24}
          fill={"none"}
        >
          <path
            d="M5 14L8.5 17.5L19 6.5"
            stroke="currentColor"
          />
        </svg>
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "transparent",
    borderColor: "grey",
    borderWidth: 2,
    alignItems: "center",
    height:50
  },
  buttonText: {
    color: "rgb(31 30 30)",
    fontSize: 24,
    marginTop:"-7%",

  },
});

export default SecondaryBtn;