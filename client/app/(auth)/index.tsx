import { ThemedText } from "@/components/ThemedText";
import { useSignIn } from "@clerk/clerk-expo";
import { View, Text, StyleSheet} from "react-native";
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

    const onSignInPress = () => {

    }

    return(
        
        <SafeAreaView>
            <BodyScrollView
                style={styles.contentContainer}
            >
                <TextInput  
                    label="Email" 
                    placeholder="Enter email" 
                    keyboardType="email-address"
                    onChangeText={setEmailAddress}
                    autoCapitalize="none"
                    />
                <TextInput 
                    label="Password" 
                    value={password}
                    placeholder="Enter password"
                    autoCapitalize="none"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}

                />
                <Button
                    onPress={onSignInPress}
                    loading={isSignedIn}
                    disabled={!emailAddress || !password || isSignedIn}>
                        Sign In
                </Button>

                <View style={styles.dontHaveAccount}>
                    <ThemedText> Don't have an account? </ThemedText>
                    <Button onPress={()=> router.push("/sign-up")} variant="ghost" > Sign Up</Button>
                
                </View>

                <View style={styles.dontHaveAccount}>
                    <ThemedText> Forgot Password? </ThemedText>
                    <Button onPress={()=> router.push("/reset-password")} variant="ghost" > Reset Password</Button>
                
                </View>

            </BodyScrollView>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    contentContainer: {                    
        padding: 16,
    },
    dontHaveAccount: {
        marginTop: 16,
        alignItems: "center",
    },
})