import React from "react";
import { Text } from "react-native";
import type { TextProps } from "react-native";
import { CustomTextProps } from "./TextRegular";

export default function TextBold({
  size = 16,
  color,
  center,
  children,
  ...props
}: CustomTextProps) {
  return (
    <Text
      style={{
        fontSize: size,
        fontFamily: "Poppins Bold",
        color: color,
        textAlign: center ? "center" : "left",
        textAlignVertical: center ? "center" : "auto",
      }}
      {...props}>
      {children}
    </Text>
  );
}
