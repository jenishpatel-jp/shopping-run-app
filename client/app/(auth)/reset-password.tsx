import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import TextInput from "@/components/ui/text-input";
import { View, Text, StyleSheet, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/components/ui/button";
import { useRouter } from "expo-router";

const router = useRouter();

export default function ResetScreen() {
    return(
        <SafeAreaView>
            <BodyScrollView
                style={styles.contentContainer}
            >
          

            </BodyScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    contentContainer: {                    
        padding: 16,
        paddingTop: Platform.OS === "android" ? 60 : 16,
    },
    dontHaveAccount: {
        marginTop: 16,
        alignItems: "center",
    },
})