import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAllCompanies } from "../../redux/actions";
import CreateCompany from "../../components/CreateCompany";
import styles from "./items.Styles";
import NotCompanyAlert from "../../components/NotCompanyAlert";

const ItemsScreen = () => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const { dataUser } = useSelector((state) => state.user);
  const { companies } = useSelector((state) => state.company);

  return (
    <View>
      {!dataUser.company ? (
        <>
          <NotCompanyAlert
            position={dataUser.position}
            setModalVisible={setModalVisible}
          />

          <CreateCompany
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
