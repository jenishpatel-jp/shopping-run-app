import { ThemedText } from "@/components/ThemedText";
import { useSignIn } from "@clerk/clerk-expo";
import { View, Text} from "react-native";
import { useRouter, Link } from "expo-router";
import { useState } from "react";
import Button from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { BodyScrollView } from "@/components/ui/BodyScrollView";

export default function SignInScreen() {
    const { signIn, setActive, isLoaded } = useSignIn();
    const router = useRouter();

    const [emailAddress, setEmailAddress] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

    return(
        
        <SafeAreaView>
            <BodyScrollView
            >
                <TextInput  
                    label="Email" 
                    placeholder="Enter email" 
                    keyboardType="email-address"
                    onChangeText={setEmailAddress}
                    autoCapitalize="none"
                    />
                <Button>Hello</Button>
            </BodyScrollView>
        </SafeAreaView>

    )
}