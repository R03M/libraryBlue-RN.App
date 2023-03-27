import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import SearchBar from "../../components/SearchBar";
import NoCompany from "../../components/NoCompany";
import NewItem from "../../components/NewItem";
import styles from "./items.Styles";
import ItemsList from "../../components/ItemsList";

const ItemsScreen = () => {
  const { dataUser } = useSelector((state) => state.user);
  const [modalItem, setModalItem] = useState(false);

  return (
    <>
      {!dataUser.company ? (
        <NoCompany />
      ) : (
        <View style={{ flex: 1 }}>
          <SearchBar />
          <ItemsList />

          <NewItem modalItem={modalItem} setModalItem={setModalItem} />
          <TouchableOpacity
            style={styles.button}
            onPress={() => setModalItem(!modalItem)}
          >
            <Text style={styles.plus}>+</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default ItemsScreen;
