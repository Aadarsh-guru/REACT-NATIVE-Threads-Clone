import { View, Text, Image, Alert } from 'react-native'
import React from 'react'
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from '../context/AuthProvider';
import axios from 'axios'

const PostCard = ({ post }) => {

    const { auth } = useAuth();

    const handleLike = async () => {
        try {
            const { data } = await axios.put(`/post/like/${post?._id}`)
            if (data?.success) {
                Alert.alert(data.message)
            }
        } catch (error) {
            console.log(error);
            Alert.alert('somethjng went wrong.')
        }
    }

    const handleDislike = async () => {
        try {
            const { data } = await axios.put(`/post/unlike/${post?._id}`)
            if (data?.success) {
                Alert.alert(data.message)
            }
        } catch (error) {
            console.log(error);
            Alert.alert('somethjng went wrong.')
        }
    }

    return (
        <View
            style={{
                padding: 15,
                borderColor: "#D0D0D0",
                borderTopWidth: 1,
                flexDirection: "row",
                gap: 10,
                marginVertical: 10,
            }}
        >
            <View>
                <Image
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        resizeMode: "contain",
                    }}
                    source={{
                        uri: "https://cdn-icons-png.flaticon.com/128/149/149071.png",
                    }}
                />
            </View>

            <View>
                <Text
                    style={{ fontSize: 15, fontWeight: "bold", marginBottom: 4 }}
                >
                    {post?.user?.name}
                </Text>
                <Text>{post?.content}</Text>

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                        marginTop: 15,
                    }}
                >
                    {post?.likes?.includes(auth?.user?._id) ? (
                        <AntDesign
                            onPress={() => handleDislike()}
                            name="heart"
                            size={18}
                            color="red"
                        />
                    ) : (
                        <AntDesign
                            onPress={() => handleLike()}
                            name="hearto"
                            size={18}
                            color="black"
                        />
                    )}

                    <FontAwesome name="comment-o" size={18} color="black" />

                    <Ionicons name="share-social-outline" size={18} color="black" />
                </View>

                <Text style={{ marginTop: 7, color: "gray" }}>
                    {post?.likes?.length} likes • {post?.replies?.length} reply
                </Text>
            </View>
        </View>
    )
}

export default PostCard