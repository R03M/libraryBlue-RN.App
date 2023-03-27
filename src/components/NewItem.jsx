import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Modal,
  Button,
  TextInput,
  Switch,
  Image,
} from "react-native";
import handlerValue from "../utils/handlerValue";
import AddImage from "./AddImage";
import SelectItem from "./SelectCategory";
import SelectDate from "./SelectDate";
import { categories, editions, letters } from "../utils/values.enum";

const NewItem = ({ modalItem, setModalItem }) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const [newItem, setNewItem] = useState({
    code: "",
    name: "",
    language: "",
    image: "",
    edition: "",
    letter: "",
    lastCount: "",
    lastCountDate: "",
    currentCount: "",
    itemEntryDate: "",
    category: "",
    associatedCompany: false,
  });

  const createItem = () => {
    console.log(newItem);
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalItem}
        onRequestClose={() => setModalItem(!modalItem)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {!newItem.image ? (
              <Text style={styles.title}>Nuevo Item</Text>
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.title}>Nuevo Item</Text>
                <Image source={{ uri: newItem.image }} style={styles.img} />
              </View>
            )}
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.rowsView}>
                <Text>Codigo</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={(value) =>
                    handlerValue(setNewItem, "code", value)
                  }
                  value={newItem.code}
                />
              </View>
              <View style={styles.rowsView}>
                <Text>Nombre</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={(value) =>
                    handlerValue(setNewItem, "name", value)
                  }
                  value={newItem.name}
                />
              </View>

              <View style={styles.rowsView}>
                <Text>Lenguaje</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={(value) =>
                    handlerValue(setNewItem, "language", value)
                  }
                  value={newItem.language}
                />
              </View>

              <View style={styles.rowsView}>
                <Text>Imagen</Text>
                <AddImage
                  onChangeImage={(value) =>
                    handlerValue(setNewItem, "image", value)
                  }
                />
              </View>

              <View style={styles.rowsView}>
                <Text>Edición</Text>
                <View>
                  <SelectItem
                    items={editions}
                    onValueChange={(itemValue) =>
                      handlerValue(setNewItem, "edition", itemValue)
                    }
                  />
                </View>
              </View>

              <View style={styles.rowsView}>
                <Text>Letra</Text>
                <View>
                  <SelectItem
                    items={letters}
                    onValueChange={(itemValue) =>
                      handlerValue(setNewItem, "letter", itemValue)
                    }
                  />
                </View>
              </View>

              <View style={styles.line} />

              <Text
                style={{
                  textAlign: "center",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  fontSize: 18,
                  marginTop: 10,
                }}
              >
                Ultimo conteo
              </Text>

              <View style={styles.rowsView}>
                <Text>Cantidad</Text>

                <TextInput
                  style={styles.textInput}
                  onChangeText={(value) =>
                    handlerValue(setNewItem, "lastCount", value)
                  }
                  value={newItem.lastCount}
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.rowsView}>
                <Text>Fecha</Text>
                <View>
                  <SelectDate
                    handlerDate={(value) =>
                      handlerValue(setNewItem, "lastCountDate", value)
                    }
                  />
                </View>
              </View>
              <View style={styles.line} />

              <View style={styles.rowsView}>
                <Text>Cantidad Actual</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={(value) =>
                    handlerValue(setNewItem, "currentCount", value)
                  }
                  value={newItem.currentCount}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.rowsView}>
                <Text style={styles.priorityText}>Ultimo ingreso</Text>
                <View>
                  <SelectDate
                    handlerDate={(value) =>
                      handlerValue(setNewItem, "itemEntryDate", value)
                    }
                  />
                </View>
              </View>
              <View style={styles.rowsView}>
                <Text>Categoria</Text>
                <View>
                  <SelectItem
                    items={categories}
                    onValueChange={(itemValue) =>
                      handlerValue(setNewItem, "category", itemValue)
                    }
                  />
                </View>
              </View>

              <View style={styles.rowsView}>
                <Text>Compartir con Asociados</Text>
                <Switch
                  trackColor={{ false: "#767577", true: "#3ccc15" }}
                  thumbColor={isEnabled ? "#2296f3" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={() => {
                    setIsEnabled(!isEnabled);
                    handlerValue(setNewItem, "associatedCompany", !isEnabled);
                  }}
                  value={isEnabled}
                />
              </View>
              <View style={[styles.rowsView, { margin: 20 }]}>
                <Button
                  title="cancelar"
                  onPress={() => setModalItem(!modalItem)}
                  color={"red"}
                />
                <Button title="crear" onPress={createItem} color={"green"} />
              </View>
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
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    padding: 20,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
    marginVertical: 10,
  },
  rowsView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textInput: {
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginVertical: 20,
    width: "70%",
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginVertical: 10,
  },
  img: {
    height: 110,
    width: 70,
    borderRadius: 10,
    marginHorizontal: 15,
  },
});

export default NewItem;
