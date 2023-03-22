import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAllCompanies } from "../../redux/actions";
import styles from "./items.Styles";
import ModalCompany from "../../components/ModalCompany";

const ItemsScreen = () => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const { dataUser } = useSelector((state) => state.user);
  const { companies } = useSelector((state) => state.company);

  console.log("Item", dataUser.id);

  const CompanyAlert = () => {
    return dataUser.position === "Manager" ? (
      <View
        style={{
          backgroundColor: "#fff",
          margin: 20,
          padding: 20,
          borderRadius: 4,
          elevation: 4, // para Android
          shadowColor: "#000000", // para iOS
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,
        }}
      >
        <Text>
          Aun no creas una compañia, cuando lo hagas podras empezar a añadir
          items, editarlos y visualizarlos.
        </Text>
        <View style={{ marginTop: 20 }}>
          <Button
            title="Crear Compañia"
            onPress={() => setModalVisible(true)}
          />
        </View>
      </View>
    ) : (
      <View>
        <Text>
          Aun no seleccionas una compañia para poder colaborar, cuando lo hagas
          podras empezar a añadir items, editarlos y visualizarlos.
        </Text>
        <Button
          title="Unirse a una Compañia"
          onPress={() => setModalVisible(true)}
        />
      </View>
    );
  };

  return (
    <View>
      {!dataUser.company ? (
        <>
          <CompanyAlert />
          
          <ModalCompany
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            type={dataUser.position}
            idUser={dataUser.id}
          />
        </>
      ) : null}
    </View>
  );
};

export default ItemsScreen;
