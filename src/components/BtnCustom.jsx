import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
/**
 *  Botón personalizado utiliza los componentes TouchableOpacity y Text para renderizar un botón con un texto personalizado y estilos configurables.
 * @param {string} title El texto que se muestra en el botón.
 * @param {func} onPrees  La función que se ejecuta cuando se presiona el botón.
 * @param {string} backgroundColor  El nuevo valor de la propiedad.
 * @param {string} textColor   El color del texto del botón.
 * @param {object} styles  los estilos adicionales que se aplican al botón.
 * @param {object} stylesText    Los estilos adicionales que se aplican al texto del botón.
 * @returns {void}
 */
const BtnCustom = ({
  title,
  onPress,
  backgroundColor,
  textColor,
  styles,
  stylesText,
}) => {
  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: backgroundColor,
          alignItems: 'center',
          borderColor: backgroundColor,
          padding: 8,
          borderRadius: 4,
        },
        styles,
      ]}
      onPress={onPress}>
      <Text style={[{ color: textColor, fontWeight: 'bold' }, stylesText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default BtnCustom;
