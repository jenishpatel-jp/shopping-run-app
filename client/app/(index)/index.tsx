import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import Button from "@/components/ui/button";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { appleBlue } from "@/constants/Colors";
import { useClerk } from "@clerk/clerk-expo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Stack, useRouter } from "expo-router";
import { View, Text, Platform, StyleSheet, Pressable } from "react-native";

export default function HomeScreen() {

    const { signOut } = useClerk();
    const router = useRouter();

    const renderHeaderRight = () => {
        return (
            <Pressable onPress ={() => router.push("/(index)/list/new")} >
                <IconSymbol name="plus" size={32} color="white" />
            </Pressable>
        )
    }

    const renderHeaderLeft = () => {
        return (
            <Pressable onPress={() => router.push("/profile")} >
                <IconSymbol name="gear" size={32} color="white" />
            </Pressable>
        )
    }

    return(
        <>
        <Stack.Screen options={{ 
            headerRight: renderHeaderRight,
            headerLeft: renderHeaderLeft,
        
         }}>

        </Stack.Screen>
        <BodyScrollView style={styles.contentContainer}> 
            <ThemedText type="title" >Home</ThemedText>
            <Button onPress={signOut} >Sign Out</Button>
        </BodyScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    contentContainer: {                    
        padding: 16,
        paddingTop: Platform.OS === "android" ? 20 : 16,
    },

})