import React from "react";
import { Text } from "react-native";
import type { TextProps } from "react-native";

export type CustomTextProps = TextProps & {
  size?: number;
  color?: string;
};

const TextRegular = ({
  size = 16,
  color,
  children,
  ...props
}: CustomTextProps) => {
  return (
    <Text
      style={{
        fontSize: size,
        fontFamily: "Poppins",
        color: color,
      }}
      {...props}>
      {children}
    </Text>
  );
};

export default TextRegular;
