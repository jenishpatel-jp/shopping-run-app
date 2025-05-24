import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import Button from "@/components/ui/button";
import { useClerk } from "@clerk/clerk-expo";
import { View, Text, Platform, StyleSheet } from "react-native";

export default function HomeScreen() {

    const { signOut } = useClerk()

    return(
        <BodyScrollView style={styles.contentContainer}> 
            <ThemedText type="title" >Home</ThemedText>
            <Button onPress={signOut} >Sign Out p</Button>
        </BodyScrollView>
    )
}

const styles = StyleSheet.create({
    contentContainer: {                    
        padding: 16,
        paddingTop: Platform.OS === "android" ? 20 : 16,
    },

})