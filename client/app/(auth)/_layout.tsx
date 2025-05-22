import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function AuthRoutesLayout() {
    const { isLoaded, isSignedIn } = useAuth(); 

    if (!isLoaded) return null;
    if (isSignedIn) return <Redirect href={("/(index)")} />
    return (
        <Stack >
            <Stack.Screen name="index" />
        </Stack>
    )
}