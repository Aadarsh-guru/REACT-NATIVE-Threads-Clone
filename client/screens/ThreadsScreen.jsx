import { View, Text, Image, SafeAreaView, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { useAuth } from '../context/AuthProvider'
import axios from 'axios'
import { usePosts } from '../context/PostsProvider'

const ThreadsScreen = () => {

    const { auth } = useAuth();
    const { posts, setPosts } = usePosts()
    const [content, setContent] = useState('')

    const handlePost = async () => {
        try {
            if (!content) {
                Alert.alert('fill the obove feild.')
            }
            const { data } = await axios.post('/post/create-post', { content })
            if (data?.success) {
                setContent('')
                setPosts([...posts, data?.post])
            }
        } catch (error) {
            console.log(error);
            Alert.alert('something went wrong.')
        }
    }

    return (
        <SafeAreaView style={{ padding: 10 }} >
            <View style={{ flexDirection: "row", alignItems: 'center', gap: 10, marginTop: 30, padding: 10 }} >
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
                <Text style={{ textTransform: 'capitalize' }} >{auth?.user?.name}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginLeft: 10, marginTop: 7 }} >
                <TextInput value={content} onChangeText={(e) => setContent(e)} placeholderTextColor={'black'} multiline placeholder='Type your message.' />
            </View>
            <TouchableOpacity onPress={() => handlePost()} style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }} >
                <Text style={{ color: 'blue', fontWeight: 'bold', fontSize: 18 }} >Share Post</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default ThreadsScreen