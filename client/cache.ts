import * as SecureStore from 'expo-secure-store';
import { TokenCache } from '@clerk/clerk-expo';
import { Platform } from 'react-native';

const createTokenCache = (): TokenCache => {
    return{
        getToken: async (key: string) => {
            try {
                const item = await SecureStore.getItemAsync(key);
                if (item) {
                    console.log(`${key} was used to get token`);
                } else {
                    console.log(`${key} was not found`);
                }
                return item;
            } catch (error) {
                console.error(`Error getting token for ${key}:`, error);
            }
            
        },
        saveToken: async (key: string, token: string) => {
            return
        }
    }
};

export const tokenCache = Platform.OS !== 'web' ? createTokenCache() : undefined;