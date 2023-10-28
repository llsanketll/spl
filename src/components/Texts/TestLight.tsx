import React from "react";
import { Text } from "react-native";
import type { TextProps } from "react-native";

export type CustomTextProps = TextProps & {
  size?: number;
  color?: string;
};

const TextLight = ({
  size = 16,
  children,
  color,
  ...props
}: CustomTextProps) => {
  return (
    <Text
      style={{ fontSize: size, fontFamily: "Poppins Light", color: color }}
      {...props}>
      {children}
    </Text>
  );
};

export default TextLight;
