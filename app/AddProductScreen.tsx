import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, {useState} from 'react'
// import * as ImagePicker from 'expo-image-picker';
import { InputComponent } from '@/components/InputComponent'

const AddProductScreen = () => {

  const [productData, setProductData] = useState({
    productName: '',
    imagePath: "",
    category: null,
    description: "",
    price: null,
    instagram: "",
    facebook: "",
    phoneNumber: ""
  })

  const addImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, //image only
        allowsEditing: true, //enable editing
        quality: 1, //highest quality
      });
      
      if(!result.canceled){
        const selectedImageUri = result.assets[0].uri; //get image link
        console.log(selectedImageUri); //display uri in console
        setProductData({
          ...productData,
          imagePath: selectedImageUri //update state imagePath
        });
      }else{
        console.log('Image selection cancelled')
      }
    } catch (error){
      console.error('Error picking image: ', error)
    }
  }

  const onInputChange = (type: keyof typeof productData, value: string | number) => {
    setProductData({
      ...productData,
      [type]: value
    })
  }

  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.imageContainer}>
          <TouchableOpacity 
            style={styles.imageButton}
            onPress={() => addImage()} 
            // onPress={() => console.log("Pressed")}
          >
            <Image
            style={{
              width: productData.imagePath !== ''? 200 : 50,
              height: productData.imagePath !== ''? 200 : 50,
            }}
            source={{
              uri: productData.imagePath !== '' ?
                    productData.imagePath
                    :
                    'https://e7.pngegg.com/pngimages/21/312/png-clipart-camera-computer-icons-graphy-camera-icon-camera-lens-camera-icon.png'
            }}/>
          </TouchableOpacity>
        </View>
        
        <View style={styles.horizontalContainer}>
            <InputComponent
            placeholder='Product Name'
            value={productData.productName}
            onChangeText={(text) => onInputChange('productName', text)}
            />
        </View>

        <View style={styles.horizontalContainer}>
            <InputComponent
            placeholder='Description'
            value={productData.description}
            onChangeText={(text) => onInputChange('description', text)}
            isDescription={true}/>

            <InputComponent
            placeholder='Price'
            value={(productData.price as number | null)?.toString()}
            onChangeText={(text) => onInputChange('price', text)}
            iconName='dollar'/>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: 'white'
    },
    scroll: {
      margin: 8,
      paddingBottom: 8
    },
    imageContainer: {
      alignItems: 'center',
      marginVertical: 8
    },
    imageButton: {
      width: 200,
      height: 200,
      borderWidth: 0.5,
      justifyContent: 'center',
      alignItems: 'center'
    },
    horizontalContainer: {
      flexDirection: 'row',
      alignItems: 'flex-end'
    }
})

export default AddProductScreen