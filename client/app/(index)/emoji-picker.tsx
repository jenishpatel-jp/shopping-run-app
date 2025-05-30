import { emojies } from "@/constants/Colors";
import { useListCreation } from "@/context/ListCreationContext";
import { useRouter } from "expo-router";
import { FlatList, Pressable, Text, StyleSheet } from "react-native";

export default function EmojiPickerScreen(){

    const { setSelectedEmoji } = useListCreation();
    const router = useRouter();

    const handleEmojiSelect = (emoji: string) => {
        setSelectedEmoji(emoji)
        router.back();
    };
 
    return(
        <FlatList 
            data={emojies}
            renderItem={({ item }) => (
                <Pressable onPress={() => handleEmojiSelect(item)} >
                    <Text style={styles.emojiText} > {item} </Text>
                </Pressable>
            ) }
            numColumns={5}
            keyExtractor={(item) => item}
            automaticallyAdjustContentInsets
            contentInsetAdjustmentBehavior="automatic"
            contentContainerStyle={styles.contentContainerStyle}
        />
    )
};

const styles = StyleSheet.create({
    emojiText: {
        fontSize: 40,
    },
    contentContainerStyle: {
        padding: 16, 
        paddingBottom: 100,
    },
    pressable: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})

