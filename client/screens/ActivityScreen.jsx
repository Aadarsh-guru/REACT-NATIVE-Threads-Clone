import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import UserComponent from '../components/UserComponent'

const ActivityScreen = () => {

    const [selectledButton, setSellectedButton] = useState('people')
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [content, setContent] = useState('People Content')

    useEffect(() => {
        const getAllUsers = async () => {
            try {
                setLoading(true)
                const { data } = await axios.get('/user/get-users')
                if (data?.success) {
                    setLoading(false)
                    setUsers(data?.users)
                }
            } catch (error) {
                setLoading(false)
                Alert.alert('something went wrong.')
                console.log(error);
            }
        }
        getAllUsers()
    }, [])

    const handleButtonClick = (buttonName) => {
        setSellectedButton(buttonName)
    }

    return (
        <ScrollView style={{ marginTop: 50 }} >
            <View style={{ paddingHorizontal: 5 }} >
                <Text style={{ fontSize: 18, fontWeight: 'bold' }} >Activity</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 12 }} >
                    <TouchableOpacity onPress={() => handleButtonClick('people')} style={
                        [
                            {
                                flex: 1,
                                paddingVertical: 10,
                                paddingHorizontal: 20,
                                backgroundColor: 'white',
                                borderColor: '#D0D0D0',
                                borderRadius: 6,
                                borderWidth: 0.7
                            },
                            selectledButton === 'people' ? { backgroundColor: 'black' } : null
                        ]
                    }
                    >
                        <Text style={[
                            { textAlign: 'center', fontWeight: 'bold' },
                            selectledButton === 'people' ? { color: 'white' } : { color: 'black' }
                        ]}>People</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleButtonClick('all')}
                        style={
                            [
                                {
                                    flex: 1,
                                    paddingVertical: 10,
                                    paddingHorizontal: 20,
                                    backgroundColor: 'white',
                                    borderColor: '#D0D0D0',
                                    borderRadius: 6,
                                    borderWidth: 0.7
                                },
                                selectledButton === 'all' ? { backgroundColor: 'black' } : null
                            ]
                        }
                    >
                        <Text style={[
                            { textAlign: 'center', fontWeight: 'bold' },
                            selectledButton === 'all' ? { color: 'white' } : { color: 'black' }
                        ]}>All</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleButtonClick('request')}
                        style={
                            [
                                {
                                    flex: 1,
                                    paddingVertical: 10,
                                    paddingHorizontal: 20,
                                    backgroundColor: 'white',
                                    borderColor: '#D0D0D0',
                                    borderRadius: 6,
                                    borderWidth: 0.7
                                },
                                selectledButton === 'request' ? { backgroundColor: 'black' } : null
                            ]
                        }
                    >
                        <Text style={[
                            { textAlign: 'center', fontWeight: 'bold' },
                            selectledButton === 'request' ? { color: 'white' } : { color: 'black' }
                        ]}>Requests</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    {
                        loading ?
                            (
                                <Text style={{ textAlign: 'center', marginTop: 300 }} >Loading..</Text>
                            )
                            :
                            (
                                <>
                                    {
                                        selectledButton === 'people' && (
                                            <View style={{ marginTop: 20 }} >
                                                {
                                                    users?.map(user => (
                                                        <UserComponent key={user?._id} user={user} />
                                                    ))
                                                }
                                            </View>
                                        )
                                    }
                                </>
                            )
                    }
                </View>
            </View>
        </ScrollView>
    )
}

export default ActivityScreen