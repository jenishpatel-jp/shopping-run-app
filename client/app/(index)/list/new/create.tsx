import { BodyScrollView } from "@/components/ui/BodyScrollView";
import Button from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { appleBlue, backgroundColors, emojies } from "@/constants/Colors";
import { useListCreation } from "@/context/ListCreationContext";
import { Link, Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";

export default function CreateList() {

    const [listName, setListName] = useState("");
    const [listDescription, setListDescription] = useState("");

    const { selectedEmoji, selectedColor, setSelectedColor, setSelectedEmoji } = useListCreation();
    

    const handleCreateList = () => {
    };

    useEffect(() => {
      setSelectedEmoji(emojies[Math.floor(Math.random() * emojies.length)])
      setSelectedColor(backgroundColors[Math.floor(Math.random() * backgroundColors.length)])

      //clean up function
      return () => {
        setSelectedColor("");
        setSelectedEmoji("");
      }
    }, []);

    return (

        <>
        <Stack.Screen 
            options={{
                headerTitle: "New List",
                headerLargeTitle: false
            }}
        />
            < BodyScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.inputContainer} >
                    <TextInput placeholder="Grocery Essentials"
                        size="lg" 
                        variant="ghost"
                        value={listName}
                        onChangeText={setListName}
                        onSubmitEditing={() => handleCreateList()}
                        returnKeyType="done"
                        autoFocus
                        inputStyle={styles.titleInput}
                        containerStyle={styles.titleInputContainer}
                    />
                <Link href={{
                    pathname:"/emoji-picker",   
                }}
                style={[styles.emojiButton, { borderColor: selectedColor}]}
                >
                    <View style={styles.emojiContainer} >
                        <Text> { selectedEmoji } </Text>
                    </View>
                </Link>

                <Link href={{
                  pathname: "/(index)/color-picker"
                }}
                style={[styles.emojiButton, { borderColor: selectedColor }]}
                >
                    <View style={styles.colorContainer} >
                        <View 
                          style={[styles.colorValue, {backgroundColor: selectedColor}]}
                        />
                    </View>
                </Link>

                </View>
                <TextInput 
                  placeholder="Description (optional)"
                  value={listDescription}
                  onChangeText={setListDescription}
                  onSubmitEditing={handleCreateList}
                  returnKeyType="done"
                  variant="ghost"
                  inputStyle={styles.descriptionInput}

                />
                <Button
                  onPress={handleCreateList}
                  disabled={!listName}
                  variant="ghost"
          
                
                >
                  Create List
                </Button>
            </BodyScrollView>
        </>
    )
}

const styles = StyleSheet.create({
  scrollViewContent: {
    padding: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  titleInput: {
    fontWeight: "600",
    fontSize: 28,
    padding: 0,
  },
  titleInputContainer: {
    flexGrow: 1,
    flexShrink: 1,
    maxWidth: "auto",
    marginBottom: 0,
  },
  emojiButton: {
    padding: 1,
    borderWidth: 3,
    borderRadius: 100,
  },
  emojiContainer: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  descriptionInput: {
    padding: 0,
  },
  createButtonText: {
    color: appleBlue,
    fontWeight: "normal",
  },
  colorButton: {
    padding: 1,
    borderWidth: 3,
    borderRadius: 100,
  },
  colorContainer: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  colorValue: {
    width: 24, 
    height: 24, 
    borderRadius: 100,

  },
});