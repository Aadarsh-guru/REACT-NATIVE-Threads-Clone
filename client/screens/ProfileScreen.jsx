import { View, Text, Image, Pressable, Alert } from 'react-native'
import React from 'react'
import { useAuth } from '../context/AuthProvider'
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {

    const { auth, setAuth } = useAuth();

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem("@auth");
            setAuth({ ...auth, user: null, token: '' })
        } catch (error) {
            console.log(error);
            Alert.alert('something went wrong.')
        }
    }

    return (
        <View style={{ marginTop: 55, padding: 15 }}>
            <View>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>{auth?.user?.name}</Text>
                    <View
                        style={{
                            paddingHorizontal: 7,
                            paddingVertical: 5,
                            borderRadius: 8,
                            backgroundColor: "#D0D0D0",
                        }}
                    >
                        <Text>Threads.net</Text>
                    </View>
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 20,
                        marginTop: 15,
                    }}
                >
                    <View>
                        <Image
                            style={{
                                width: 60,
                                height: 60,
                                borderRadius: 30,
                                resizeMode: "contain",
                            }}
                            source={{
                                uri: "https://cdn-icons-png.flaticon.com/128/149/149071.png",
                            }}
                        />
                    </View>

                    <View>
                        <Text style={{ fontSize: 15, fontWeight: "400" }}>BTech.</Text>
                        <Text style={{ fontSize: 15, fontWeight: "400" }}>
                            Movie Buff | Musical Nerd
                        </Text>
                        <Text style={{ fontSize: 15, fontWeight: "400" }}>
                            Love Yourself
                        </Text>
                    </View>
                </View>
                <Text style={{ color: "gray", fontSize: 15, marginTop: 10 }}>
                    {auth?.user?.followers?.length} followers
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginTop: 20 }}>
                    <Pressable
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            padding: 10,
                            borderColor: "#D0D0D0",
                            borderWidth: 1,
                            borderRadius: 5,
                        }}
                    >
                        <Text>Edit Profile</Text>
                    </Pressable>

                    <Pressable
                        onPress={handleLogout}
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            padding: 10,
                            borderColor: "#D0D0D0",
                            borderWidth: 1,
                            borderRadius: 5,
                        }}
                    >
                        <Text>Logout</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

export default ProfileScreen