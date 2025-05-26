import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet, Platform } from "react-native";

export default function NewListScreen() {
    return (
        < BodyScrollView  style={styles.contentContainer} >
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

    }

})