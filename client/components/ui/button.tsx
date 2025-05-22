import React, { use } from "react";
import { ViewStyle, TextStyle, useColorScheme } from "react-native";

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

export const Button: React.FC<ButtonProps> = ({
    onPress,
    variant = "filled",
    size = "md",
    disabled = false,
    loading = false,
    children,
    style,
    textStyle,
}) => {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === "dark";

    const sizeStyles: Record<
        ButtonSize,
        { height: number; fontsize: number, padding: number }
    > = {
        sm: { height: 36, fontsize: 14, padding: 12 },
        md: { height: 44, fontsize: 16, padding: 16 },
        lg: { height: 55, fontsize: 18, padding: 20 },
    };

    const getVariantStyles = () => {
        const baseStyle = {
            borderRadius: 12,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
        };
    };

};