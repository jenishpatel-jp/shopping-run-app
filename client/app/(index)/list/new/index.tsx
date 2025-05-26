import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet, Platform, View } from "react-native";
import IconCircle from "@/components/IconCircle";
import { backgroundColors, emojies } from "@/constants/Colors";
import { useMemo } from "react";

export default function NewListScreen() {

    const randomEmoji = useMemo(() => emojies[Math.floor(Math.random() * emojies.length)], []);

    const randomColour = useMemo(() => backgroundColors[Math.floor(Math.random() * backgroundColors.length)], []);
    
    return (
        < BodyScrollView  style={styles.contentContainer} >
            <View style={styles.iconContainer}>
                <IconCircle 
                    emoji={randomEmoji} 
                    size={60} 
                    backgroundColor={randomColour}
                    style={styles.iconCircle}
                    />
                <ThemedText type="title" style={styles.title}> Better Together </ThemedText>
                <ThemedText type="defaultSemiBold" style={styles.subtitle} > Create shared shopping lists and collaborate in real time with family and friends </ThemedText>
            </View>
        </BodyScrollView>
    
    )
}

const styles = StyleSheet.create({
    contentContainer: {                    
        padding: 16,
        paddingTop: Platform.OS === "android" ? 60 : 16,
    },
    title : {
        fontSize: 32,
    },
    subtitle: {
        color: "gray",
        textAlign: "center",
    },
    iconCircle: {
        marginBottom: 8,
    },
    iconContainer: {
        alignItems: "center",
        gap: 16,
        marginTop: 32,
    
    }

})