import StackNavigator from './StackNavigator';
import AuthProvider from './context/AuthProvider';
import PostsProvider from './context/PostsProvider'
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <PostsProvider>
          <StackNavigator />
        </PostsProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}