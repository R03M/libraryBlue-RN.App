import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import handlerValue from "../utils/handlerValue";
import SelectComany from "./SelectCompany";
import { useDispatch, useSelector } from "react-redux";
import { getAllCompanies } from "../redux/actions";
import AddImage from "./AddImage";

const CreateCompany = ({ modalVisible, setModalVisible, type, idUser }) => {
  const dispatch = useDispatch();
  const { companies } = useSelector((state) => state.company);

  const [error, setError] = useState(null);
  const [company, setCompany] = useState({
    name: "",
    image: "",
    code: "",
    associatedCompany: null,
    codeAssociated: null,
    idUser: idUser,
  });

  useEffect(() => {
    dispatch(getAllCompanies());
  }, []);

  const handlerAssociatedC = (value) => {
    handlerValue(setCompany, "associatedCompany", value);
  };

  const handlerChangeImage = (value) => {
    handlerValue(setCompany, "image", value);
  };

  const handlerName = (value) => {
    handlerValue(setCompany, "name", value);
    const alreadyExists = companies.find((company) => company.name === value);

    if (alreadyExists) {
      setError("Ya existe una compañia con ese nombre");
      return;
    }
    setError(null);
  };

  const handlerCode = (value) => {
    handlerValue(setCompany, "code", value);
  };

  const createCompany = () => {
    if (error) {
      Alert.alert("Error", error, [], {
        cancelable: true,
      });
      return;
    }
    // dispatch(createNewCompany(company))
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
            <ScrollView showsVerticalScrollIndicator={false}>
              {type === "Manager" ? (
                <>
                  <Text style={styles.modalText}>Crear Compañia</Text>
                  {!company.image ? null : (
                    <Image source={{ uri: company.image }} style={styles.img} />
                  )}
                  <View style={styles.rowsView}>
                    <Text>Nombre</Text>
                    <TextInput
                      style={styles.textInput}
                      onChangeText={(value) => handlerName(value)}
                      value={company.name}
                    />
                  </View>
                  {error && <Text style={styles.textError}>{error}</Text>}

                  <View style={styles.rowsView}>
                    <Text>Código</Text>
                    <TextInput
                      style={styles.textInput}
                      onChangeText={(value) => handlerCode(value)}
                      value={company.code}
                    />
                  </View>
                  <Text style={styles.textCode}>
                    El codigo solo sera necesario para cuando una compañia o
                    cooperador se quiera unir a tu compañia.
                  </Text>

                  <AddImage onChangeImage={handlerChangeImage} />

                  <SelectComany
                    companies={companies}
                    associateCompany={handlerAssociatedC}
                  />

                  <View style={styles.btonsView}>
                    <Button
                      title="cancelar"
                      onPress={() => setModalVisible(!modalVisible)}
                      color={"red"}
                    />
                    <Button
                      title="crear"
                      onPress={createCompany}
                      color={"green"}
                    />
                  </View>
                </>
              ) : (
                <View>
                  <Text style={styles.modalText}>Seleccionar Compañia</Text>
                  <Button
                    title="cancelar"
                    onPress={() => setModalVisible(!modalVisible)}
                    color={"red"}
                  />
                </View>
              )}
            </ScrollView>
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
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 25,
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
  img: {
    height: 190,
    width: "100%",
    borderRadius: 10,
    marginVertical: 10,
  },
  rowsView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  textError: {
    textAlign: "center",
    color: "red",
    fontWeight: "bold",
  },
  textCode: {
    textAlign: "center",
    color: "gray",
    fontWeight: "bold",
    fontStyle: "italic",
  },
  btonsView: {
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default CreateCompany;
