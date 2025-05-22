import React from "react";
import { ViewStyle, TextStyle } from "react-native";

type ButtonVariant = "filled" | "outlined" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
    onPress?: () => void;
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
    loading?: boolean;
    children: React.ReactNode;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

export const Button = () => {

}