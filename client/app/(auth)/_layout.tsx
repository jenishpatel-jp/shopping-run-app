import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function AuthRoutesLayout() {
    const { isLoaded, isSignedIn } = useAuth(); 

    if (!isLoaded) return null;
    if (isSignedIn) return <Redirect href={("/(index)")} />
    return (
        <Stack 
            screenOptions={{
                ...(process.env.EXPO_OS !== "ios"
                    ? {
                        headerShown: true,
                        headerLargeTitle: true,
                        headerTransparent: true,
                        headerBlurEffect: "systemChromeMaterial",
                        headerLargeTitleShadowVisible: false,
                        headerShadowVisible: true,
                        
                    } 
                    : {
                        headerLargeTitle: true,
                        headerTransparent: true,
                        headerBlurEffect: "systemChromeMaterial",
                        headerLargeTitleShadowVisible: false,
                        headerShadowVisible: true,
                        headerLargeStyle: {
                            backgroundColor: "transparent",
                        },
                    }),

                }}
        
        >
            <Stack.Screen name="index" options={{headerTitle: "Sign In"}} />
            <Stack.Screen name="sign-up" options={{headerTitle: "Sign Up"}} />
            <Stack.Screen name="reset-password" options={{headerTitle: "Reset Password"}} />
        </Stack>
    )
}