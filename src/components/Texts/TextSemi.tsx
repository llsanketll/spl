import React from "react";
import { Text } from "react-native";
import { CustomTextProps } from "./TextRegular";

export default function TestSemi({
  size = 16,
  children,
  ...props
}: CustomTextProps) {
  return (
    <Text
      style={{
        fontSize: size,
        fontFamily: "Poppins SemiBold",
      }}
      {...props}>
      {children}
    </Text>
  );
}
