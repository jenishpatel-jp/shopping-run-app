import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import Button from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ClerkAPIError } from "@clerk/types";

export default function SignUpScreen() {
    
    const { signUp, setActive, isLoaded } = useSignUp   ();
    const router = useRouter();

    const [emailAddress, setEmailAddress] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [errors, setErrors] = useState<ClerkAPIError[]>([]);
    const [code, setCode] = useState<string>("");
    const [pendingVerification, setPendingVerification] = useState<boolean>(false);

    const onSignUpPress = async () => {
        if (!isLoaded) return;
        setIsLoading
        setErrors([]);
        
        try {
            // start auth flow
            await signUp.create({
                emailAddress,
                password,
            })
            // confirmation
            await signUp.prepareEmailAddressVerification({ 
                strategy: "email_code" 
            });
            setPendingVerification(true);
        }catch (error) {
            console.log("Error signing up", error);
        } finally {
            setIsLoading(false);
        }
    };

    const onVerifyPress = async () => {
        if (!isLoaded) return;
        setIsLoading
        setErrors([]);

        try {
            const signUpAttempt = await signUp.attemptEmailAddressVerification({
                code
            });

            if (signUpAttempt.status === "complete"){
                await setActive({ session: signUpAttempt.createdSessionId })
                router.replace("/(index)");
            } else {
                console.log(signUpAttempt);
            }
        }catch (error) {
            console.log("Error signing up", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (pendingVerification) {
        return (
            <BodyScrollView contentContainerStyle={styles.contentContainer}>
                <TextInput 
                    value={code}
                    label={`Enter the verification code we sent to ${emailAddress}`}
                    placeholder="Enter verification code"
                    onChangeText={(code) => setCode(code)}
                >
                </TextInput>
                <Button
                    onPress={onVerifyPress}
                    disabled={!code || isLoading}
                    loading={isLoading} 
                >
                    Verify   
                </Button>
                {errors.map((error) => (
                    <ThemedText key={error.longMessage} style={styles.errorText} >
                        {error.longMessage}
                    </ThemedText>
                ))}
            </BodyScrollView>
        )
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
                    onChangeText={(email) => setEmailAddress(email)}
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
                    onPress={onSignUpPress}
                    loading={isLoading}
                    disabled={!emailAddress || !password || isLoading}>
                        Continue
                </Button>

                {errors.map((error) => (
                    <ThemedText key={error.longMessage} style={styles.errorText} >
                        {error.longMessage}
                    </ThemedText>
                ))}
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
    errorText: {
        color: "red",
    }
})