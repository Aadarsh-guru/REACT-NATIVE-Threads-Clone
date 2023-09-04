import { Alert, Image, KeyboardAvoidingView, Pressable, SafeAreaView, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'

const RegisterScreen = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation();

    const handleRegister = async () => {
        try {
            if (!name || !email || !password) {
                return Alert.alert('All feilds are required.')
            }
            setLoading(true)
            const { data } = await axios.post(`/auth/register`, { name, email, password })
            if (data?.success) {
                setLoading(false)
                Alert.alert(data?.message)
                navigation.navigate('Login')
            } else {
                Alert.alert(data?.message)
            }
        } catch (error) {
            setLoading(false)
            console.log(error);
            Alert.alert('something went wrong.')
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', alignItems: 'center' }} >
            <View style={{ marginTop: 80 }}>
                <Image
                    style={{ width: 150, height: 100, resizeMode: 'contain' }}
                    source={{
                        uri: "https://freelogopng.com/images/all_img/1688663386threads-logo-transparent.png",
                    }}
                />
            </View>
            <KeyboardAvoidingView>
                <View style={{ alignItems: 'center', justifyContent: 'center' }} >
                    <Text style={{ fontSize: 17, fontWeight: 'bold', marginTop: 25 }} >Register to Your Account</Text>
                </View>
                <View style={{ marginTop: 40 }}>
                    <View style={{ marginTop: 30 }}>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 5,
                                borderColor: "#D0D0D0",
                                borderWidth: 1,
                                paddingVertical: 5,
                                borderRadius: 5,
                            }}
                        >
                            <MaterialIcons
                                style={{ marginLeft: 8 }}
                                name="person"
                                size={24}
                                color="gray"
                            />
                            <TextInput
                                placeholderTextColor={"gray"}
                                value={name}
                                onChangeText={(e) => setName(e)}
                                style={{
                                    color: "gray",
                                    marginVertical: 10,
                                    width: 300,
                                    fontSize: name ? 16 : 16,
                                }}
                                placeholder="enter your Name"
                            />
                        </View>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 5,
                            borderColor: "#D0D0D0",
                            borderWidth: 1,
                            paddingVertical: 5,
                            borderRadius: 5,
                            marginTop: 30
                        }}
                    >
                        <MaterialIcons
                            style={{ marginLeft: 8 }}
                            name="email"
                            size={24}
                            color="gray"
                        />
                        <TextInput
                            placeholderTextColor={"gray"}
                            value={email}
                            onChangeText={(e) => setEmail(e)}
                            style={{
                                color: "gray",
                                marginVertical: 10,
                                width: 300,
                                fontSize: email ? 16 : 16,
                            }}
                            placeholder="enter your Email"
                        />
                    </View>
                </View>
                <View style={{ marginTop: 30 }}>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 5,
                            borderColor: "#D0D0D0",
                            borderWidth: 1,
                            paddingVertical: 5,
                            borderRadius: 5,
                        }}
                    >
                        <MaterialIcons
                            style={{ marginLeft: 8 }}
                            name="lock"
                            size={24}
                            color="gray"
                        />
                        <TextInput
                            placeholderTextColor={"gray"}
                            value={password}
                            onChangeText={(e) => setPassword(e)}
                            style={{
                                color: "gray",
                                marginVertical: 10,
                                width: 300,
                                fontSize: password ? 16 : 16,
                            }}
                            secureTextEntry={true}
                            placeholder="enter your Password"
                        />
                    </View>
                </View>
                <View style={{ marginTop: 40 }} >
                    <Pressable disabled={loading && true} onPress={() => loading ? null : handleRegister()} style={{ width: 200, backgroundColor: 'black', padding: 15, marginTop: 40, marginLeft: 'auto', marginRight: 'auto', borderRadius: 6 }} >
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, color: 'white' }} >{loading ? "Registering.." : 'Register'}</Text>
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate('Login')} style={{ marginTop: 20 }} >
                        <Text style={{ textAlign: 'center', fontSize: 16 }} >Already have an account ? Sign in</Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default RegisterScreen;
