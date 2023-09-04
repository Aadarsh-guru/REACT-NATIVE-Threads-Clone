import { View, Alert, ScrollView, Image } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import axios from 'axios'
import { usePosts } from '../context/PostsProvider'
import PostCard from '../components/PostCard';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = () => {

    const { posts, setPosts } = usePosts()

    const fetchPosts = async () => {
        try {
            const { data } = await axios.get(`/post/all-posts`)
            if (data?.success) {
                setPosts(data?.posts)
            }
        } catch (error) {
            console.log(error);
            Alert.alert('something went wrong.')
        }
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    useFocusEffect(
        useCallback(() => {
            fetchPosts();
        }, [])
    );


    return (
        <ScrollView style={{ marginTop: 50, flex: 1, backgroundColor: "white" }}>
            <View style={{ alignItems: "center", marginTop: 20 }}>
                <Image
                    style={{ width: 60, height: 40, resizeMode: "contain" }}
                    source={{
                        uri: "https://freelogopng.com/images/all_img/1688663386threads-logo-transparent.png",
                    }}
                />
            </View>

            <View style={{ marginTop: 20 }}>
                {posts?.map((post) => (
                    <PostCard key={post?._id} post={post} />
                ))}
            </View>
        </ScrollView>
    )
}

export default HomeScreen