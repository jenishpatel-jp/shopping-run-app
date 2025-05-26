import { View, ViewStyle } from "react-native"
import { ThemedText } from "./ThemedText"

interface IconCircleProps {
    emoji: string, 
    backgroundColor?: string,
    size?: number,
    style?: ViewStyle
}

export default function IconCircle( { emoji, backgroundColor, size, style }: IconCircleProps ) {
    return (
        <View>
            <ThemedText style={{fontSize: 22}}> {emoji} </ThemedText>
        </View>
    )
}