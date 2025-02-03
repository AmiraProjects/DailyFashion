import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, {useState, useEffect, useRef} from 'react'
// import * as ImagePicker from 'expo-image-picker';
import ImagePicker from 'react-native-image-crop-picker'
import { InputComponent } from '@/components/InputComponent'
import SelectDropdown from 'react-native-select-dropdown'
import { categoryList } from '@/data/Data'
import realm from '@/store/realm'
import { ProductSchema } from '@/store/realm/ProductSchema'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen-hooks'

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
  const dropdownRef = useRef<SelectDropdown>(null)

  // const addImage = async () => {
  //   try {
  //     const result = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.Images, //image only
  //       allowsEditing: true, //enable editing
  //       quality: 1, //highest quality
  //     });
      
  //     if(!result.canceled){
  //       const selectedImageUri = result.assets[0].uri; //get image link
  //       console.log(selectedImageUri); //display uri in console
  //       setProductData({
  //         ...productData,
  //         imagePath: selectedImageUri //update state imagePath
  //       });
  //     }else{
  //       console.log('Image selection cancelled')
  //     }
  //   } catch (error){
  //     console.error('Error picking image: ', error)
  //   }
  // }

  const addImage = () => {
    ImagePicker.openPicker({
      width: 2000,
      height: 2000,
      cropping: true
    }).then(image => {
      console.log(image);
      setProductData({
        ...productData,
        imagePath: image.path
      })
    }).catch(errorMessage => {
      console.log(errorMessage);
    })
  }

  const onInputChange = (type: keyof typeof productData, value: string | number) => {
    setProductData({
      ...productData,
      [type]: value
    })
  }

  const saveData = () => {
    if(
      productData.productName === '' ||
      productData.imagePath === '' ||
      productData.description === '' ||
      productData.price === '' ||
      productData.category === null 
    ){
      alert('Please fill all product information')
    } else if (
      productData.phoneNumber === '' &&
      productData.instagram === '' &&
      productData.facebook === ''
    ){
      alert('Please fill at least one seller contact')
    }else{
      const allData = realm.objects('Product')
      const lastId = allData.length === 0 ? 0 : allData[allData.length - 1].id as number

      if(isNaN(Number(productData.price)) || productData.price === ''){
        alert('Please provide a valid price!')
        return
      }

      realm.write(() => {
        realm.create('Product', {
          id: lastId + 1,
          productName: productData.productName,
          imagePath: productData.imagePath,
          category: productData.category,
          description: productData.description,
          price: Number(productData.price),
          instagram: productData.instagram,
          facebook: productData.facebook,
          phoneNumber: productData.phoneNumber,
        })
      })
      console.log('Successfully saved your data')
      alert('Successfully saved your data')
      
      setProductData({
        productName: '',
        imagePath: "",
        category: null,
        description: "",
        price: null,
        instagram: "",
        facebook: "",
        phoneNumber: ""
      })

      if(dropdownRef.current){
        dropdownRef.current.reset(); //reset dropdown
      }
    }
  }

  useEffect (() => {
    console.log(productData);
  }, [productData])

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
              width: productData.imagePath !== ''? wp('50%') : 50,
              height: productData.imagePath !== ''? wp('50%') : 50,
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
            <SelectDropdown
              data={categoryList}
              defaultButtonText='Select Category'
              onSelect={(item) => {
                onInputChange('category', item.id)
              }}
              buttonTextAfterSelection={(item) => {
                return item.name
              }}
              rowTextForSelection={(item) => {
                return item.name
              }}
              buttonStyle={styles.selectDropdown}
              buttonTextStyle={styles.selectText}
              ref={dropdownRef}
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

        <Text style={styles.contact}>Seller Contact</Text>

        <View style={styles.sellerContact}>
            <InputComponent
            placeholder='Whatsapp Number'
            value={productData.phoneNumber}
            onChangeText={(text) => onInputChange('phoneNumber', text)}
            iconName='whatsapp'
            />
            <InputComponent
            placeholder='Instagram Username'
            value={productData.instagram}
            onChangeText={(text) => onInputChange('instagram', text)}
            iconName='instagram'
            />
            <InputComponent
            placeholder='Facebook Username'
            value={productData.facebook}
            onChangeText={(text) => onInputChange('facebook', text)}
            iconName='facebook'
            />
        </View>
        
        <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={() => saveData()}
            >
              <Text>SAVE</Text>
            </TouchableOpacity>
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
      width: wp('50%'),
      height: wp('50%'),
      borderWidth: 0.5,
      justifyContent: 'center',
      alignItems: 'center'
    },
    horizontalContainer: {
      flexDirection: 'row',
      alignItems: 'flex-end',
    },
    sellerContact: {
      alignItems: 'center'
    },
    contact: {
      textAlign: 'left',
      marginTop: 16,
      marginLeft: 8,
      fontSize: hp('2.5%'),
      fontWeight: 'bold'
    },
    buttonContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 8
    },
    saveButton: {
      marginTop: 16,
      borderWidth: 1,
      borderRadius: 5,
      paddingVertical: 8,
      paddingHorizontal: 16,
      backgroundColor: 'mistyrose'
    },
    selectDropdown: {
      borderRadius: 10,
      backgroundColor: 'skyblue',
      width: wp('40%'),
      height: hp('4%'),
      marginLeft: 8
    },
    selectText: {
      fontSize: hp('1.5%')
    }
})

export default AddProductScreen