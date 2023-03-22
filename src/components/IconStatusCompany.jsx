import { AntDesign } from "@expo/vector-icons";

const IconStatusCompany = ({ value }) => {
  if (value === 200) {
    return (
      <AntDesign
        name="checkcircle"
        size={20}
        color="green"
        style={{ marginLeft: 10 }}
      />
    );
  }
  if (value === 404) {
    return (
      <AntDesign
        name="closecircleo"
        size={20}
        color="red"
        style={{ marginLeft: 10 }}
      />
    );
  } else {
    return (
      <AntDesign
        name="checkcircle"
        size={20}
        color="gray"
        style={{ marginLeft: 10 }}
      />
    );
  }
};

export default IconStatusCompany;
