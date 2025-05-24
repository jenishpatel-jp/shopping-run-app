import { ThemedText } from "@/components/ThemedText";
import { isClerkAPIResponseError, useSignIn } from "@clerk/clerk-expo";
import { View, Text, StyleSheet, Platform} from "react-native";
import { useRouter, Link } from "expo-router";
import { useCallback, useState } from "react";
import Button from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { SafeAreaView } from "react-native-safe-area-context";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import { ClerkAPIError } from "@clerk/types";

export default function SignInScreen() {
    const { signIn, setActive, isLoaded } = useSignIn();
    const router = useRouter();

    const [emailAddress, setEmailAddress] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
    const [errors, setErrors] = useState<ClerkAPIError[]>([]);


    const onSignInPress = useCallback(async () => {
    if (!isLoaded) return;


    setIsSignedIn(true);
    setErrors([]);

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(index)");
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      if (isClerkAPIResponseError(err)) setErrors(err.errors);
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setIsSignedIn(false);
    }
  }, [isLoaded, signIn, emailAddress, password, setActive]);

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
        paddingTop: Platform.OS === "android" ? 60 : 16,
    },
    dontHaveAccount: {
        marginTop: 16,
        alignItems: "center",
    },
})