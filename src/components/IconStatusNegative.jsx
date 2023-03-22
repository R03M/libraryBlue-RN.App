import { AntDesign } from "@expo/vector-icons";

const IconStatusNegative = ({value}) => {
  if (value !== undefined) {
    if (!value.email) {
      return (
        <AntDesign
          name="checkcircle"
          size={20}
          color="green"
          style={{ marginLeft: 10 }}
        />
      );
    } else {
      return (
        <AntDesign
          name="closecircleo"
          size={20}
          color="red"
          style={{ marginLeft: 10 }}
        />
      );
    }
  }
};

export default IconStatusNegative;
