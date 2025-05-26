import { Stack } from "expo-router";

export default function HomeRoutesLayout() {
    return (
        <Stack 
            screenOptions={{
                ...(process.env.EXPO_OS !== "ios"
                    ? {} 
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
            <Stack.Screen name="index" options={{ headerTitle: "Shopping List" }} />
            <Stack.Screen name="list/new/index" 
                options = {{
                    presentation: "formSheet",
                    sheetGrabberVisible: true,
                    headerShown: false,
                }}
            /> 
            <Stack.Screen name = "profile"
                options ={{
                    presentation: "formSheet",
                    sheetAllowedDetents: [0.7, 1], //0.7 is the height of the sheet when it is expanded, 1 is the full screen when the user drags it up
                    sheetGrabberVisible: true,
                    headerShown: false,
                }}
            
            
            />

        </Stack>
    )
}