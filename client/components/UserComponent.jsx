import { View, Text, Image, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthProvider'

const UserComponent = ({ user }) => {

    const { auth } = useAuth();
    const [requestSent, setRequestSent] = useState(false)

    const sendFollow = async () => {
        try {
            const { data } = await axios.post(`/user/follow`, { followUserId: user?._id })
            if (data?.success) {
                setRequestSent(!requestSent)
            }
        } catch (error) {
            Alert.alert('something went wrong.')
            console.log(error.message);
        }
    }

    const sendUnfollow = async () => {
        try {
            const { data } = await axios.post(`/user/unfollow`, { unfollowUserId: user?._id })
            if (data?.success) {
                setRequestSent(!requestSent)
            }
        } catch (error) {
            Alert.alert('something went wrong.')
            console.log(error.message);
        }
    }

    return (
        <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, gap: 10 }} >
                <Image
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        resizeMode: 'contain'
                    }}
                    source={{
                        uri: "https://cdn-icons-png.flaticon.com/128/149/149071.png",
                    }}
                />
                <Text style={{ fontSize: 15, fontWeight: '500', flex: 1, }} >{user?.name}</Text>
                {
                    (requestSent || user?.followers.includes(auth?.user?._id)) ?
                        (
                            <Pressable
                                onPress={() => sendUnfollow()}
                                style={{
                                    borderColor: "#D0D0D0",
                                    borderWidth: 1,
                                    padding: 10,
                                    marginLeft: 10,
                                    width: 100,
                                    borderRadius: 8,
                                }}
                            >
                                <Text
                                    style={{ textAlign: "center", fontSize: 15, fontWeight: "bold" }}
                                >
                                    Following
                                </Text>
                            </Pressable>
                        )
                        :
                        (
                            <Pressable
                                onPress={() => sendFollow()}
                                style={{
                                    borderColor: "#D0D0D0",
                                    borderWidth: 1,
                                    padding: 10,
                                    marginLeft: 10,
                                    width: 100,
                                    borderRadius: 8,
                                }}
                            >
                                <Text
                                    style={{ textAlign: "center", fontSize: 15, fontWeight: "bold" }}
                                >
                                    Follow
                                </Text>
                            </Pressable>
                        )
                }
            </View>
        </View>
    )
}

export default UserComponent