import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashMunnectScreen from './Component/SplashMunnectScreen';
import LoginScreen from './Component/Login/LoginScreen';
import RegistScreen from './Component/Login/RegisterScreen';
import ForgetPassScreen from './Component/Login/ForgetPassScreen';
import HomeNavi from './Component/HomeNavi';

const StackNav = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <StackNav.Navigator initialRouteName='SplashScreen'>
        <StackNav.Screen name='SplashMunnectScreen' component={SplashMunnectScreen} options={{ headerShown: false }}/>
        <StackNav.Screen name='LoginScreen' component={LoginScreen} options={{ headerShown: false }}/>
        <StackNav.Screen name='RegistScreen' component={RegistScreen} options={{ headerShown: false }}/>
        <StackNav.Screen name='HomeNavi' component={HomeNavi} options={{ headerShown: false }}/>
        <StackNav.Screen name='ForgetPassScreen' component={ForgetPassScreen} options={{ headerShown: false }}/>
      </StackNav.Navigator>
    </NavigationContainer>
  )
}
export default App;
