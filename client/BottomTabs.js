import HomeScreen from "./screens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import ThreadsScreen from "./screens/ThreadsScreen";
import { Ionicons } from "@expo/vector-icons";
import ActivityScreen from "./screens/ActivityScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { Text, View } from "react-native";

const BottomTabs = () => {

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: "Home",
                    tabBarLabelStyle: { color: "black" },
                    headerShown: false,
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <Entypo name="home" size={24} color="black" />
                        ) : (
                            <AntDesign name="home" size={24} color="black" />
                        ),
                }}
            />

            <Tab.Screen
                name="Thread"
                component={ThreadsScreen}
                options={{
                    tabBarLabel: "Create",
                    tabBarLabelStyle: { color: "black" },
                    headerShown: false,
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <Ionicons name="create" size={24} color="black" />
                        ) : (
                            <Ionicons name="create-outline" size={24} color="black" />
                        ),
                }}
            />

            <Tab.Screen
                name="Activity"
                component={ActivityScreen}
                options={{
                    tabBarLabel: "Activity",
                    tabBarLabelStyle: { color: "black" },
                    headerShown: false,
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <AntDesign name="heart" size={24} color="black" />
                        ) : (
                            <AntDesign name="hearto" size={24} color="black" />
                        ),
                }}
            />

            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: "Profile",
                    tabBarLabelStyle: { color: "black" },
                    headerShown: false,
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <Ionicons name="person" size={24} color="black" />
                        ) : (
                            <Ionicons name="person-outline" size={24} color="black" />
                        ),
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomTabs