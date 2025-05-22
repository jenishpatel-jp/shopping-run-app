import { ThemedText } from "@/components/ThemedText";
import { useSignIn } from "@clerk/clerk-expo";
import { View, Text, Button} from "react-native";
import { useRouter, Link } from "expo-router";
import { useState } from "react";

export default function SignInScreen() {
    const { signIn, setActive, isLoaded } = useSignIn();
    const router = useRouter();

    const [emailAddress, setEmailAddress] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

    return(
        <View> 
            <ThemedText type="title" >Sign In</ThemedText>
            <Link href={"/sign-up"} style={{color : "white"}}>Go to Sign Up</Link>
        </View>
    )
}