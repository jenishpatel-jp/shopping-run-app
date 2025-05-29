import { emojies } from "@/constants/Colors";
import { useListCreation } from "@/context/ListCreationContext";
import { useRouter } from "expo-router";
import { FlatList, Pressable, Text } from "react-native";

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
                    <Text> {item} </Text>
                </Pressable>
            ) }
        />
    )
}