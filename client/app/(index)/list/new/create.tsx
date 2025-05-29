import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import TextInput from "@/components/ui/text-input";
import { appleBlue } from "@/constants/Colors";
import { Link, Stack } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";

export default function CreateList() {

    const [listName, setListName] = useState("");
    

    const handleCreateList = () => {

    }

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
                    pathname:"/",   
                }}
                style={[styles.emojiButton, { borderColor: "blue" }]}
                >
                    <View style={styles.emojiContainer} >
                        <Text> {"😅"} </Text>
                    </View>
                </Link>

                <Link href={{
                    pathname:"/",   
                }}
                style={[styles.emojiButton, { borderColor: "blue" }]}
                >
                    <View style={styles.colorContainer} >
                        <View 
                          style={styles.colorValue}
                        />
                    </View>
                </Link>

                </View>
                <ThemedText> Create List </ThemedText>
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
    backgroundColor: "blue",

  },
});