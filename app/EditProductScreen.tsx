import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
// import * as ImagePicker from 'expo-image-picker';
import ImagePicker from "react-native-image-crop-picker";
import { InputComponent } from "@/components/InputComponent";
import SelectDropdown from "react-native-select-dropdown";
import { categoryList } from "@/data/Data";
import realm from "@/store/realm";
import { Product, ProductSchema } from "@/store/realm/ProductSchema";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen-hooks";
import { router, useLocalSearchParams } from "expo-router";

const EditProductScreen = () => {
  const params = useLocalSearchParams();
  const dropdownRef = useRef<SelectDropdown>(null);
  const productString = params.product as string;
  const initialProduct: Product = JSON.parse(productString);

  // const [productData, setProductData] = useState({
  //     productName: '',
  //     imagePath: "",
  //     category: null,
  //     description: "",
  //     price: null,
  //     instagram: "",
  //     facebook: "",
  //     phoneNumber: ""
  //   })

  const [productData, setProductData] = useState<Product>(initialProduct);

  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number>(
    categoryList.findIndex((item) => item.id === initialProduct.category)
  );

  const onInputChange = (
    type: keyof typeof productData,
    value: string | number
  ) => {
    setProductData({
      ...productData,
      [type]: value,
    });
  };

  const saveData = () => {
    if (
      productData.productName === "" ||
      productData.imagePath === "" ||
      productData.description === "" ||
      productData.price === null ||
      productData.category === null
    ) {
      Alert.alert("Please fill all product information");
      return;
    }
    if (
      productData.phoneNumber === "" &&
      productData.instagram === "" &&
      productData.facebook === ""
    ) {
      Alert.alert("Please fill at least one seller contact");
      return;
    }
    if (isNaN(Number(productData.price))) {
      Alert.alert("Please provide a valid price!");
      return;
    }

    const productToUpdate = realm.objectForPrimaryKey(
      "Product",
      productData.id
    );

    if (productToUpdate) {
      realm.write(() => {
        productToUpdate.productName = productData.productName;
        productToUpdate.imagePath = productData.imagePath;
        productToUpdate.category = Number(productData.category);
        productToUpdate.description = productData.description;
        productToUpdate.price = Number(productData.price);
        productToUpdate.instagram = productData.instagram;
        productToUpdate.facebook = productData.facebook;
        productToUpdate.phoneNumber = productData.phoneNumber;
      });

      Alert.alert("Success", "Product updated successfully!", [
        {
          text: "OK",
          onPress: () => router.replace("/"), //use 'replace' or 'push' based on requirement
        },
      ]);
      //   if(dropdownRef.current){
      //     dropdownRef.current.reset(); //reset dropdown
      //   }
    } else {
      Alert.alert("Error", "Product not found!");
    }
  };

  const addImage = () => {
    ImagePicker.openPicker({
      width: 2000,
      height: 2000,
      cropping: true,
    })
      .then((image) => {
        console.log(image);
        setProductData({
          ...productData,
          imagePath: image.path,
        });
      })
      .catch((errorMessage) => {
        console.log(errorMessage);
      });
  };

  useEffect(() => {
    const newProductData = JSON.parse(params.product as string);
    setProductData(newProductData);
    console.log("Recieved product for edit", newProductData);
    if (dropdownRef.current) {
      dropdownRef.current.reset();
      setSelectedCategoryIndex(
        categoryList.findIndex((item) => item.id === newProductData.category)
      );
    }
  }, [params.product]);

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
                width: productData.imagePath !== "" ? wp("50%") : 50,
                height: productData.imagePath !== "" ? wp("50%") : 50,
              }}
              source={{
                uri:
                  productData.imagePath !== ""
                    ? productData.imagePath
                    : "https://e7.pngegg.com/pngimages/21/312/png-clipart-camera-computer-icons-graphy-camera-icon-camera-lens-camera-icon.png",
              }}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.horizontalContainer}>
          <InputComponent
            placeholder="Product Name"
            value={productData.productName}
            onChangeText={(text) => onInputChange("productName", text)}
          />
          <SelectDropdown
            data={categoryList}
            defaultValueByIndex={categoryList.findIndex(
              (item) => item.id === productData.category
            )}
            onSelect={(selectedItem, index) =>
              setProductData({
                ...productData,
                category: categoryList[index].id,
              })
            }
            buttonTextAfterSelection={(selectedItem) => selectedItem.name}
            rowTextForSelection={(item) => item.name}
            ref={dropdownRef}
            buttonStyle={styles.selectDropdown}
            buttonTextStyle={styles.selectText}
          />
        </View>

        <View style={styles.horizontalContainer}>
          <InputComponent
            placeholder="Description"
            value={productData.description}
            onChangeText={(text) => onInputChange("description", text)}
            isDescription={true}
          />

          <InputComponent
            placeholder="Price"
            value={(productData.price as number | null)?.toString()}
            onChangeText={(text) => onInputChange("price", text)}
            iconName="dollar"
          />
        </View>

        <Text style={styles.contact}>Seller Contact</Text>

        <View style={styles.sellerContact}>
          <InputComponent
            placeholder="Whatsapp Number"
            value={productData.phoneNumber}
            onChangeText={(text) => onInputChange("phoneNumber", text)}
            iconName="whatsapp"
          />
          <InputComponent
            placeholder="Instagram Username"
            value={productData.instagram}
            onChangeText={(text) => onInputChange("instagram", text)}
            iconName="instagram"
          />
          <InputComponent
            placeholder="Facebook Username"
            value={productData.facebook}
            onChangeText={(text) => onInputChange("facebook", text)}
            iconName="facebook"
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => saveData()}
          >
            <Text>EDIT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  scroll: {
    margin: 8,
    paddingBottom: 8,
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 8,
  },
  imageButton: {
    width: wp("50%"),
    height: wp("50%"),
    borderWidth: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  horizontalContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  sellerContact: {
    alignItems: "center",
  },
  contact: {
    textAlign: "left",
    marginTop: 16,
    marginLeft: 8,
    fontSize: hp("2.5%"),
    fontWeight: "bold",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  saveButton: {
    marginTop: 16,
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "mistyrose",
  },
  selectDropdown: {
    borderRadius: 10,
    backgroundColor: "skyblue",
    width: wp("40%"),
    height: hp("4%"),
    marginLeft: 8,
  },
  selectText: {
    fontSize: hp("1.5%"),
  },
});

export default EditProductScreen;
