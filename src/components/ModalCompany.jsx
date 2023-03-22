import { useEffect, useState } from "react";
import { Button, Modal, StyleSheet, Text, TextInput, View } from "react-native";
import handlerValue from "../utils/handlerValue";
import SelectComany from "./SelectCompany";
import { useDispatch, useSelector } from "react-redux";
import { getAllCompanies } from "../redux/actions";

const ModalCompany = ({ modalVisible, setModalVisible, type, idUser }) => {
  const dispatch = useDispatch();
  const { companies } = useSelector((state) => state.company);

  const [company, setCompany] = useState({
    name: "",
    image: "",
    associatedCompany: null,
    idUser: idUser,
  });

  useEffect(() => {
    dispatch(getAllCompanies());
  }, []);

  const createCompany = () => {
    console.log(company);
  };

  const handlerAssociatedC = (value) => {
    handlerValue(setCompany, "associatedCompany", value)
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {type === "Manager" ? (
              <>
                <Text style={styles.modalText}>Crear Compañia</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text>Nombre</Text>
                  <TextInput
                    style={styles.textInput}
                    onChangeText={(value) =>
                      handlerValue(setCompany, "name", value)
                    }
                    value={company.name}
                  />
                </View>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text>Image</Text>
                </View>
                <SelectComany
                  companies={companies}
                  associateCompany={handlerAssociatedC}
                />
                <Text style={{ color: "gray", fontStyle: "italic" }}>
                  La compañia asociada se puede agregar luego
                </Text>
                <View style={{ marginVertical: 20 }}>
                  <Button title="crear" onPress={createCompany} />
                </View>
              </>
            ) : (
              <Text style={styles.modalText}>Seleccionar Compañia</Text>
            )}

            <Button
              title="cancelar"
              onPress={() => setModalVisible(!modalVisible)}
              color={"red"}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
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
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: "center",
    fontWeight: 700,
  },
  textInput: {
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginVertical: 20,
    width: "70%",
  },
});

export default ModalCompany;
