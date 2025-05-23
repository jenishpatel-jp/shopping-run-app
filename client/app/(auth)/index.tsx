import { ThemedText } from "@/components/ThemedText";
import { useSignIn } from "@clerk/clerk-expo";
import { View, Text} from "react-native";
import { useRouter, Link } from "expo-router";
import { useState } from "react";
import Button from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function SignInScreen() {
    const { signIn, setActive, isLoaded } = useSignIn();
    const router = useRouter();

    const [emailAddress, setEmailAddress] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

    return(
        <SafeAreaProvider >
            <SafeAreaView> 
                <ThemedText type="title" >Sign In</ThemedText>
                <Link href={"/sign-up"} style={{color : "white"}}>Go to Sign Up</Link>
                <TextInput  label="Hello" />
                <Button>Hello</Button>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}