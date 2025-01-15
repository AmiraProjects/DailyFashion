import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import {Drawer} from "expo-router/drawer"

const RootLayout = () => {
  return(
    <GestureHandlerRootView style={{flex: 1}}>
      <Drawer>
        <Drawer.Screen
        name="index"
        options={{
          title: 'Daily Fashion',
          headerStyle: {
            backgroundColor: 'pink'
          },
          headerTitleAlign: 'center',
          drawerIcon: ({color, size}) => (
            <AntDesign name="home" size={size} color={color}/>
          ),
        }}
        />

        <Drawer.Screen
        name="AddProductScreen"
        options={{
          title: 'Add Product',
          headerStyle: {
            backgroundColor: 'pink'
          },
          headerTitleAlign: 'center',
          drawerIcon: ({color, size}) => (
            <AntDesign name="plus" size={size} color={color}/>
          ),
        }}/>
      </Drawer>
    </GestureHandlerRootView>
  )
}

export default RootLayout