import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";
import { StyleSheet } from "react-native";

const RootLayout = () => {
  return (
    // <GestureHandlerRootView style={{flex: 1}}>
    //   <Drawer>
    //     <Drawer.Screen
    //     name="index"
    //     options={{
    //       title: 'Daily Fashion',
    //       headerStyle: {
    //         backgroundColor: 'pink'
    //       },
    //       headerTitleAlign: 'center',
    //       drawerIcon: ({color, size}) => (
    //         <AntDesign name="home" size={size} color={color}/>
    //       ),
    //     }}
    //     />

    //     <Drawer.Screen
    //     name="AddProductScreen"
    //     options={{
    //       title: 'Add Product',
    //       headerStyle: {
    //         backgroundColor: 'pink'
    //       },
    //       headerTitleAlign: 'center',
    //       drawerIcon: ({color, size}) => (
    //         <AntDesign name="plus" size={size} color={color}/>
    //       ),
    //     }}/>

    //     <Drawer.Screen
    //     name="ShowProductScreen"
    //     options={{
    //       title: 'Show Product',
    //       headerStyle: {
    //         backgroundColor: 'pink'
    //       },
    //       headerTitleAlign: 'center',
    //       drawerItemStyle: {
    //         display: 'none'
    //       }
    //     }}/>
    //   </Drawer>
    // </GestureHandlerRootView>

    <GestureHandlerRootView style={styles.container}>
      <Drawer>
        {/* Home Screen */}
        <Drawer.Screen
          name="index"
          options={{
            title: "Daily Fashion",
            headerStyle: styles.headerStyle,
            headerTitleAlign: "center",
            drawerIcon: ({ color, size }) => (
              <AntDesign name="home" size={size} color={color} />
            ),
          }}
        />

        {/* Add Product Screen */}
        <Drawer.Screen
          name="AddProductScreen"
          options={{
            title: "Add Product",
            headerStyle: styles.headerStyle,
            headerTitleAlign: "center",
            drawerIcon: ({ color, size }) => (
              <AntDesign name="plus" size={size} color={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="ShowProductScreen"
          options={{
            title: "Show Product",
            headerStyle: styles.headerStyle,
            headerTitleAlign: "center",
            drawerItemStyle: { display: "none" },
          }}
        />
        <Drawer.Screen
          name="ImageZoomScreen"
          options={{
            title: "Image Zoom",
            headerShown: false,
            drawerItemStyle: { display: "none" },
          }}
        />
        <Drawer.Screen
          name="EditProductScreen"
          options={{
            title: "Edit Product",
            headerStyle: styles.headerStyle,
            headerTitleAlign: "center",
            drawerItemStyle: { display: "none" },
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerStyle: {
    backgroundColor: "pink",
  },
});

export default RootLayout;
