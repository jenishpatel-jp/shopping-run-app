import Button from "@/components/ui/button";
import { ListCreationProvider } from "@/context/ListCreationContext";
import ShoppingListsStore from "@/stores/ShoppingListsStore";
import { useUser } from "@clerk/clerk-expo";
import { Redirect, Stack, useRouter } from "expo-router";
import { Provider as TinyBaseProvider } from 'tinybase/ui-react'

export default function HomeRoutesLayout() {
    const router = useRouter();
    const { user } = useUser();

    if (!user) {
        return <Redirect href={"/(auth)"} />
    }

    return (
        <TinyBaseProvider>
            <ShoppingListsStore />
            <ListCreationProvider>
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
                    <Stack.Screen name="list/new/scan"
                        options={{
                            presentation: "fullScreenModal",
                            headerLargeTitle: false,
                            headerTitle: "Scan QR Code",
                            headerLeft: () => (
                                <Button variant="ghost" onPress={() => router.back()} >
                                    Cancel
                                </Button>
                            )
                        }}
                    
                    />

                    <Stack.Screen 
                        name="emoji-picker"
                        options={{
                            presentation: "formSheet",
                            headerLargeTitle: false, 
                            headerTitle: "Choose an emoji",
                            sheetAllowedDetents: [0.5, 0.75, 1],
                            sheetGrabberVisible: true,
            
                        }}
                    />
                    <Stack.Screen 
                        name="color-picker"
                        options={{
                            presentation: "formSheet",
                            headerLargeTitle: false, 
                            headerTitle: "Choose a colour",
                            sheetAllowedDetents: [0.5, 0.75, 1],
                            sheetGrabberVisible: true,
                        }}
                    />

                </Stack>

            </ListCreationProvider>
        </TinyBaseProvider>
    )
}