import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet, Platform, View } from "react-native";
import IconCircle from "@/components/IconCircle";
import { backgroundColors, emojies } from "@/constants/Colors";
import { useMemo, useState } from "react";
import Button from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { Href, useRouter } from "expo-router";

const isValidUUID = (id: string | null) => {
    if (!id) return false;
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
};


export default function NewListScreen() {

    const router = useRouter();

    const [listId, setListId] = useState("");
    const isValidListId = useMemo(() => isValidUUID(listId), [listId]);

    const randomEmoji = useMemo(() => emojies[Math.floor(Math.random() * emojies.length)], []);
    const randomColour = useMemo(() => backgroundColors[Math.floor(Math.random() * backgroundColors.length)], []);

    
    const joinShoppingListCallback = (listId:string) => {

    };

    const handleJoinList = () => {

    };

    //In the future, this can use the router.dismissTo() function
    const handleDismissTo = (screen: Href) => {
        if(router.canDismiss()){
            router.dismiss();
            setTimeout(() => {
                router.push(screen)
            }, 100)
        }
    };


    
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
            <View style={styles.viewContainer} >
                <Button onPress={() => handleDismissTo("/list/new/create")} >Create new list</Button>

                <View style={styles.joinExistingContainer}>
                    <View style={styles.line} />
                        <ThemedText style={styles.joinExistingText} >or join existing</ThemedText>
                    <View style={styles.line}/>

                </View>
            </View>
            <View>
                <TextInput 
                    placeholder="Enter a list code"
                    value={listId}
                    onChangeText={setListId}
                    onSubmitEditing={(e) => {
                        joinShoppingListCallback(e.nativeEvent.text)
                    }}
                    containerStyle={styles.textInputStyle}
                />

                <Button
                    onPress={handleJoinList}
                    disabled={!isValidListId}
                    >
                    
                        Join list
                </Button>

                <Button
                    variant="ghost"
                    onPress={() => handleDismissTo("/list/new/scan")}
                >
                    Scan QR code
                </Button>

                <View style={styles.joinExistingContainer}>
                    <View style={styles.line} />
                        <ThemedText style={styles.joinExistingText} >or join existing</ThemedText>
                    <View style={styles.line}/>

                </View>
            </View>
        </BodyScrollView>
    
    )
}

const styles = StyleSheet.create({
    contentContainer: {                    
        padding: 16,
        gap: 32,
        paddingTop: Platform.OS === "android" ? 60 : 16,
    },
    viewContainer: {
        padding: 16,
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
    },
    buttonContainer: {
        gap: 16,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: "lightgray",
    },
    joinExistingText: {
        color: "gray",
    },
    joinExistingContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
    },
    textInputStyle: {
        marginBottom: 0,
    }

})