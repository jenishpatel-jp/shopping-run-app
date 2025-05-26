import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet, Platform } from "react-native";
import IconCircle from "@/components/IconCircle";
import { emojies } from "@/constants/Colors";

export default function NewListScreen() {

    const randomEmoji = emojies[Math.floor(Math.random() * emojies.length)];
    
    return (
        < BodyScrollView  style={styles.contentContainer} >
            <IconCircle emoji={randomEmoji} size={60} style={styles.iconCircle}/>
            <ThemedText type="subtitle" style={styles.subtitle} > Better Together </ThemedText>
            <ThemedText type="defaultSemiBold" > Create shared shopping lists and collaborate in real time with family and friends </ThemedText>
        </BodyScrollView>
    
    )
}

const styles = StyleSheet.create({
    contentContainer: {                    
        padding: 16,
        paddingTop: Platform.OS === "android" ? 60 : 16,
    },
    subtitle: {

    },
    iconCircle: {
        alignSelf: "center",
    }

})