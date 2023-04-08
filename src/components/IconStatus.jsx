import React from 'react';
import { StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { errorColor, pHTCGlobal, successColor } from '../styles/global';

/**
 * IconStatus es un componente que muestra un icono que representa el estado de una operación.
 *
 * Ejemplo de uso en :
 *
 * LOGIN:
 * En el caso de un logIn se quiere indicar si existe la cuenta por lo que en caso de encontrar la cuenta (value === 200)
 * se retornaria un icon positive (ckeckcircle, color[green])
 *
 * SIGNIN:
 * En el caso de un signIn se quiere indicar como no permitido en caso que se ingrese una cuenta ya existente
 * se retornaria un icon negative (closecircleo, color[red])
 *
 * El icono puede ser uno de los siguientes:
 * - checkcircle: indica que el valor ingresado esta permitido.
 * - closecircleo: indica que el valor ingresado no permitido.
 * - disconnect: indica que no hay un valor ingresado, esta en espera o estado inicial.
 *
 *
 *
 * @param {Object} props - Los props para el componente.
 * @param {string} props.value - Se espera 200 si se encuentra lo ingresado, 404 en caso que no se encuentre y 'idle' si no hay valor o es el estado inicial.
 * @param {boolean} props.typePositive - Si typePositive es true, el icono indicará un resultado positivo (por ejemplo, una cuenta encontrada). Si es false, indicará un resultado negativo (por ejemplo, una cuenta ya existente).
 *
 * @return {JSX.Element} - El componente `IconStatus`.
 */
const IconStatus = ({ value, typePositive }) => {
  function handlerName() {
    if (typePositive) {
      return value === 200
        ? 'checkcircle'
        : value === 'idle'
        ? 'disconnect'
        : 'closecircleo';
    } else {
      return value === 200
        ? 'closecircleo'
        : value === 'idle'
        ? 'disconnect'
        : 'checkcircle';
    }
  }

  function handlerColor() {
    if (typePositive) {
      return value === 200
        ? successColor
        : value === 404
        ? errorColor
        : pHTCGlobal;
    } else {
      return value === 200
        ? errorColor
        : value === 404
        ? successColor
        : pHTCGlobal;
    }
  }

  const chosenName = handlerName();
  const chosenColor = handlerColor();

  return (
    <AntDesign
      name={chosenName}
      size={20}
      color={chosenColor}
      style={styles.icon}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    marginLeft: 10,
  },
});

export default IconStatus;
