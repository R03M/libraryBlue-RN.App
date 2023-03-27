import React, { useState } from "react";
import { useSelector } from "react-redux";
import NotCompanyAlert from "../components/NotCompanyAlert";
import CreateCompany from "../components/CreateCompany";

const NoCompany = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { dataUser } = useSelector((state) => state.user);

  return (
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
  );
};

export default NoCompany;
