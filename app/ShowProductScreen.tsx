import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Button,
  Modal,
} from "react-native";
import React, { FC, useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { MediaComponent } from "@/components/MediaComponent";
import { Linking } from "react-native";
import { Checkbox } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import { ButtonComponent } from "@/components/ButtonComponent";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen-hooks";
import realm from "@/store/realm";

interface Product {
  id: number;
  productName: string;
  imagePath: string;
  category: number;
  description: string;
  price: number;
  instagram: string;
  facebook: string;
  phoneNumber: string;
}

interface ProductWithChecked extends Product {
  checked: boolean;
}

const ShowProductScreen: FC = () => {
  const params = useLocalSearchParams();
  const [products, setProducts] = useState<ProductWithChecked[]>([]);
  const [isBuy, setIsBuy] = useState(false);
  const [contact, setContact] = useState({
    phoneNumber: "",
    instagram: "",
    facebook: "",
  });
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );
  const [showButtons, setShowButtons] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const buyProduct = (
    whatsapp: string,
    instagramId: string,
    facebookId: string
  ) => {
    setContact({
      phoneNumber: whatsapp,
      instagram: instagramId,
      facebook: facebookId,
    });
    setIsBuy(true);
  };

  const onClickMedia = (type: string) => {
    if (type === "whatsapp") {
      Linking.openURL(`https://wa.me/${contact.phoneNumber}`);
    } else if (type === "instagram") {
      Linking.openURL(`https://www.instagram.com/${contact.instagram}`);
    } else if (type === "facebook") {
      Linking.openURL(`https://m.me/${contact.facebook}`);
    }
  };

  const handleImagePress = (imagePath: string) => {
    router.push({
      pathname: "/ImageZoomScreen",
      params: { imagePath },
    });
  };

  const logProductDetails = (product: Product) => {
    console.log("Product Details:", product);
  };

  const editProduct = (product: Product) => {
    const productParams = JSON.stringify(product);
    router.push({
      pathname: "/EditProductScreen",
      params: { product: productParams },
    });
    console.log("Product to edit:", product);
  };

  const toggleCheckBox = (id: number) => {
    const newProducts = products.map((product: ProductWithChecked) =>
      product.id === id
        ? {
            ...product,
            checked: !product.checked,
          }
        : product
    );

    setProducts(newProducts);
  };

  const handleDeletePressed = () => {
    setShowConfirmModal(true); //just show modal not delete
  };

  const confirmDelete = () => {
    if (selectedProductId !== null) {
      //access realm & delete product
      realm.write(() => {
        //get product to delete using primary key
        const productToDelete = realm.objectForPrimaryKey(
          "Product",
          selectedProductId
        );

        if (productToDelete) {
          realm.delete(productToDelete); //delete product from database
          console.log("Deleted product w/ ID:", selectedProductId);

          //update local state to change
          const updatedProducts = products.filter(
            (product) => product.id !== selectedProductId
          );
          setProducts(updatedProducts);

          //reset UI
          setShowConfirmModal(false);
          setShowButtons(false);
          setSelectedProductId(null);
        }
      });
    }
  };

  const handleCancel = () => {
    console.log("Cancel action");
    setShowButtons(false);
    setSelectedProductId(null);
  };

  useEffect(() => {
    const data = params.products as unknown as string;
    try {
      let parsedProducts = JSON.parse(data) as ProductWithChecked[];
      parsedProducts = parsedProducts.map((product) => ({
        ...product,
        checked: false,
      }));
      setProducts(parsedProducts);
    } catch (error) {
      console.error("Failed to parse products: ", error);
    }
    // console.log('this is the parameter', data)
    setSelectedProductId(null);
  }, [params.products]);

  useEffect(() => {
    setSelectedProductId(null);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setSelectedProductId(null);
      setShowButtons(false);
      return () => {};
    }, [])
  );

  // useEffect(() => {
  //     console.log(isBuy)
  // }, [])

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={products}
        contentContainerStyle={styles.flatListContainer}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={() => (
          <Text style={styles.emptyList}>No Products Found</Text>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemButton}
            onPress={() => editProduct(item)}
            onLongPress={() => {
              setSelectedProductId(item.id);
              setShowButtons(true);
            }}
          >
            <View style={styles.productContainer}>
              <TouchableOpacity
                onPress={() => handleImagePress(item.imagePath)}
              >
                <Image style={styles.image} source={{ uri: item.imagePath }} />
              </TouchableOpacity>
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.productName}</Text>
                <Text style={styles.text}>{item.description}</Text>
                <Text style={styles.text}>${item.price}</Text>
              </View>
            </View>

            {selectedProductId === item.id ? (
              <Checkbox
                status={item.checked ? "checked" : "unchecked"}
                onPress={() => toggleCheckBox(item.id)}
              />
            ) : (
              <TouchableOpacity
                onPress={() =>
                  buyProduct(item.phoneNumber, item.instagram, item.facebook)
                }
              >
                <AntDesign name="shoppingcart" size={30} color="black" />
              </TouchableOpacity>
            )}

            {/* <TouchableOpacity
              onPress={() =>
                buyProduct(item.phoneNumber, item.instagram, item.facebook)
              }
            >
              <AntDesign name="shoppingcart" size={30} color="black" />
            </TouchableOpacity> */}
          </TouchableOpacity>
        )}
      />

      {isBuy ? (
        <View style={styles.modalContainer}>
          <View style={styles.box}>
            <TouchableOpacity
              style={styles.cancel}
              onPress={() => setIsBuy(false)}
            >
              <AntDesign name="close" size={30} color="black" />
            </TouchableOpacity>

            <Text style={[styles.sellerText, styles.title]}>
              Contact Seller Through This Media:
            </Text>
            {contact.phoneNumber !== "" ? (
              <MediaComponent
                imageSource={require("@/assets/images/whatsapp.png")}
                value={contact.phoneNumber}
                onPress={() => onClickMedia("whatsapp")}
              />
            ) : null}
            {contact.instagram !== "" ? (
              <MediaComponent
                imageSource={require("@/assets/images/instagram.png")}
                value={contact.instagram}
                onPress={() => onClickMedia("instagram")}
              />
            ) : null}
            {contact.facebook !== "" ? (
              <MediaComponent
                imageSource={require("@/assets/images/facebook.png")}
                value={contact.facebook}
                onPress={() => onClickMedia("facebook")}
              />
            ) : null}
          </View>
        </View>
      ) : null}

      <Modal
        transparent={true}
        visible={showConfirmModal}
        animationType="slide"
        onRequestClose={() => {
          setShowConfirmModal(false); //Allow dismiss modal by pressing back button
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Are you sure you want to delete this?
            </Text>
            <View style={styles.modalButton}>
              <Button
                title="Delete"
                color="red"
                onPress={confirmDelete} //confirm delete
              />

              <Button
                title="Cancel"
                color="green"
                onPress={() => setShowConfirmModal(false)} //just close modal
              />
            </View>
          </View>
        </View>
      </Modal>

      {showButtons && (
        <View style={styles.buttonContainer}>
          <ButtonComponent
            title="Delete"
            color="red"
            onPress={handleDeletePressed}
          />

          <ButtonComponent
            title="Cancel"
            color="green"
            onPress={handleCancel}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  flatListContainer: {
    padding: 8,
  },
  itemButton: {
    margin: 8,
    padding: 16,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  productContainer: {
    flex: 1,
    flexDirection: "row",
  },
  image: {
    width: wp("25%"),
    height: wp("25%"),
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
    justifyContent: "center",
  },
  title: {
    color: "black",
    fontSize: hp("2.5%"),
    fontWeight: "bold",
  },
  text: {
    color: "black",
    fontSize: hp("2%"),
  },
  emptyList: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 50,
  },
  modalContainer: {
    backgroundColor: "lightpink",
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: "80%",
    backgroundColor: "white",
    padding: 16,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
  },
  cancel: {
    padding: 8,
    position: "absolute",
    right: 8,
    top: 8,
  },
  sellerText: {
    marginBottom: 8,
    marginTop: 32,
  },
  product: {
    marginBottom: 12,
    padding: 8,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    height: hp("7%"),
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalButton: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});

export default ShowProductScreen;
