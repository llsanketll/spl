import React from "react";
import { Text } from "react-native";
import { CustomTextProps } from "./TextRegular";

export default function TestSemi({ size = 16, color, children, ...props }: CustomTextProps) {
  return (
    <Text
      style={{
        fontSize: size,
        fontFamily: "Poppins SemiBold",
        color: color,
      }}
      {...props}>
      {children}
    </Text>
  );
}
